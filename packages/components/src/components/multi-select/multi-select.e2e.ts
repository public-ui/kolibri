import { test } from '@stencil/playwright';
import { testInputCallbacksAndEvents, testInputValueReflection } from '../../e2e';
import type { FillAction } from '../../e2e/utils/FillAction';
import { expect } from '@playwright/test';
import { testInputMessage } from '../../e2e/input-msg';

const COMPONENT_NAME = 'kol-multi-select';
const TEST_VALUES = ['E', 'W'];
const TEST_LABELS = ['East', 'West'];
const OPTIONS = [
	{ label: 'North', value: 'N' },
	{ label: 'South', value: 'S' },
	{ label: 'West', value: 'W' },
	{ label: 'East', value: 'E' },
	{ label: 'Dr.', value: 'Dr.' },
	{ label: 'Prof.', value: 'Prof.' },
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
		fillAction,
		testValue: TEST_VALUES,
	});
	testInputCallbacksAndEvents<HTMLKolMultiSelectElement>({
		additionalProperties: OPTIONS_ATTRIBUTE,
		componentName: COMPONENT_NAME,
		fillAction,
		testValue: TEST_VALUES,
	});
	testInputMessage<HTMLKolMultiSelectElement>(COMPONENT_NAME);

	test.describe('kol-multi-select additional interactions', () => {
		test('should open listbox on button click and close on ESC', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" _options='${JSON.stringify(OPTIONS)}'></kol-multi-select>`);

			await page.getByRole('button').click();

			await expect(page.getByRole('listbox')).toBeVisible();

			await page.keyboard.press('Escape');

			await expect(page.getByRole('listbox')).toHaveCount(0);
		});

		test('should select multiple options and display them as badges', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" _options='${JSON.stringify(OPTIONS)}'></kol-multi-select>`);

			await page.getByRole('button').click();
			await page.getByRole('listbox').getByText('East').click({ force: true });
			await page.getByRole('listbox').getByText('West').click({ force: true });

			await expect(page.getByText('East')).toBeVisible();
			await expect(page.getByText('West')).toBeVisible();

			const value = await page.locator('kol-multi-select').evaluate((el: HTMLKolMultiSelectElement) => el._value);
			expect(value).toEqual(['E', 'W']);
		});

		test('should remove option when badge close button is clicked', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" _options='${JSON.stringify(OPTIONS)}'></kol-multi-select>`);

			await page.getByRole('button').click();
			await page.getByRole('listbox').getByText('East').click({ force: true });
			await page.getByRole('listbox').getByText('West').click({ force: true });

			const eastBadge = page.locator('kol-badge').filter({ hasText: 'East' });
			await eastBadge.locator('button').click();

			await expect(page.getByText('East')).toHaveCount(0);
			await expect(page.getByText('West')).toBeVisible();

			const value = await page.locator('kol-multi-select').evaluate((el: HTMLKolMultiSelectElement) => el._value);
			expect(value).toEqual(['W']);
		});

		test('should toggle option selection when clicking on it again', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" _options='${JSON.stringify(OPTIONS)}'></kol-multi-select>`);

			await page.getByRole('button').click();
			await page.getByRole('listbox').getByText('East').click({ force: true });

			let value = await page.locator('kol-multi-select').evaluate((el: HTMLKolMultiSelectElement) => el._value);
			expect(value).toEqual(['E']);

			await page.getByRole('listbox').getByText('East').click({ force: true });

			value = await page.locator('kol-multi-select').evaluate((el: HTMLKolMultiSelectElement) => el._value);
			expect(value).toEqual([]);
		});

		test('should clear all selections when clear button is clicked', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" _options='${JSON.stringify(OPTIONS)}'></kol-multi-select>`);

			await page.getByRole('button').click();
			await page.getByRole('listbox').getByText('East').click({ force: true });
			await page.getByRole('listbox').getByText('West').click({ force: true });

			const clearButton = page.getByTestId('multi-select-delete');
			await clearButton.click({ force: true });

			const value = await page.locator('kol-multi-select').evaluate((el: HTMLKolMultiSelectElement) => el._value);
			expect(value).toEqual([]);

			await expect(page.getByText('East')).toHaveCount(0);
			await expect(page.getByText('West')).toHaveCount(0);
		});

		test('should respect maxSelections limit', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" _maxSelections="2" _options='${JSON.stringify(OPTIONS)}'></kol-multi-select>`);

			await page.getByRole('button').click();
			await page.getByRole('listbox').getByText('East').click({ force: true });
			await page.getByRole('listbox').getByText('West').click({ force: true });
			await page.getByRole('listbox').getByText('North').click({ force: true });

			const value = await page.locator('kol-multi-select').evaluate((el: HTMLKolMultiSelectElement) => el._value);
			expect(value).toEqual(['E', 'W']);

			await expect(page.getByText('North')).toHaveCount(0);
		});

		test('should remove last selected option with Backspace when input is empty', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" _options='${JSON.stringify(OPTIONS)}'></kol-multi-select>`);

			await page.getByRole('button').click();
			await page.getByRole('listbox').getByText('East').click({ force: true });
			await page.getByRole('listbox').getByText('West').click({ force: true });

			const input = page.locator('input.kol-multi-select__input');
			await input.click();
			await input.press('Backspace');

			const value = await page.locator('kol-multi-select').evaluate((el: HTMLKolMultiSelectElement) => el._value);
			expect(value).toEqual(['E']);

			await expect(page.getByText('West')).toHaveCount(0);
			await expect(page.getByText('East')).toBeVisible();
		});

		test('should move focus with arrow keys and toggle selection with Enter', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" _options='${JSON.stringify(OPTIONS)}'></kol-multi-select>`);

			await page.getByRole('button').click();

			await page.keyboard.press('ArrowDown');
			await page.keyboard.press('ArrowDown');
			await page.keyboard.press('Enter');

			const value = await page.locator('kol-multi-select').evaluate((el: HTMLKolMultiSelectElement) => el._value);
			expect(value).toEqual(['S']);

			// Press Enter again to deselect
			await page.keyboard.press('Enter');

			const valueAfterDeselect = await page.locator('kol-multi-select').evaluate((el: HTMLKolMultiSelectElement) => el._value);
			expect(valueAfterDeselect).toEqual([]);
		});

		test('should filter options when typing and select the filtered one', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" _options='${JSON.stringify(OPTIONS)}'></kol-multi-select>`);
			await page.getByRole('button').click();

			await page.locator('input.kol-multi-select__input').focus();
			await page.locator('input.kol-multi-select__input').fill('We');

			await expect(page.getByText('West')).toBeVisible();
			await expect(page.getByText('North')).toHaveCount(0);

			await page.keyboard.press('ArrowDown');
			await page.keyboard.press('Enter');

			const value = await page.locator('kol-multi-select').evaluate((el: HTMLKolMultiSelectElement) => el._value);
			expect(value).toEqual(['W']);
		});

		test('should not render clear button when _hideClearButton is true', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" _hideClearButton="true" _options='${JSON.stringify(OPTIONS)}'></kol-multi-select>`);

			await page.getByRole('button').click();
			await page.getByRole('listbox').getByText('East').click({ force: true });

			const clearButton = page.getByTestId('multi-select-delete');
			await expect(clearButton).not.toBeVisible();
		});

		test('should disable interaction when _disabled is true', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" _disabled="true" _options='${JSON.stringify(OPTIONS)}'></kol-multi-select>`);

			await expect(page.locator('input.kol-multi-select__input')).toBeDisabled();

			const listbox = page.locator('ul[role="listbox"]');
			await expect(listbox).toHaveCount(0);
		});

		test('should display no results message when input does not match', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Test" _options='[{"label":"North","value":"N"}]'></kol-multi-select>`);
			const input = page.locator('input.kol-multi-select__input');
			await input.fill('Something');
			const noResult = page.getByText('Keine Ergebnisse gefunden.');
			await expect(noResult).toBeVisible();
		});

		test('should only trigger onChange when the value actually changes', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" _options='${JSON.stringify(OPTIONS)}'></kol-multi-select>`);

			const input = page.locator('input.kol-multi-select__input');
			const multiSelect = page.locator('kol-multi-select');

			await multiSelect.evaluate((element) => {
				const el = element as HTMLElement & { _changeCount: number };
				el._changeCount = 0;

				(element as HTMLKolMultiSelectElement)._on = {
					onChange: () => {
						el._changeCount++;
					},
				};
			});

			const getChangeCount = async () => {
				return await multiSelect.evaluate((el) => {
					return (el as HTMLElement & { _changeCount: number })._changeCount || 0;
				});
			};

			await input.click();
			await page.getByRole('listbox').getByText('East').click({ force: true });
			expect(await getChangeCount()).toBe(1);

			await page.click('html', { position: { x: 0, y: 0 } });
			expect(await getChangeCount()).toBe(1);
		});

		test('should handle aria-multiselectable and aria-selected attributes correctly', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" _options='${JSON.stringify(OPTIONS)}'></kol-multi-select>`);

			const input = page.locator('input.kol-multi-select__input');
			await expect(input).toHaveAttribute('aria-multiselectable', 'true');

			await page.getByRole('button').click();

			const listbox = page.getByRole('listbox');
			await expect(listbox).toHaveAttribute('aria-multiselectable', 'true');

			await page.getByRole('listbox').getByText('East').click({ force: true });

			const eastOption = page.getByRole('listbox').getByText('East');
			await expect(eastOption).toHaveAttribute('aria-selected', 'true');
		});
	});
});
