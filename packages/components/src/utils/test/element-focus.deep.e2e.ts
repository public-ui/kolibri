import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

/**
 * Pins the shadow-crossing focus resolution of `element-focus` in a real browser:
 * `document.activeElement` stops at the shadow host and `contains` never reaches into a shadow
 * root, while the deep helpers resolve and match across the boundary. The helper logic runs a
 * second time inside the page (mirroring `deepActiveElement`/`containsDeepActiveElement`), because
 * the test bundle does not ship the module into the browser context.
 */
test.describe('deepActiveElement', () => {
	test('resolves the focus through nested shadow roots, where document.activeElement stops at the host', async ({ page }) => {
		await page.setContent('<div id="outer"></div>');
		await page.evaluate(() => {
			const outer = document.querySelector('#outer')!;
			const shadowHost = document.createElement('div');
			outer.appendChild(shadowHost);
			const innerRoot = shadowHost.attachShadow({ mode: 'open' });
			const inner = document.createElement('input');
			innerRoot.appendChild(inner);
			inner.focus();
			const w = window as unknown as Record<string, unknown>;
			w['focusTarget'] = inner;
			w['shadowHost'] = shadowHost;
			w['outer'] = outer;
		});

		const naive = await page.evaluate(() => {
			const w = window as unknown as { focusTarget: HTMLElement; shadowHost: HTMLElement };
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
			const w = window as unknown as { focusTarget: HTMLElement; shadowHost: HTMLElement; outer: HTMLElement };
			// Mirrors deepActiveElement(): resolve the deepest active element across shadow roots.
			let active: Element | null = document.activeElement;
			while (active && active.shadowRoot && active.shadowRoot.activeElement) {
				active = active.shadowRoot.activeElement;
			}
			// Mirrors containsDeepActiveElement(): walk up through shadow hosts.
			const containsDeep = (container: HTMLElement): boolean => {
				let node: Node | null = active;
				while (node) {
					if (node === container) {
						return true;
					}
					const root: Node = node.getRootNode();
					node = root instanceof ShadowRoot ? root.host : node.parentElement;
				}
				return false;
			};
			return {
				deepIsInner: active === w.focusTarget,
				hostContainsDeep: containsDeep(w.shadowHost),
				outerContainsDeep: containsDeep(w.outer),
			};
		});
		expect(deep.deepIsInner).toBe(true);
		expect(deep.hostContainsDeep).toBe(true);
		expect(deep.outerContainsDeep).toBe(true);
	});
});
