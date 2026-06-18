import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { testInputValueReflection } from '../../e2e';
import { testInputMessage } from '../../e2e/input-msg';
import type { FillAction } from '../../e2e/utils/FillAction';
import { setContentWithRetry } from '../../e2e/utils/setContentWithRetry';

const COMPONENT_NAME = 'kol-input-radio';
const TEST_VALUE = 'test-value';
const OPTIONS = [
	{ label: 'Option 1', value: TEST_VALUE },
	{ label: 'Option 2', value: 'option-2' },
];
const OPTIONS_ATTRIBUTE = `_options='${JSON.stringify(OPTIONS)}'`;
const fillAction: FillAction = async (page) => {
	await page.locator('input').first().check();
};

test.describe(COMPONENT_NAME, () => {
	testInputValueReflection<HTMLKolInputRadioElement>({
		additionalProperties: OPTIONS_ATTRIBUTE,
		componentName: COMPONENT_NAME,
		fillAction,
		testValue: TEST_VALUE,
	});

	test.describe('Callbacks and Events', () => {
		test('should call onFocus callback and emit focus event when input receives focus', async ({ page }) => {
			await setContentWithRetry(page, `<${COMPONENT_NAME} _label="Input" ${OPTIONS_ATTRIBUTE}></${COMPONENT_NAME}>`);
			const component = page.locator(COMPONENT_NAME);
			const input = page.locator('input').first();

			await component.evaluate((element: HTMLKolInputRadioElement) => {
				element._on = { onFocus: () => ((window as unknown as Record<string, unknown>).focusCallback = true) };
				element.addEventListener('focus', () => ((window as unknown as Record<string, unknown>).focusEvent = true));
			});

			await input.focus();
			await page.waitForChanges();

			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).focusCallback)).toBe(true);
			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).focusEvent)).toBe(true);
		});

		test('should call onBlur callback and emit blur event when input loses focus', async ({ page }) => {
			await setContentWithRetry(page, `<${COMPONENT_NAME} _label="Input" ${OPTIONS_ATTRIBUTE}></${COMPONENT_NAME}><button id="next">Next</button>`);
			const component = page.locator(COMPONENT_NAME);
			const input = page.locator('input').first();
			const nextButton = page.locator('#next');

			await component.evaluate((element: HTMLKolInputRadioElement) => {
				element._on = { onBlur: () => ((window as unknown as Record<string, unknown>).blurCallback = true) };
				element.addEventListener('blur', () => ((window as unknown as Record<string, unknown>).blurEvent = true));
			});

			await input.focus();
			await page.waitForChanges();
			await nextButton.focus();
			await page.waitForChanges();

			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).blurCallback)).toBe(true);
			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).blurEvent)).toBe(true);
		});

		test('should call onInput callback and emit input event with value when a radio is checked', async ({ page }) => {
			await setContentWithRetry(page, `<${COMPONENT_NAME} _label="Input" ${OPTIONS_ATTRIBUTE}></${COMPONENT_NAME}>`);
			const component = page.locator(COMPONENT_NAME);

			await component.evaluate((element: HTMLKolInputRadioElement) => {
				element._on = { onInput: (_event: Event, value?: unknown) => ((window as unknown as Record<string, unknown>).inputValue = value) };
				element.addEventListener('input', (event: Event) => ((window as unknown as Record<string, unknown>).inputDetail = (event as CustomEvent).detail));
			});

			await fillAction(page);
			await page.waitForChanges();

			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).inputValue)).toBe(TEST_VALUE);
			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).inputDetail)).toBe(TEST_VALUE);
		});

		test('should call onChange callback and emit change event with value when a radio is checked', async ({ page }) => {
			await setContentWithRetry(page, `<${COMPONENT_NAME} _label="Input" ${OPTIONS_ATTRIBUTE}></${COMPONENT_NAME}>`);
			const component = page.locator(COMPONENT_NAME);

			await component.evaluate((element: HTMLKolInputRadioElement) => {
				element._on = { onChange: (_event: Event, value?: unknown) => ((window as unknown as Record<string, unknown>).changeValue = value) };
				element.addEventListener('change', (event: Event) => ((window as unknown as Record<string, unknown>).changeDetail = (event as CustomEvent).detail));
			});

			await fillAction(page);
			await page.waitForChanges();

			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).changeValue)).toBe(TEST_VALUE);
			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).changeDetail)).toBe(TEST_VALUE);
		});
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
});
