import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

/**
 * Pins the shadow-crossing focus resolution of `element-focus` in a real browser:
 * `document.activeElement` stops at the shadow host and `contains` never reaches into a shadow
 * root, while the deep helpers resolve and match across the boundary. The helper bodies are
 * transported into the page as source strings, because the test bundle does not ship the module
 * into the browser context.
 */
const deepActiveElementSource =
	'(document_ = document) => { let active = document_.activeElement; while (active && active.shadowRoot && active.shadowRoot.activeElement) { active = active.shadowRoot.activeElement; } return active; }';

const containsDeepActiveElementSource =
	'(container) => { const active = (' +
	deepActiveElementSource +
	')(); if (!active || !container) { return false; } for (let node = active; node; node = node.parentElement) { if (node === container) { return true; } const root = node.getRootNode(); if (root instanceof ShadowRoot) { node = root.host; if (node === container) { return true; } } } return false; }';

test.describe('deepActiveElement', () => {
	test('resolves the focus through nested shadow roots and matches containers across the boundary', async ({ page }) => {
		await page.setContent('<div id="outer"></div>');
		await page.evaluate(
			([deepSrc, containsSrc]) => {
				const w = window as unknown as Record<string, unknown>;
				// eslint-disable-next-line no-eval
				w['deepActiveElement'] = eval('(' + deepSrc + ')');
				// eslint-disable-next-line no-eval
				w['containsDeepActiveElement'] = eval('(' + containsSrc + ')');

				const outer = document.querySelector('#outer')!;
				const shadowHost = document.createElement('div');
				outer.appendChild(shadowHost);
				const innerRoot = shadowHost.attachShadow({ mode: 'open' });
				const inner = document.createElement('input');
				innerRoot.appendChild(inner);
				inner.focus();
				w['focusTarget'] = inner;
				w['shadowHost'] = shadowHost;
				w['outer'] = outer;
			},
			[deepActiveElementSource, containsDeepActiveElementSource] as unknown as [string, string],
		);

		const naive = await page.evaluate(() => {
			const w = window as unknown as { focusTarget: HTMLElement; shadowHost: HTMLElement; outer: HTMLElement };
			return {
				activeIsHost: document.activeElement === w.shadowHost,
				shadowActiveIsInner: w.shadowHost.shadowRoot?.activeElement === w.focusTarget,
				naiveHostContainsFocused: w.shadowHost.contains(w.focusTarget),
			};
		});
		// The documented gap: the document stops at the host, and `contains` cannot reach the
		// focused element inside the shadow root.
		expect(naive.activeIsHost).toBe(true);
		expect(naive.shadowActiveIsInner).toBe(true);
		expect(naive.naiveHostContainsFocused).toBe(false);

		const deep = await page.evaluate(() => {
			const w = window as unknown as {
				deepActiveElement: () => Element | null;
				containsDeepActiveElement: (c: HTMLElement) => boolean;
				focusTarget: HTMLElement;
				shadowHost: HTMLElement;
				outer: HTMLElement;
			};
			return {
				deepIsInner: w.deepActiveElement() === w.focusTarget,
				hostContainsDeep: w.containsDeepActiveElement(w.shadowHost),
				outerContainsDeep: w.containsDeepActiveElement(w.outer),
			};
		});
		expect(deep.deepIsInner).toBe(true);
		expect(deep.hostContainsDeep).toBe(true);
		expect(deep.outerContainsDeep).toBe(true);
	});
});
