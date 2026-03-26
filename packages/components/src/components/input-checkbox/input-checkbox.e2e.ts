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
});
