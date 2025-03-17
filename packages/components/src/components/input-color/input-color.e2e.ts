import { type E2EPage, test } from '@stencil/playwright';
import { testInputCallbacksAndEvents, testInputValueReflection } from '../../e2e';
import type { FillAction } from '../../e2e/utils/FillAction';
import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { KolEvent } from '../../utils/events';
const COMPONENT_NAME = 'kol-input-color';
const TEST_VALUE = '#cc006e';
const NEW_VALUE = '#00ccff';
const fillAction: FillAction = async (page) => {
	const textInput = page.locator('input[type="text"]');
	await textInput.fill(TEST_VALUE);
	await textInput.dispatchEvent('input');
};
const selectTextInput = (page: Page & E2EPage) => page.locator('input[type="text"]');
const selectColorInput = (page: Page & E2EPage) => page.locator('input[type="color"]');
test.describe(COMPONENT_NAME, () => {
	testInputValueReflection<HTMLKolInputColorElement>(COMPONENT_NAME, TEST_VALUE, fillAction);
	testInputCallbacksAndEvents<HTMLKolInputColorElement>(COMPONENT_NAME, TEST_VALUE, fillAction, ['input'], undefined, selectTextInput);
	test('should sync value between color input and text input', async ({ page }) => {
		await page.setContent(`<${COMPONENT_NAME} _label="Color Picker"></${COMPONENT_NAME}>`);
		const colorInput = selectColorInput(page);
		const textInput = selectTextInput(page);
		await colorInput.fill(TEST_VALUE);
		await expect(textInput).toHaveValue(TEST_VALUE);
		await textInput.fill(NEW_VALUE);
		await expect(colorInput).toHaveValue(NEW_VALUE);
	});
	test.describe('Callbacks', () => {
		test(`should call onChange callback when internal input emits`, async ({ page }) => {
			await page.setContent(`<${COMPONENT_NAME} _label="Color Picker"></${COMPONENT_NAME}>`);
			const component = page.locator(COMPONENT_NAME);
			const textInput = selectTextInput(page);
			const callbackPromise = component.evaluate((element: HTMLKolInputColorElement) => {
				return new Promise<unknown>((resolve) => {
					element._on = {
						onChange: (_event: Event, value?: unknown) => {
							resolve(value);
						},
					};
				});
			});
			await page.waitForChanges();
			await fillAction(page);
			await page.waitForChanges();
			await textInput.dispatchEvent('change');
			await expect(callbackPromise).resolves.toBe(TEST_VALUE);
		});
	});
	test.describe('DOM events', () => {
		test(`should emit change when internal input emits`, async ({ page }) => {
			await page.setContent(`<${COMPONENT_NAME} _label="Color Picker"></${COMPONENT_NAME}>`);
			const component = page.locator(COMPONENT_NAME);
			const textInput = selectTextInput(page);
			const eventPromise = component.evaluate((element: HTMLKolInputColorElement, KolEvent) => {
				return new Promise<unknown>((resolve) => {
					element.addEventListener(KolEvent.change, (event: Event) => {
						resolve((event as CustomEvent).detail);
					});
				});
			}, KolEvent);
			await page.waitForChanges();
			await fillAction(page);
			await page.waitForChanges();
			await textInput.dispatchEvent('change');
			await expect(eventPromise).resolves.toBe(TEST_VALUE);
		});
	});
});
