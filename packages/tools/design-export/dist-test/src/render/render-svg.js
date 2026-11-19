import { chromium } from '@playwright/test';
import { readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { join } from 'node:path';
import { collectDomTree } from './collect-dom-tree.js';
import { domToShapes } from './dom-to-shapes.js';
import { domToSvg } from './dom-to-svg.js';
import { simplifyShapes } from './simplify-shapes.js';
/** States of a component that contains a focusable element: the browser states hover and focus, alone and together. */
const INTERACTIVE_STATES = ['default', 'hover', 'focus', 'hover-focus'];
const FOCUSABLE = 'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
/** Interactive elements a pointer can reach: visible and not visually hidden. */
const HOVERABLE = ['button', 'a[href]', 'input', 'select', 'textarea'].map((selector) => `${selector}:not(.visually-hidden):visible`).join(', ');
const STATE_TIMEOUT = 3000;
const MIME_TYPES = {
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
export async function renderScenarios(repoRoot, scenarios, outDir, harnessPath) {
	const harnessHtml = await readFile(harnessPath, 'utf-8');
	const server = await startStaticServer(repoRoot, {
		'/': { body: harnessHtml, type: 'text/html; charset=utf-8' },
		'/scenarios.json': { body: JSON.stringify(scenarios), type: 'application/json' },
	});
	const port = server.address().port;
	const browser = await chromium.launch();
	const page = await browser.newPage({ viewport: { width: 800, height: 600 } });
	await page.goto(`http://127.0.0.1:${port}/`);
	await page.waitForFunction(() => window.__harnessReady === true, undefined, { timeout: 30_000 });
	const dom = {};
	const svgs = {};
	const shapes = {};
	const states = {};
	const skipped = [];
	for (const scenario of scenarios) {
		const lightHost = page.locator(`.frame[data-scheme='light'] ${scenario.tag}[data-scenario='${scenario.id}']`);
		// Interaktiv ist, was ein fokussierbares Element enthält; der Locator durchdringt den Shadow DOM.
		states[scenario.id] = scenario.states ?? ((await lightHost.locator(FOCUSABLE).count()) > 0 ? INTERACTIVE_STATES : ['default']);
		for (const scheme of ['light', 'dark']) {
			const selector = `.frame[data-scheme='${scheme}'] ${scenario.tag}[data-scenario='${scenario.id}']`;
			const host = page.locator(selector);
			let exported = false;
			for (const state of states[scenario.id]) {
				await applyState(page, host, state);
				await freezeAnimations(page);
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
				const svg = await page.evaluate(`(${domToSvg.toString()})(${JSON.stringify(selector)})`);
				const file = `svg/${scenario.id}.${scheme}.${state}.svg`;
				await writeFile(join(outDir, file), svg, 'utf-8');
				if (scheme === 'light') {
					dom[scenario.tag] = await page.evaluate(`(${collectDomTree.toString()})(${JSON.stringify(selector)})`);
				}
				// Shape-Baum für den Penpot-Plugin-Import je Scheme und Zustand. Schlüssel ist die
				// Szenario-ID, weil mehrere Szenarien denselben Tag haben können.
				{
					const raw = await page.evaluate(`(${domToShapes.toString()})(${JSON.stringify(selector)})`);
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
	const report = await page.evaluate(() =>
		[...document.querySelectorAll('[data-scenario]')].map((host) => ({
			id: host.getAttribute('data-scenario') ?? '',
			tag: host.tagName.toLowerCase(),
			rendered: (host.shadowRoot?.childElementCount ?? 0) > 0,
		})),
	);
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
	await new Promise((resolve) => server.close(() => resolve()));
	return { dom, svgs, shapes, states };
}
/**
 * Brings every running animation to a fixed frame before a capture, so the same input always
 * gives the same shapes: transitions jump to their end, endless animations to their start.
 * `Document.getAnimations()` does not reach into shadow trees, so every shadow root is asked too.
 */
async function freezeAnimations(page) {
	await page.evaluate(() => {
		const roots = [document];
		for (let index = 0; index < roots.length; index += 1) {
			for (const element of roots[index].querySelectorAll('*')) {
				if (element.shadowRoot) roots.push(element.shadowRoot);
			}
		}
		for (const root of roots) {
			for (const animation of root.getAnimations()) {
				try {
					animation.finish();
				} catch {
					animation.pause();
					animation.currentTime = 0;
				}
			}
		}
	});
}
/**
 * Real browser states, aimed at the interactive element inside the shadow DOM: hover/focus styles
 * live on `__interactive-element` (button, anchor, input), not on the custom element host. Every
 * state starts neutral (pointer away, nothing focused), so no state inherits from the one before;
 * running transitions are brought to their end by `freezeAnimations` instead of waiting for them.
 */
async function applyState(page, host, state) {
	await page.mouse.move(0, 0);
	await page.evaluate(() => {
		let active = document.activeElement;
		while (active?.shadowRoot?.activeElement) active = active.shadowRoot.activeElement;
		active?.blur?.();
	});
	if (state === 'default') {
		return;
	}
	if (state.includes('focus')) {
		const focusable = host.locator(FOCUSABLE).first();
		await ((await focusable.count()) > 0 ? focusable : host).focus({ timeout: STATE_TIMEOUT });
	}
	if (state.includes('hover')) {
		// Visuell versteckte Steuerelemente (z. B. das Input der Checkbox) liegen nicht dort, wo der Nutzer zeigt.
		const visible = host.locator(HOVERABLE).first();
		await ((await visible.count()) > 0 ? visible : host).hover({ force: true, timeout: STATE_TIMEOUT });
	}
}
async function startStaticServer(root, fixed) {
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
	await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
	return server;
}
