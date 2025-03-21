import { type E2EPage, test } from '@stencil/playwright';
import { testInputCallbacksAndEvents, testInputValueReflection } from '../../e2e';
import type { FillAction } from '../../e2e/utils/FillAction';
import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

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
	testInputValueReflection<HTMLKolInputNumberElement>(COMPONENT_NAME, TEST_VALUE, fillAction, OPTIONS_ATTRIBUTE);
	testInputCallbacksAndEvents<HTMLKolInputNumberElement>(COMPONENT_NAME, TEST_VALUE, fillAction, OMITTED_EVENTS, OPTIONS_ATTRIBUTE, selectInput);

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
