import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { type E2EPage, test } from '@stencil/playwright';
import { testInputCallbacksAndEvents, testInputValueReflection } from '../../e2e';
import { testInputMessage } from '../../e2e/input-msg';
import type { FillAction } from '../../e2e/utils/FillAction';

const COMPONENT_NAME = 'kol-input-radio';
const TEST_VALUE = 'test-value';
const OPTIONS = [
	{ label: 'Option 1', value: TEST_VALUE },
	{ label: 'Option 2', value: 'option-2' },
];
const OPTIONS_ATTRIBUTE = `_options='${JSON.stringify(OPTIONS)}'`;
const OMITTED_EVENTS = ['click'];
const fillAction: FillAction = async (page) => {
	await page.locator('input').first().check();
};
const selectInput = (page: Page & E2EPage) => page.locator('input').first();

test.describe(COMPONENT_NAME, () => {
	testInputValueReflection<HTMLKolInputRadioElement>({
		additionalProperties: OPTIONS_ATTRIBUTE,
		componentName: COMPONENT_NAME,
		fillAction,
		testValue: TEST_VALUE,
	});
	testInputCallbacksAndEvents<HTMLKolInputRadioElement>({
		additionalProperties: OPTIONS_ATTRIBUTE,
		componentName: COMPONENT_NAME,
		fillAction,
		omittedEvents: OMITTED_EVENTS,
		selectInput,
		testValue: TEST_VALUE,
	});
	testInputMessage<HTMLKolInputRadioElement>(COMPONENT_NAME);

	test.describe('value to option matching', () => {
		const OBJECT_FIRST = { id: 1, text: 'first' };
		const OBJECT_SECOND = { id: 2, text: 'second' };

		const TEST_CASES = [
			{
				name: 'string value',
				options: [
					{ label: 'Option 1', value: 'string1' },
					{ label: 'Option 2', value: 'string2' },
				],
				value: 'string1',
			},
			{
				name: 'number value',
				options: [
					{ label: 'Option 1', value: 1 },
					{ label: 'Option 2', value: 2 },
				],
				value: 1,
			},
			{
				name: 'object value',
				options: [
					{ label: 'Option 1', value: OBJECT_FIRST },
					{ label: 'Option 2', value: OBJECT_SECOND },
				],
				value: OBJECT_FIRST,
			},
		];

		TEST_CASES.forEach(({ name, options, value }) => {
			test(`should match option with ${name}`, async ({ page }) => {
				await page.setContent(`<kol-input-radio	_label="Radio Group"></kol-input-radio>`);
				const kolInputRadio = page.locator('kol-input-radio');

				await kolInputRadio.evaluate(
					(kolInputRadio: HTMLKolInputRadioElement, { options, value }) => {
						if (kolInputRadio) {
							kolInputRadio._options = options;
							kolInputRadio._value = value;
						}
					},
					{ options, value },
				);

				const firstOption = kolInputRadio.locator('input[type="radio"]').first();
				await expect(firstOption).toBeChecked();
			});
		});
	});

	test.describe('kolFocus behavior', () => {
		test('should focus the checked radio input when kolFocus is called', async ({ page }) => {
			await page.setContent(`<kol-input-radio _label="Radio Group" ${OPTIONS_ATTRIBUTE}></kol-input-radio>`);
			const kolInputRadio = page.locator('kol-input-radio');

			// Set a value to check one of the options
			await kolInputRadio.evaluate((element: HTMLKolInputRadioElement) => {
				element._value = 'option-2';
			});
			await page.waitForChanges();

			const result = await kolInputRadio.evaluate(async (element: HTMLKolInputRadioElement) => {
				// Call kolFocus and check what gets focused
				await element.kolFocus();

				// Wait for focus to be applied
				await new Promise((resolve) => setTimeout(resolve, 10));

				// Check the focused element in the shadow DOM
				const shadowActiveElement = element.shadowRoot?.activeElement;

				return {
					shadowActiveElementTag: shadowActiveElement?.tagName,
					shadowActiveElementType: shadowActiveElement instanceof HTMLInputElement ? shadowActiveElement.type : null,
					shadowActiveElementChecked: shadowActiveElement instanceof HTMLInputElement ? shadowActiveElement.checked : null,
				};
			});

			// The checked radio input should be focused in the shadow DOM
			expect(result.shadowActiveElementTag).toBe('INPUT');
			expect(result.shadowActiveElementType).toBe('radio');
			expect(result.shadowActiveElementChecked).toBe(true);
		});

		test('should focus the first enabled radio input when no option is checked', async ({ page }) => {
			await page.setContent(`<kol-input-radio _label="Radio Group" ${OPTIONS_ATTRIBUTE}></kol-input-radio>`);
			const kolInputRadio = page.locator('kol-input-radio');
			await page.waitForChanges();

			const result = await kolInputRadio.evaluate(async (element: HTMLKolInputRadioElement) => {
				// Call kolFocus and check what gets focused
				await element.kolFocus();

				// Wait for focus to be applied
				await new Promise((resolve) => setTimeout(resolve, 10));

				// Check the focused element in the shadow DOM
				const shadowActiveElement = element.shadowRoot?.activeElement;
				const firstInput = element.shadowRoot?.querySelector('input[type="radio"]');

				return {
					shadowActiveElementTag: shadowActiveElement?.tagName,
					shadowActiveElementType: shadowActiveElement instanceof HTMLInputElement ? shadowActiveElement.type : null,
					shadowActiveElementChecked: shadowActiveElement instanceof HTMLInputElement ? shadowActiveElement.checked : null,
					isFirstInput: shadowActiveElement === firstInput,
				};
			});

			// The first enabled radio input should be focused in the shadow DOM
			expect(result.shadowActiveElementTag).toBe('INPUT');
			expect(result.shadowActiveElementType).toBe('radio');
			expect(result.shadowActiveElementChecked).toBe(false);
			expect(result.isFirstInput).toBe(true);
		});

		test('should handle kolFocus when all radio inputs are disabled', async ({ page }) => {
			const disabledOptions = [
				{ label: 'Option 1', value: 'option-1', disabled: true },
				{ label: 'Option 2', value: 'option-2', disabled: true },
			];
			await page.setContent(`<kol-input-radio _label="Radio Group"></kol-input-radio>`);
			const kolInputRadio = page.locator('kol-input-radio');

			await kolInputRadio.evaluate((element: HTMLKolInputRadioElement, options) => {
				element._options = options;
			}, disabledOptions);
			await page.waitForChanges();

			const result = await kolInputRadio.evaluate(async (element: HTMLKolInputRadioElement) => {
				// Call kolFocus and check what gets focused
				await element.kolFocus();

				// Wait for focus to be applied
				await new Promise((resolve) => setTimeout(resolve, 10));

				// Check the focused element in the shadow DOM
				const shadowActiveElement = element.shadowRoot?.activeElement;

				return {
					shadowActiveElementTag: shadowActiveElement?.tagName ?? null,
				};
			});

			// No input should be focused when all are disabled
			expect(result.shadowActiveElementTag).toBeNull();
		});
	});
});
