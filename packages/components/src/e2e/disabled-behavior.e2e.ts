import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { setContentWithRetry } from './utils/setContentWithRetry';

/**
 * Library-wide contract of the disabled state: a disabled interactive element is marked with
 * `aria-disabled`, stays focusable and in the tab order, and ignores every activation. The lint
 * rules `kolibri/no-native-disabled` and `kolibri/common-no-native-disabled-selector` check the
 * source; this test checks the rendered result, including values computed at runtime.
 */

type DisabledCase = {
	tag: string;
	/** Attributes besides `_disabled`. */
	attributes: string;
	/** The interactive element inside the shadow root. */
	selector: string;
};

const OPTIONS = JSON.stringify([
	{ label: 'Option A', value: 'A' },
	{ label: 'Option B', value: 'B' },
]);

const CASES: DisabledCase[] = [
	{ tag: 'kol-button', attributes: `_label="Label"`, selector: 'button' },
	{ tag: 'kol-button-link', attributes: `_label="Label"`, selector: 'button' },
	{ tag: 'kol-popover-button', attributes: `_label="Label"`, selector: 'button' },
	{ tag: 'kol-link', attributes: `_label="Label" _href="#target"`, selector: 'a' },
	{ tag: 'kol-link-button', attributes: `_label="Label" _href="#target"`, selector: 'a' },
	{ tag: 'kol-accordion', attributes: `_label="Label"`, selector: 'summary' },
	{ tag: 'kol-details', attributes: `_label="Label"`, selector: 'summary' },
	{ tag: 'kol-input-text', attributes: `_label="Label" _value="abc"`, selector: 'input' },
	{ tag: 'kol-input-email', attributes: `_label="Label" _value="a@b.de"`, selector: 'input' },
	{ tag: 'kol-input-password', attributes: `_label="Label" _value="secret" _visibility-toggle`, selector: 'input' },
	{ tag: 'kol-input-number', attributes: `_label="Label" _value="5"`, selector: 'input' },
	{ tag: 'kol-input-date', attributes: `_label="Label" _value="2024-01-01"`, selector: 'input' },
	{ tag: 'kol-input-color', attributes: `_label="Label" _value="#ff0000"`, selector: 'input' },
	{ tag: 'kol-input-file', attributes: `_label="Label"`, selector: 'input' },
	{ tag: 'kol-input-range', attributes: `_label="Label" _value="5"`, selector: 'input[type="number"]' },
	{ tag: 'kol-input-checkbox', attributes: `_label="Label"`, selector: 'input' },
	{ tag: 'kol-input-radio', attributes: `_label="Label" _options='${OPTIONS}'`, selector: 'input' },
	{ tag: 'kol-textarea', attributes: `_label="Label" _value="abc"`, selector: 'textarea' },
	{ tag: 'kol-select', attributes: `_label="Label" _options='${OPTIONS}' _value='["A"]'`, selector: 'select' },
	{ tag: 'kol-single-select', attributes: `_label="Label" _options='${OPTIONS}' _value="A"`, selector: 'input' },
	{ tag: 'kol-combobox', attributes: `_label="Label" _suggestions='["A","B"]' _value="A"`, selector: 'input' },
];

const ACTIVATION_EVENTS = ['change', 'click', 'input', 'select', 'toggle'];

type RecordedWindow = Window & { __activations?: string[] };

for (const { tag, attributes, selector } of CASES) {
	test.describe(`${tag} when disabled`, () => {
		test.beforeEach(async ({ page }) => {
			await setContentWithRetry(page, `<button id="before">before</button><${tag} ${attributes} _disabled></${tag}><button id="after">after</button>`);
			await page.locator(tag).evaluate((element: HTMLElement & { _on?: unknown }, eventTypes: string[]) => {
				const activations: string[] = [];
				(window as RecordedWindow).__activations = activations;
				eventTypes.forEach((type) =>
					element.addEventListener(type, (event: Event) => {
						/* `host.click()` on a component without its own `click()` method dispatches a native click on
						   the host itself; that is no activation of the element inside. */
						if (event.composedPath()[0] !== element || event instanceof CustomEvent) {
							activations.push(`event:${type}`);
						}
					}),
				);
				element._on = {
					onChange: () => activations.push('callback:change'),
					onClick: () => activations.push('callback:click'),
					onInput: () => activations.push('callback:input'),
					onSelect: () => activations.push('callback:select'),
					onToggle: () => activations.push('callback:toggle'),
				};
			}, ACTIVATION_EVENTS);
			await page.waitForChanges();
		});

		test('renders aria-disabled and no native disabled attribute', async ({ page }) => {
			await expect(page.locator(`${tag} ${selector}`).first()).toHaveAttribute('aria-disabled', 'true');

			const nativeDisabled = await page.locator(tag).evaluate((element: HTMLElement) => {
				const found: string[] = [];
				const walk = (root: Element | ShadowRoot) => {
					root.querySelectorAll('*').forEach((node) => {
						if (node.hasAttribute('disabled') && !['OPTGROUP', 'OPTION'].includes(node.tagName)) {
							found.push(node.tagName.toLowerCase());
						}
						if (node.shadowRoot) {
							walk(node.shadowRoot);
						}
					});
				};
				walk(element.shadowRoot ?? element);
				return found;
			});
			expect(nativeDisabled).toEqual([]);
		});

		test('is reachable with the Tab key', async ({ page }) => {
			await page.locator('#before').focus();
			await page.keyboard.press('Tab');

			await expect(page.locator(`${tag} ${selector}`).first()).toBeFocused();
		});

		test('takes the focus through the focus() method', async ({ page }) => {
			await page.locator(tag).evaluate(async (element: HTMLElement) => await element.focus());
			await page.waitForChanges();

			await expect(page.locator(`${tag} ${selector}`).first()).toBeFocused();
		});

		test('ignores clicks, keys, typing and the click() method', async ({ page }) => {
			const readState = () =>
				page
					.locator(tag)
					.evaluate((element: HTMLElement & { _value?: unknown; _checked?: unknown }) =>
						JSON.stringify({ checked: element._checked, value: element._value, url: location.hash }),
					);
			const before = await readState();
			const interactive = page.locator(`${tag} ${selector}`).first();

			await interactive.click({ force: true });
			await interactive.focus();
			for (const key of ['Enter', 'Space', 'ArrowDown', 'ArrowUp']) {
				await page.keyboard.press(key);
			}
			await page.keyboard.type('xyz');
			await page.locator(tag).evaluate(async (element: HTMLElement) => await element.click());
			await page.waitForChanges();

			expect(await page.evaluate(() => (window as RecordedWindow).__activations)).toEqual([]);
			expect(await readState()).toBe(before);
		});
	});
}
