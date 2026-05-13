import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { testInputValueReflection } from '../../e2e';
import { testInputMessage } from '../../e2e/input-msg';
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
	const input = page.locator('input.kol-single-select__input');
	await input.click();
	await page.getByRole('listbox').getByText(TEST_LABEL).click({ force: true });
};

test.describe(COMPONENT_NAME, () => {
	testInputValueReflection<HTMLKolSingleSelectElement>({
		additionalProperties: OPTIONS_ATTRIBUTE,
		componentName: COMPONENT_NAME,
		fillAction,
		testValue: TEST_VALUE,
	});
	testInputMessage<HTMLKolSingleSelectElement>(COMPONENT_NAME);

	test.describe('kol-single-select additional interactions', () => {
		test('should open listbox on button click and close on ESC', async ({ page }) => {
			await page.setContent(`<kol-single-select _label="Input" _options='${JSON.stringify(OPTIONS)}'></kol-single-select>`);

			const input = page.locator('input.kol-single-select__input');
			await input.click();

			await expect(page.getByRole('listbox')).toBeVisible();

			await page.keyboard.press('Escape');

			await expect(page.getByRole('listbox')).toHaveCount(0);
		});

		test('should move focus with arrow keys and select with Enter & close list', async ({ page }) => {
			await page.setContent(`<kol-single-select _label="Input" _options='${JSON.stringify(OPTIONS)}'></kol-single-select>`);

			const input = page.locator('input.kol-single-select__input');
			await input.click();

			await page.keyboard.press('ArrowDown');
			await page.keyboard.press('ArrowDown');
			await page.keyboard.press('Enter');

			const value = await page
				.locator('kol-single-select')
				.evaluate<string | null>((element) => (element as HTMLKolSingleSelectElement)._value as string | null);
			expect(value).toBe('S');

			await expect(page.getByRole('listbox')).toHaveCount(0);
		});

		test('should filter options when typing and select the filtered one', async ({ page }) => {
			await page.setContent(`<kol-single-select _label="Input" _options='${JSON.stringify(OPTIONS)}'></kol-single-select>`);
			const input = page.locator('input.kol-single-select__input');
			await input.click();

			await page.locator('input.kol-single-select__input').focus();
			await page.locator('input.kol-single-select__input').fill('We');

			await expect(page.getByText('West')).toBeVisible();
			await expect(page.getByText('North')).toHaveCount(0);

			await page.keyboard.press('ArrowDown');
			await page.keyboard.press('Enter');

			const value = await page
				.locator('kol-single-select')
				.evaluate<string | null>((element) => (element as HTMLKolSingleSelectElement)._value as string | null);
			expect(value).toBe('W');
		});

		test('should clear the selection when clear button is clicked', async ({ page }) => {
			await page.setContent(`<kol-single-select _label="Input" _options='${JSON.stringify(OPTIONS)}' ></kol-single-select>`);
			const input = page.locator('input.kol-single-select__input');
			await input.click();

			await page.getByRole('listbox').getByText(TEST_LABEL).click({ force: true });

			await expect(input).toHaveValue(TEST_LABEL);
			await page.waitForChanges();
			await page.waitForTimeout(500);

			const clearButton = page.getByTestId('single-select-delete');
			await expect(clearButton).toHaveCount(1);
			await clearButton.click({ force: true });

			await expect(input).toHaveValue('');
		});

		test('should not render clear button when _hasClearButton is false', async ({ page }) => {
			// Use setContent like other tests to ensure proper setup
			await page.setContent(`<kol-single-select _label="Input" _options='${JSON.stringify(OPTIONS)}'></kol-single-select>`);

			// Set _hasClearButton to false after component is loaded
			await page.evaluate(() => {
				const el = document.querySelector('kol-single-select') as HTMLElement & { _hasClearButton: boolean };
				el._hasClearButton = false;
			});

			const input = page.locator('input.kol-single-select__input');
			await input.click();

			// Select a value to potentially trigger clear button
			await page.getByRole('listbox').getByText(TEST_LABEL).click({ force: true });
			await expect(input).toHaveValue(TEST_LABEL);

			const clearButton = page.getByTestId('single-select-delete');
			await expect(clearButton).not.toBeVisible();
		});

		test('should select option with SPACE key & close list', async ({ page }) => {
			await page.setContent(`<kol-single-select _label="Input" _options='${JSON.stringify(OPTIONS)}'></kol-single-select>`);
			const input = page.locator('input.kol-single-select__input');
			await input.click();

			await input.click();
			await input.press('ArrowDown');
			await input.press('Space');

			await expect(page.locator('kol-single-select')).toHaveJSProperty('_value', 'N');

			await expect(page.getByRole('listbox')).toHaveCount(0);
		});

		test('should disable interaction when _disabled is true', async ({ page }) => {
			await page.setContent(`<kol-single-select _label="Input" _disabled="true" _options='${JSON.stringify(OPTIONS)}'></kol-single-select>`);

			await expect(page.locator('input.kol-single-select__input')).toBeDisabled();

			const listbox = page.locator('.kol-custom-suggestions-options-group--open');
			await expect(listbox).toHaveCount(0);
		});

		test('should display no results message when input does not match', async ({ page }) => {
			await page.setContent(`<kol-single-select _label="Test" _options='[{"label":"North","value":"N"}]'></kol-single-select>`);
			const input = page.locator('input.kol-single-select__input');
			await input.fill('Something');
			const noResult = page.getByText('Keine Ergebnisse gefunden.');
			await expect(noResult).toBeVisible();
		});

		test('should only trigger onChange when the value actually changes', async ({ page }) => {
			await page.setContent(`<kol-single-select _label="Input" _options='${JSON.stringify(OPTIONS)}' ></kol-single-select>`);

			const input = page.locator('input.kol-single-select__input');
			const singleSelect = page.locator('kol-single-select');

			// Setup simple change counter
			await singleSelect.evaluate((element) => {
				const el = element as HTMLElement & { _changeCount: number };
				el._changeCount = 0;

				(element as HTMLKolSelectElement)._on = {
					onChange: () => {
						el._changeCount++;
					},
				};
			});

			// Helper to get counter
			const getChangeCount = async () => {
				return await singleSelect.evaluate((el) => {
					return (el as HTMLElement & { _changeCount: number })._changeCount || 0;
				});
			};

			// 1) Select value -> onChange should fire (counter = 1)
			await input.click();
			await page.getByRole('listbox').getByText(TEST_LABEL).click({ force: true });
			expect(await getChangeCount()).toBe(1);

			// 2) Click on free space -> onChange must NOT fire (counter stays 1)
			await page.click('html', { position: { x: 0, y: 0 } });
			expect(await getChangeCount()).toBe(1);
		});
	});
});
