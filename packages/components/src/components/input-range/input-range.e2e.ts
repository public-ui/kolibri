import { type E2EPage, test } from '@stencil/playwright';
import { testInputCallbacksAndEvents, testInputValueReflection } from '../../e2e';
import type { FillAction } from '../../e2e/utils/FillAction';
import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { KolEvent } from '../../utils/events';

const COMPONENT_NAME = 'kol-input-range';
const TEST_VALUE = '10';
const fillAction: FillAction = async (page) => {
	const input = page.locator('input[type=number]');
	await input.fill(TEST_VALUE);
	await input.dispatchEvent('change');
};
const selectInput = (page: Page & E2EPage) => page.locator('input[type=number]');

test.describe(COMPONENT_NAME, () => {
	testInputValueReflection<HTMLKolInputRangeElement>(COMPONENT_NAME, Number(TEST_VALUE), fillAction);
	testInputCallbacksAndEvents<HTMLKolInputRangeElement>(COMPONENT_NAME, TEST_VALUE, fillAction, ['change'], undefined, selectInput);

	// handle special case: onChange payload is a number while onInput is a string
	test.describe('Callbacks', () => {
		test(`should call onChange callback when internal input emits`, async ({ page }) => {
			await page.setContent(`<${COMPONENT_NAME} _label="Input"></${COMPONENT_NAME}>`);
			const component = page.locator(COMPONENT_NAME);
			const input = selectInput(page);

			const callbackPromise = component.evaluate((element: HTMLKolInputRangeElement) => {
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
			await input.dispatchEvent('change');

			await expect(callbackPromise).resolves.toBe(Number(TEST_VALUE));
		});
	});

	test.describe('DOM events', () => {
		test(`should emit change when internal input emits`, async ({ page }) => {
			await page.setContent(`<${COMPONENT_NAME} _label="Input"></${COMPONENT_NAME}>`);
			const component = page.locator(COMPONENT_NAME);
			const input = selectInput(page);

			const eventPromise = component.evaluate((element: HTMLKolInputRangeElement, KolEvent) => {
				return new Promise<unknown>((resolve) => {
					element.addEventListener(KolEvent.change, (event: Event) => {
						resolve((event as CustomEvent).detail);
					});
				});
			}, KolEvent);
			await page.waitForChanges();

			await fillAction(page);
			await page.waitForChanges();
			await input.dispatchEvent('change');

			await expect(eventPromise).resolves.toBe(Number(TEST_VALUE));
		});
	});
});
