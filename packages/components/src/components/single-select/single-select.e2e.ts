import { test } from '@stencil/playwright';
import { expect, type Page } from '@playwright/test';
import { testInputCallbacksAndEvents, testInputValueReflection } from '../../e2e';
import type { FillAction } from '../../e2e/utils/FillAction';

const COMPONENT_NAME = 'kol-single-select';
const TEST_VALUE = 'E';
const TEST_LABEL = 'East';
const OPTIONS = [
	{ label: 'North', value: 'N' },
	{ label: 'South', value: 'S' },
	{ label: 'West', value: 'W' },
	{ label: 'East', value: 'E' },
];
const OPTIONS_ATTRIBUTE = `_options='${JSON.stringify(OPTIONS)}'`;
const fillAction: FillAction = async (page) => {
	await page.getByRole('button').click();
	await page.getByRole('listbox').getByText(TEST_LABEL).click({ force: true });
};

const selectInput = (page: Page) => {
	return page.getByTestId('single-select-input');
};
test.describe(COMPONENT_NAME, () => {
	testInputValueReflection<HTMLKolSingleSelectElement>(COMPONENT_NAME, TEST_VALUE, fillAction, OPTIONS_ATTRIBUTE);
	testInputCallbacksAndEvents<HTMLKolSingleSelectElement>(COMPONENT_NAME, TEST_VALUE, fillAction, ['click'], OPTIONS_ATTRIBUTE, selectInput);

	test.describe('kol-single-select additional interactions', () => {
		test('should open listbox on button click and close on ESC', async ({ page }) => {
			await page.setContent(`<kol-single-select _label="Input" _options='${JSON.stringify(OPTIONS)}'></kol-single-select>`);

			await page.getByRole('button').click();

			await expect(page.getByRole('listbox')).toBeVisible();

			await page.keyboard.press('Escape');

			await expect(page.getByRole('listbox')).toHaveCount(0);
		});

		test('should move focus with arrow keys and select with Enter', async ({ page }) => {
			await page.setContent(`<kol-single-select _label="Input" _options='${JSON.stringify(OPTIONS)}'></kol-single-select>`);

			await page.getByRole('button').click();

			await page.keyboard.press('ArrowDown');
			await page.keyboard.press('ArrowDown');
			await page.keyboard.press('Enter');

			const value = await page.locator('kol-single-select').evaluate((el: HTMLKolInputDateElement) => el._value);
			expect(value).toBe('S');
		});

		test('should filter options when typing and select the filtered one', async ({ page }) => {
			await page.setContent(`<kol-single-select _label="Input" _options='${JSON.stringify(OPTIONS)}'></kol-single-select>`);

			const input = page.getByTestId('single-select-input');

			await input.focus();
			await input.fill('We');

			await expect(page.getByText('West')).toBeVisible();
			await expect(page.getByText('North')).toHaveCount(0);

			await page.keyboard.press('ArrowDown');
			await page.keyboard.press('Enter');

			const value = await page.locator('kol-single-select').evaluate((el: HTMLKolInputDateElement) => el._value);
			expect(value).toBe('W');
		});

		test('should clear the selection when clear button is clicked', async ({ page }) => {
			await page.setContent(`<kol-single-select _label="Input" _options='${JSON.stringify(OPTIONS)}' ></kol-single-select>`);

			const input = page.getByTestId('single-select-input');
			await page.getByRole('button').click();

			await page.getByRole('listbox').getByText(TEST_LABEL).click({ force: true });

			await expect(input).toHaveValue(TEST_LABEL);
			await page.waitForChanges();
			await page.waitForTimeout(500);

			const clearButton = page.locator('.single-select__delete');
			await expect(clearButton).toHaveCount(1);
			await clearButton.click({ force: true });

			await expect(input).toHaveValue('');
		});

		test('should not render clear button when _hideClearButton is true', async ({ page }) => {
			await page.setContent(`<kol-single-select _label="Input" _hideClearButton="true" _options='${JSON.stringify(OPTIONS)}'></kol-single-select>`);

			await page.getByRole('button').click();
			await page.getByRole('listbox').getByText(TEST_LABEL).click({ force: true });

			await expect(page.getByTestId('single-select-input')).toHaveValue(TEST_LABEL);

			const clearButton = page.locator('.single-select__delete');
			await expect(clearButton).not.toBeVisible();
		});

		test('should select option with SPACE key', async ({ page }) => {
			await page.setContent(`<kol-single-select _label="Input" _options='${JSON.stringify(OPTIONS)}'></kol-single-select>`);

			const input = page.getByTestId('single-select-input');

			await input.click();
			await input.press('ArrowDown');
			await input.press('Space');

			await expect(page.locator('kol-single-select')).toHaveJSProperty('_value', 'N');
		});

		test('should disable interaction when _disabled is true', async ({ page }) => {
			await page.setContent(`<kol-single-select _label="Input" _disabled="true" _options='${JSON.stringify(OPTIONS)}'></kol-single-select>`);

			await expect(page.getByTestId('single-select-input')).toBeDisabled();

			const listbox = page.locator('ul[role="listbox"]');
			await expect(listbox).toHaveCount(0);
		});

		test('should display no results message when input does not match', async ({ page }) => {
			await page.setContent(`<kol-single-select _label="Test" _options='[{"label":"North","value":"N"}]'></kol-single-select>`);
			const input = page.getByTestId('single-select-input');
			await input.fill('Something');
			const noResult = page.getByText('Keine Ergebnisse gefunden.');
			await expect(noResult).toBeVisible();
		});
	});
});
