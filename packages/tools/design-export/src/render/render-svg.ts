import type { Locator } from '@playwright/test';
import { chromium } from '@playwright/test';
import { readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { join } from 'node:path';
import type { DomNode } from '../types.js';
import { collectDomTree } from './collect-dom-tree.js';
import { domToSvg } from './dom-to-svg.js';

/**
 * One render scenario: a component instance with props and the states to capture.
 * Props are element properties (camelCase names, leading underscore kept), so
 * object values like icon or item configs work, not just attribute strings.
 * `content` becomes a text child and lands in the default slot.
 */
export interface Scenario {
	id: string;
	tag: string;
	props: Record<string, unknown>;
	states: string[];
	content?: string;
}

export interface RenderResult {
	dom: Record<string, DomNode>;
	svgs: Record<string, { scheme: 'light' | 'dark'; state: string; file: string }[]>;
}

const MIME_TYPES: Record<string, string> = {
	'.html': 'text/html; charset=utf-8',
	'.js': 'text/javascript',
	'.mjs': 'text/javascript',
	'.css': 'text/css',
	'.json': 'application/json',
	'.woff2': 'font/woff2',
	'.svg': 'image/svg+xml',
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
	for (const scenario of scenarios) {
		for (const scheme of ['light', 'dark'] as const) {
			const selector = `.frame[data-scheme='${scheme}'] ${scenario.tag}[data-scenario='${scenario.id}']`;
			const host = page.locator(selector);
			await host.waitFor({ state: 'visible' });
			for (const state of scenario.states) {
				await applyState(page, host, state);
				const svg = (await page.evaluate(`(${domToSvg.toString()})(${JSON.stringify(selector)})`)) as string;
				const file = `svg/${scenario.id}.${scheme}.${state}.svg`;
				await writeFile(join(outDir, file), svg, 'utf-8');
				if (scheme === 'light') {
					dom[scenario.tag] = (await page.evaluate(`(${collectDomTree.toString()})(${JSON.stringify(selector)})`)) as DomNode;
				}
				(svgs[scenario.tag] ??= []).push({ scheme, state, file });
			}
		}
	}
	await browser.close();
	await new Promise<void>((resolve) => server.close(() => resolve()));
	return { dom, svgs };
}

/**
 * Real browser states, aimed at the interactive element inside the shadow DOM:
 * hover/focus styles live on `__interactive-element` (button, anchor, input),
 * not on the custom element host, so the host alone would not trigger them.
 * Hover styles transition (theme visibility delay), so serialization waits for
 * the transition to settle instead of reading the start value.
 */
async function applyState(page: import('@playwright/test').Page, host: Locator, state: string): Promise<void> {
	if (state !== 'hover' && state !== 'focus') {
		return;
	}
	const interactive = host.locator('button, a, input, select, textarea').first();
	const target = (await interactive.count()) > 0 ? interactive : host;
	if (state === 'hover') {
		await target.hover();
		await page.waitForTimeout(700);
	} else {
		await target.focus();
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
