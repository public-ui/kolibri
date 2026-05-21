import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { testInputCallbacksAndEvents } from '../../e2e';
import { testInputMessage } from '../../e2e/input-msg';
import type { FillAction } from '../../e2e/utils/FillAction';

const COMPONENT_NAME = 'kol-input-checkbox';
const TEST_VALUE = true;
const fillAction: FillAction = async (page) => {
	await page.locator('input').check();
};
const OMITTED_EVENTS = ['click'];

test.describe(COMPONENT_NAME, () => {
	testInputCallbacksAndEvents<HTMLKolInputCheckboxElement>({
		componentName: COMPONENT_NAME,
		fillAction,
		omittedEvents: OMITTED_EVENTS,
		testValue: TEST_VALUE,
	});
	testInputMessage<HTMLKolInputCheckboxElement>(COMPONENT_NAME);

	test(`should reflect the _checked property on the web component`, async ({ page }) => {
		const getCheckedProperty = () => page.locator(COMPONENT_NAME).evaluate((element: HTMLKolInputCheckboxElement) => element._checked);
		await page.setContent(`<kol-input-checkbox _label="Input"></kol-input-checkbox>`);

		expect(await getCheckedProperty()).toBe(false);
		await fillAction(page);
		expect(await getCheckedProperty()).toBe(true);
	});

	test(`should set focus on the internal input element via focus() method`, async ({ page }) => {
		await page.setContent(`<kol-input-checkbox _label="Checkbox"></kol-input-checkbox>`);

		const component = page.locator(COMPONENT_NAME);
		const input = page.locator('input');

		// Call the focus() method on the component
		await component.evaluate((element: HTMLKolInputCheckboxElement) => element.focus());

		// Verify the input element has focus
		const isFocused = await input.evaluate((el) => el === document.activeElement || (el.getRootNode() as ShadowRoot | Document).activeElement === el);
		expect(isFocused).toBe(true);
	});

	test(`should focus internal input when clicking on host element`, async ({ page }) => {
		await page.setContent(`<button>Before</button><kol-input-checkbox _label="Checkbox"></kol-input-checkbox><button>After</button>`);

		const component = page.locator(COMPONENT_NAME);
		const input = page.locator('input');

		// Click on the component host element
		await component.click();
		await page.waitForChanges();

		// Verify the internal input has focus
		const isFocused = await input.evaluate((el) => el === document.activeElement || (el.getRootNode() as ShadowRoot | Document).activeElement === el);
		expect(isFocused).toBe(true);
	});

	test(`should allow Tab navigation to reach internal input`, async ({ page }) => {
		await page.setContent(`<button>Before</button><kol-input-checkbox _label="Checkbox"></kol-input-checkbox><button>After</button>`);

		const beforeButton = page.locator('button').first();
		const input = page.locator('input');

		// Focus on the "Before" button
		await beforeButton.focus();
		await page.waitForChanges();

		// Press Tab to move to checkbox
		await page.keyboard.press('Tab');
		await page.waitForChanges();

		// Verify the internal input has focus
		const isFocused = await input.evaluate((el) => el === document.activeElement || (el.getRootNode() as ShadowRoot | Document).activeElement === el);
		expect(isFocused).toBe(true);
	});

	test(`should not fire blur when clicking label text while checkbox is already focused`, async ({ page }) => {
		await page.setContent(`<kol-input-checkbox _label="Checkbox"></kol-input-checkbox>`);

		const component = page.locator(COMPONENT_NAME);

		// Focus the checkbox
		await component.evaluate((el: HTMLKolInputCheckboxElement) => el.focus());
		await page.waitForChanges();

		// Attach a native blur listener on the shadow-DOM input before the click
		await page.evaluate(() => {
			const host = document.querySelector('kol-input-checkbox');
			const shadowInput = host?.shadowRoot?.querySelector('input');
			if (shadowInput) {
				(window as unknown as Record<string, unknown>)['__testBlurCount'] = 0;
				shadowInput.addEventListener('blur', () => {
					(window as unknown as Record<string, unknown>)['__testBlurCount'] = ((window as unknown as Record<string, number>)['__testBlurCount'] ?? 0) + 1;
				});
			}
		});

		// Click the visible text label (kol-field-control__label); Playwright pierces open shadow DOM
		await page.locator('label.kol-field-control__label').click();
		await page.waitForChanges();

		const blurCount = await page.evaluate(() => (window as unknown as Record<string, number>)['__testBlurCount'] ?? 0);
		expect(blurCount).toBe(0);
	});

	test(`should not fire blur when clicking the checkbox icon while already focused`, async ({ page }) => {
		await page.setContent(`<kol-input-checkbox _label="Checkbox"></kol-input-checkbox>`);

		const component = page.locator(COMPONENT_NAME);

		// Focus the checkbox
		await component.evaluate((el: HTMLKolInputCheckboxElement) => el.focus());
		await page.waitForChanges();

		// Attach blur listener on shadow-DOM input
		await page.evaluate(() => {
			const host = document.querySelector('kol-input-checkbox');
			const shadowInput = host?.shadowRoot?.querySelector('input');
			if (shadowInput) {
				(window as unknown as Record<string, unknown>)['__testBlurCount2'] = 0;
				shadowInput.addEventListener('blur', () => {
					(window as unknown as Record<string, unknown>)['__testBlurCount2'] = ((window as unknown as Record<string, number>)['__testBlurCount2'] ?? 0) + 1;
				});
			}
		});

		// Click the icon element inside the kol-checkbox wrapper
		await page.locator('i.kol-checkbox__icon').click();
		await page.waitForChanges();

		const blurCount = await page.evaluate(() => (window as unknown as Record<string, number>)['__testBlurCount2'] ?? 0);
		expect(blurCount).toBe(0);
	});
});
