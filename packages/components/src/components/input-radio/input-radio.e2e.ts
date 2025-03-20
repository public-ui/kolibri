import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-input-radio', () => {
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
