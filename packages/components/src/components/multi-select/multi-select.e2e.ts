import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { testInputCallbacksAndEvents, testInputValueReflection } from '../../e2e';
import { testInputMessage } from '../../e2e/input-msg';
import type { FillAction } from '../../e2e/utils/FillAction';

const COMPONENT_NAME = 'kol-multi-select';
const TEST_VALUES = ['E', 'W'];
const TEST_LABELS = ['East', 'West'];
const OPTIONS = [
	{ label: 'North', value: 'N' },
	{ label: 'South', value: 'S' },
	{ label: 'West', value: 'W' },
	{ label: 'East', value: 'E' },
];
const OPTIONS_ATTRIBUTE = `_options='${JSON.stringify(OPTIONS)}'`;
const fillAction: FillAction = async (page) => {
	await page.getByRole('button').click();
	await page.getByRole('listbox').getByText(TEST_LABELS[0]).click({ force: true });
	await page.getByRole('listbox').getByText(TEST_LABELS[1]).click({ force: true });
};

test.describe(COMPONENT_NAME, () => {
	testInputValueReflection<HTMLKolMultiSelectElement>({
		additionalProperties: OPTIONS_ATTRIBUTE,
		componentName: COMPONENT_NAME,
		equalityCheck: 'toEqual',
		fillAction,
		testValue: TEST_VALUES,
	});
	testInputCallbacksAndEvents<HTMLKolMultiSelectElement>({
		additionalProperties: OPTIONS_ATTRIBUTE,
		componentName: COMPONENT_NAME,
		equalityCheck: 'toEqual',
		expectedValue: TEST_VALUES,
		fillAction,
		omittedEvents: ['input', 'change'],
	});
	testInputMessage<HTMLKolMultiSelectElement>(COMPONENT_NAME);

	test.describe('kol-multi-select additional interactions', () => {
		test('allows selecting and deselecting multiple options', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" ${OPTIONS_ATTRIBUTE}></kol-multi-select>`);

			await page.getByRole('button').click();
			await page.getByRole('listbox').getByText(TEST_LABELS[0]).click({ force: true });
			await page.getByRole('listbox').getByText(TEST_LABELS[1]).click({ force: true });

			let value = await page.locator('kol-multi-select').evaluate((el: HTMLKolMultiSelectElement) => el._value);
			expect(value).toEqual(TEST_VALUES);

			await page.getByRole('listbox').getByText(TEST_LABELS[0]).click({ force: true });
			value = await page.locator('kol-multi-select').evaluate((el: HTMLKolMultiSelectElement) => el._value);
			expect(value).toEqual([TEST_VALUES[1]]);
		});

		test('filters options when typing and keeps selections', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" ${OPTIONS_ATTRIBUTE}></kol-multi-select>`);

			await page.locator('input.kol-multi-select__input').focus();
			await page.locator('input.kol-multi-select__input').fill('We');

			await expect(page.getByText('West')).toBeVisible();
			await expect(page.getByText('North')).toHaveCount(0);

			await page.keyboard.press('ArrowDown');
			await page.keyboard.press('Enter');

			const value = await page.locator('kol-multi-select').evaluate((el: HTMLKolMultiSelectElement) => el._value);
			expect(value).toEqual(['W']);
		});

		test('clears all selections when clear button is clicked', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" ${OPTIONS_ATTRIBUTE}></kol-multi-select>`);
			await fillAction(page);

			const clearButton = page.getByTestId('multi-select-delete');
			await expect(clearButton).toHaveCount(1);
			await clearButton.click({ force: true });

			const value = await page.locator('kol-multi-select').evaluate((el: HTMLKolMultiSelectElement) => el._value);
			expect(value).toEqual([]);
		});

		test('does not render clear button when _hideClearButton is true', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" _hideClearButton="true" ${OPTIONS_ATTRIBUTE}></kol-multi-select>`);
			await fillAction(page);

			const clearButton = page.getByTestId('multi-select-delete');
			await expect(clearButton).toHaveCount(0);
		});

		test('removes last selected option with backspace when input is empty', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" ${OPTIONS_ATTRIBUTE}></kol-multi-select>`);
			await fillAction(page);

			const input = page.locator('input.kol-multi-select__input');
			await input.focus();
			await input.press('Backspace');

			const value = await page.locator('kol-multi-select').evaluate((el: HTMLKolMultiSelectElement) => el._value);
			expect(value).toEqual([TEST_VALUES[0]]);
		});

		test('shows summary of selected labels when input is not focused', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" ${OPTIONS_ATTRIBUTE}></kol-multi-select>`);
			await fillAction(page);

			const input = page.locator('input.kol-multi-select__input');
			await page.click('body');
			await expect(input).toHaveValue(`${TEST_LABELS[0]}, ${TEST_LABELS[1]}`);
		});

		test('emits input and change events with array values on selection', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" ${OPTIONS_ATTRIBUTE}></kol-multi-select>`);

			const component = page.locator('kol-multi-select');
			await component.evaluate((element) => {
				const el = element as HTMLKolMultiSelectElement & { _inputValues: unknown[]; _changeValues: unknown[] };
				el._inputValues = [];
				el._changeValues = [];
				element.addEventListener('kol-input', (event) => {
					el._inputValues.push((event as CustomEvent).detail);
				});
				element.addEventListener('kol-change', (event) => {
					el._changeValues.push((event as CustomEvent).detail);
				});
			});

			await page.getByRole('button').click();
			await page.getByRole('listbox').getByText(TEST_LABELS[0]).click({ force: true });
			await page.getByRole('listbox').getByText(TEST_LABELS[1]).click({ force: true });

			const details = await component.evaluate((element) => {
				const el = element as HTMLKolMultiSelectElement & { _inputValues: unknown[]; _changeValues: unknown[] };
				return { input: el._inputValues, change: el._changeValues };
			});

			expect(details.input).toEqual([[TEST_VALUES[0]], TEST_VALUES]);
			expect(details.change).toEqual([[TEST_VALUES[0]], TEST_VALUES]);
		});
	});
});
