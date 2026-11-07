import type { Locator } from '@playwright/test';
import { chromium } from '@playwright/test';
import { readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { join } from 'node:path';
import type { DomNode } from '../types.js';
import { collectDomTree } from './collect-dom-tree.js';
import type { ShapeNode } from './dom-to-shapes.js';
import { domToShapes } from './dom-to-shapes.js';
import { domToSvg } from './dom-to-svg.js';
import { simplifyShapes } from './simplify-shapes.js';

/**
 * One render scenario: a component instance with props and the states to capture.
 * Props are element properties (camelCase names, leading underscore kept), so
 * object values like icon or item configs work, not just attribute strings.
 * `content` becomes a text child in the default slot, `html` becomes slotted
 * markup (for nested components such as tree items).
 */
export interface Scenario {
	id: string;
	tag: string;
	props: Record<string, unknown>;
	states: string[];
	content?: string;
	html?: string;
	/** Variant properties of the design library, in property order (e.g. `Variant`, `Disabled`); `State` follows from `states`. */
	axes?: [string, string][];
}

export interface RenderResult {
	dom: Record<string, DomNode>;
	svgs: Record<string, { scheme: 'light' | 'dark'; state: string; file: string }[]>;
	shapes: Record<string, ShapeNode>;
}

const MIME_TYPES: Record<string, string> = {
	'.html': 'text/html; charset=utf-8',
	'.js': 'text/javascript',
	'.mjs': 'text/javascript',
	'.css': 'text/css',
	'.json': 'application/json',
	'.woff2': 'font/woff2',
	'.svg': 'image/svg+xml',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.gif': 'image/gif',
	'.webp': 'image/webp',
};

/**
 * Renders every scenario in a real browser and serializes each component into
 * one layered SVG per scheme and state.
 *
 * A static file server rooted at the repository root serves the harness and the
 * built workspace packages; the browser needs no network access. Interactive
 * states are real browser states: `hover` and `focus` are triggered through
 * Playwright before serialization instead of being painted by hand.
 */
export async function renderScenarios(repoRoot: string, scenarios: Scenario[], outDir: string, harnessPath: string): Promise<RenderResult> {
	const harnessHtml = await readFile(harnessPath, 'utf-8');
	const server = await startStaticServer(repoRoot, {
		'/': { body: harnessHtml, type: 'text/html; charset=utf-8' },
		'/scenarios.json': { body: JSON.stringify(scenarios), type: 'application/json' },
	});
	const port = (server.address() as { port: number }).port;
	const browser = await chromium.launch();
	const page = await browser.newPage({ viewport: { width: 800, height: 600 } });
	await page.goto(`http://127.0.0.1:${port}/`);
	await page.waitForFunction(() => (window as unknown as { __harnessReady?: boolean }).__harnessReady === true, undefined, { timeout: 30_000 });

	const dom: Record<string, DomNode> = {};
	const svgs: Record<string, { scheme: 'light' | 'dark'; state: string; file: string }[]> = {};
	const shapes: Record<string, ShapeNode> = {};
	const skipped: string[] = [];
	for (const scenario of scenarios) {
		for (const scheme of ['light', 'dark'] as const) {
			const selector = `.frame[data-scheme='${scheme}'] ${scenario.tag}[data-scenario='${scenario.id}']`;
			const host = page.locator(selector);
			let exported = false;
			for (const state of scenario.states) {
				await applyState(page, host, state);
				// Sichtbarkeit erst NACH dem Zustand prüfen: Komponenten wie die Skip-Navigation
				// werden erst durch Fokus sichtbar; Controller wie der geschlossene Dialog
				// bleiben unsichtbar und werden übersprungen.
				const visible = await host.waitFor({ state: 'visible', timeout: 5000 }).then(
					() => true,
					() => false,
				);
				if (!visible) {
					break;
				}
				exported = true;
				const svg = (await page.evaluate(`(${domToSvg.toString()})(${JSON.stringify(selector)})`)) as string;
				const file = `svg/${scenario.id}.${scheme}.${state}.svg`;
				await writeFile(join(outDir, file), svg, 'utf-8');
				if (scheme === 'light') {
					dom[scenario.tag] = (await page.evaluate(`(${collectDomTree.toString()})(${JSON.stringify(selector)})`)) as DomNode;
				}
				// Shape-Baum für den Penpot-Plugin-Import je Scheme und Zustand. Schlüssel ist die
				// Szenario-ID, weil mehrere Szenarien denselben Tag haben können.
				{
					const raw = (await page.evaluate(`(${domToShapes.toString()})(${JSON.stringify(selector)})`)) as ShapeNode;
					const simplified = simplifyShapes(raw);
					if (simplified) {
						shapes[`${scenario.id}#${scheme}#${state}`] = simplified;
					}
				}
				(svgs[scenario.tag] ??= []).push({ scheme, state, file });
			}
			if (!exported && !skipped.includes(scenario.id)) {
				skipped.push(scenario.id);
			}
		}
	}
	// Render-Erfolg je Szenario melden: keine Kinder im Shadow DOM heißt leer gerendert.
	const report = (await page.evaluate(() =>
		[...document.querySelectorAll('[data-scenario]')].map((host) => ({
			id: host.getAttribute('data-scenario') ?? '',
			tag: host.tagName.toLowerCase(),
			rendered: (host.shadowRoot?.childElementCount ?? 0) > 0,
		})),
	)) as { id: string; tag: string; rendered: boolean }[];
	const unique = [...new Map(report.map((entry) => [entry.id, entry])).values()];
	const empty = unique.filter((entry) => !entry.rendered && !skipped.includes(entry.id));
	console.log(
		`Render-Erfolg: ${unique.length - empty.length - skipped.length}/${unique.length} Szenarien mit Shadow-DOM-Inhalt${skipped.length > 0 ? `, ${skipped.length} übersprungen (nicht sichtbar)` : ''}.`,
	);
	if (skipped.length > 0) {
		console.warn(`Übersprungen (unsichtbar, z. B. geschlossene Controller-Komponente): ${skipped.join(', ')}`);
	}
	if (empty.length > 0) {
		console.warn(`Leer gerendert (Props nachbessern): ${empty.map((entry) => entry.id).join(', ')}`);
	}

	await browser.close();
	await new Promise<void>((resolve) => server.close(() => resolve()));
	return { dom, svgs, shapes };
}

/**
 * Real browser states, aimed at the interactive element inside the shadow DOM:
 * hover/focus styles live on `__interactive-element` (button, anchor, input),
 * not on the custom element host, so the host alone would not trigger them.
 * Hover styles transition (theme visibility delay), so serialization waits for
 * the transition to settle instead of reading the start value.
 */
async function applyState(page: import('@playwright/test').Page, host: Locator, state: string): Promise<void> {
	if (state !== 'hover' && state !== 'focus' && state !== 'hover-focus') {
		return;
	}
	const interactive = host.locator('button, a, input, select, textarea').first();
	const target = (await interactive.count()) > 0 ? interactive : host;
	if (state === 'hover') {
		await target.hover();
		await page.waitForTimeout(700);
	} else {
		// Der Zeiger verlässt das Element, damit der Fokus-Zustand keine Hover-Styles erbt.
		await page.mouse.move(0, 0);
		await page.waitForTimeout(700);
		await target.focus();
		await page.waitForTimeout(300);
		if (state === 'hover-focus') {
			await target.hover();
			await page.waitForTimeout(700);
		}
	}
}

interface FixedResponse {
	body: string;
	type: string;
}

async function startStaticServer(root: string, fixed: Record<string, FixedResponse>): Promise<ReturnType<typeof createServer>> {
	const server = createServer(async (request, response) => {
		try {
			const url = new URL(request.url ?? '/', 'http://localhost');
			const fixedResponse = fixed[url.pathname];
			if (fixedResponse) {
				response.writeHead(200, { 'content-type': fixedResponse.type }).end(fixedResponse.body);
				return;
			}
			const filePath = join(root, url.pathname);
			const content = await readFile(filePath);
			const extension = filePath.slice(filePath.lastIndexOf('.'));
			response.writeHead(200, { 'content-type': MIME_TYPES[extension] ?? 'application/octet-stream' }).end(content);
		} catch {
			response.writeHead(404).end('not found');
		}
	});
	await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
	return server;
}
