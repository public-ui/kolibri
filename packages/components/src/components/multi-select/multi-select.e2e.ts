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

			const value = await page.locator('kol-multi-select').evaluate((el: HTMLKolMultiSelectElement) => el._value as string[]);
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

			const value = await page.locator('kol-multi-select').evaluate((el: HTMLKolMultiSelectElement) => el._value as string[]);
			expect(value).toEqual(['W']);
		});

		test('should toggle option selection when clicking on it again', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" _options='${JSON.stringify(OPTIONS)}'></kol-multi-select>`);

			await page.getByRole('button').click();
			await page.getByRole('listbox').getByText('East').click({ force: true });

			let value = await page.locator('kol-multi-select').evaluate((el: HTMLKolMultiSelectElement) => el._value as string[]);
			expect(value).toEqual(['E']);

			await page.getByRole('listbox').getByText('East').click({ force: true });

			value = await page.locator('kol-multi-select').evaluate((el: HTMLKolMultiSelectElement) => el._value as string[]);
			expect(value).toEqual([]);
		});

		test('should clear all selections when clear button is clicked', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" _options='${JSON.stringify(OPTIONS)}'></kol-multi-select>`);

			await page.getByRole('button').click();
			await page.getByRole('listbox').getByText('East').click({ force: true });
			await page.getByRole('listbox').getByText('West').click({ force: true });

			const clearButton = page.getByTestId('multi-select-delete');
			await clearButton.click({ force: true });

			const value = await page.locator('kol-multi-select').evaluate((el: HTMLKolMultiSelectElement) => el._value as string[]);
			expect(value).toEqual([]);

			await expect(page.getByText('East')).toHaveCount(0);
			await expect(page.getByText('West')).toHaveCount(0);
		});

		test('should remove last selected option with Backspace when input is empty', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" _options='${JSON.stringify(OPTIONS)}'></kol-multi-select>`);

			await page.getByRole('button').click();
			await page.getByRole('listbox').getByText('East').click({ force: true });
			await page.getByRole('listbox').getByText('West').click({ force: true });

			const input = page.locator('input.kol-multi-select__input');
			await input.click();
			await input.press('Backspace');

			const badges = page.locator('.kol-multi-select__badge-wrapper');
			await expect(badges.last()).toBeFocused();

			await page.keyboard.press('Backspace');

			const value = await page.locator('kol-multi-select').evaluate((el: HTMLKolMultiSelectElement) => el._value as string[]);
			expect(value).toEqual(['E']);

			await expect(page.getByText('West')).toHaveCount(0);
			await expect(page.getByText('East')).toBeVisible();
		});

		test('should move focus with arrow keys and toggle selection with Enter', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" _options='${JSON.stringify(OPTIONS)}'></kol-multi-select>`);

			await page.getByRole('button').click();

			await page.keyboard.press('ArrowDown');
			await page.keyboard.press('Enter');

			const value = await page.locator('kol-multi-select').evaluate((el: HTMLKolMultiSelectElement) => el._value as string[]);
			expect(value).toEqual(['S']);

			// Press Enter again to deselect
			await page.keyboard.press('Enter');

			const valueAfterDeselect = await page.locator('kol-multi-select').evaluate((el: HTMLKolMultiSelectElement) => el._value as string[]);
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

			const value = await page.locator('kol-multi-select').evaluate((el: HTMLKolMultiSelectElement) => el._value as string[]);
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

		test('should not add space to input when selecting with Space key', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" _options='${JSON.stringify(OPTIONS)}'></kol-multi-select>`);

			const input = page.locator('input.kol-multi-select__input');
			await page.getByRole('button').click();

			await input.fill('Eas');

			await page.keyboard.press('ArrowDown');
			await page.keyboard.press('Space');

			const inputValue = await input.inputValue();
			expect(inputValue).toBe('');

			const value = await page.locator('kol-multi-select').evaluate((el: HTMLKolMultiSelectElement) => el._value as string[]);
			expect(value).toEqual(['E']);
		});

		test('should not add space to input when selecting with Enter key', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" _options='${JSON.stringify(OPTIONS)}'></kol-multi-select>`);

			const input = page.locator('input.kol-multi-select__input');
			await page.getByRole('button').click();

			await input.fill('Wes');

			await page.keyboard.press('ArrowDown');
			await page.keyboard.press('Enter');

			const inputValue = await input.inputValue();
			expect(inputValue).toBe('');

			const value = await page.locator('kol-multi-select').evaluate((el: HTMLKolMultiSelectElement) => el._value as string[]);
			expect(value).toEqual(['W']);
		});

		test('should clear input value after selecting an option', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" _options='${JSON.stringify(OPTIONS)}'></kol-multi-select>`);

			const input = page.locator('input.kol-multi-select__input');
			await page.getByRole('button').click();

			await input.fill('North');

			await page.getByRole('listbox').getByText('North').click({ force: true });

			const inputValue = await input.inputValue();
			expect(inputValue).toBe('');

			await page.getByRole('button').click();
			await expect(page.getByRole('listbox').getByText('South')).toBeVisible();
			await expect(page.getByRole('listbox').getByText('East')).toBeVisible();
		});

		test('should not select first option when typing and no option is focused', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" _options='${JSON.stringify(OPTIONS)}'></kol-multi-select>`);

			const input = page.locator('input.kol-multi-select__input');
			await page.getByRole('button').click();

			await input.fill('Pro');
			await page.keyboard.press('Enter');

			const value = await page.locator('kol-multi-select').evaluate((el: HTMLKolMultiSelectElement) => el._value as string[]);
			expect(value).toEqual(['Prof.']);
		});

		test('should navigate badges with Tab and skip close buttons', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" _options='${JSON.stringify(OPTIONS)}'></kol-multi-select>`);

			await page.getByRole('button').click();
			await page.getByRole('listbox').getByText('East').click({ force: true });
			await page.getByRole('listbox').getByText('West').click({ force: true });
			await page.getByRole('listbox').getByText('North').click({ force: true });

			const input = page.locator('input.kol-multi-select__input');
			await input.click();

			await page.keyboard.press('Shift+Tab');

			const lastBadge = page.locator('.kol-multi-select__badge-wrapper').last();
			await expect(lastBadge).toBeFocused();

			await page.keyboard.press('Shift+Tab');
			const secondBadge = page.locator('.kol-multi-select__badge-wrapper').nth(1);
			await expect(secondBadge).toBeFocused();
		});

		test('should navigate between badges with Arrow keys', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" _options='${JSON.stringify(OPTIONS)}'></kol-multi-select>`);

			await page.getByRole('button').click();
			await page.getByRole('listbox').getByText('East').click({ force: true });
			await page.getByRole('listbox').getByText('West').click({ force: true });
			await page.getByRole('listbox').getByText('North').click({ force: true });

			const input = page.locator('input.kol-multi-select__input');
			await input.press('Backspace');

			const badges = page.locator('.kol-multi-select__badge-wrapper');

			await expect(badges.nth(2)).toBeFocused();

			await page.keyboard.press('ArrowLeft');
			await expect(badges.nth(1)).toBeFocused();

			await page.keyboard.press('ArrowLeft');
			await expect(badges.nth(0)).toBeFocused();

			await page.keyboard.press('ArrowRight');
			await expect(badges.nth(1)).toBeFocused();

			await page.keyboard.press('ArrowRight');
			await expect(badges.nth(2)).toBeFocused();

			await page.keyboard.press('ArrowRight');
			await expect(input).toBeFocused();
		});

		test('should delete badge with Delete key when badge is focused', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" _options='${JSON.stringify(OPTIONS)}'></kol-multi-select>`);

			await page.getByRole('button').click();
			await page.getByRole('listbox').getByText('East').click({ force: true });
			await page.getByRole('listbox').getByText('West').click({ force: true });

			const input = page.locator('input.kol-multi-select__input');
			await input.press('Backspace');
			await page.keyboard.press('Delete');

			const value = await page.locator('kol-multi-select').evaluate((el: HTMLKolMultiSelectElement) => el._value as string[]);
			expect(value).toEqual(['E']);

			await expect(page.getByText('West')).toHaveCount(0);
		});

		test('should delete badge with Backspace key when badge is focused', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" _options='${JSON.stringify(OPTIONS)}'></kol-multi-select>`);

			await page.getByRole('button').click();
			await page.getByRole('listbox').getByText('East').click({ force: true });
			await page.getByRole('listbox').getByText('West').click({ force: true });

			const input = page.locator('input.kol-multi-select__input');
			await input.press('Backspace');

			await page.keyboard.press('Backspace');

			const value = await page.locator('kol-multi-select').evaluate((el: HTMLKolMultiSelectElement) => el._value as string[]);
			expect(value).toEqual(['E']);

			await expect(page.getByText('West')).toHaveCount(0);
		});

		test('should move focus to correct badge after deleting one', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" _options='${JSON.stringify(OPTIONS)}'></kol-multi-select>`);

			await page.getByRole('button').click();
			await page.getByRole('listbox').getByText('East').click({ force: true });
			await page.getByRole('listbox').getByText('West').click({ force: true });
			await page.getByRole('listbox').getByText('North').click({ force: true });

			const input = page.locator('input.kol-multi-select__input');
			const badges = page.locator('.kol-multi-select__badge-wrapper');

			await input.press('Backspace');
			await page.keyboard.press('ArrowLeft');

			await expect(badges.nth(1)).toBeFocused();
			await page.keyboard.press('Delete');
			await expect(badges.nth(1)).toBeFocused();
		});

		test('should jump to first badge with Home key when badge is focused', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" _options='${JSON.stringify(OPTIONS)}'></kol-multi-select>`);

			await page.getByRole('button').click();
			await page.getByRole('listbox').getByText('East').click({ force: true });
			await page.getByRole('listbox').getByText('West').click({ force: true });
			await page.getByRole('listbox').getByText('North').click({ force: true });

			const input = page.locator('input.kol-multi-select__input');
			const badges = page.locator('.kol-multi-select__badge-wrapper');

			await input.press('Backspace');
			await expect(badges.nth(2)).toBeFocused();
			await page.keyboard.press('Home');
			await expect(badges.nth(0)).toBeFocused();
		});

		test('should jump to input with End key when badge is focused', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" _options='${JSON.stringify(OPTIONS)}'></kol-multi-select>`);

			await page.getByRole('button').click();
			await page.getByRole('listbox').getByText('East').click({ force: true });
			await page.getByRole('listbox').getByText('West').click({ force: true });

			const input = page.locator('input.kol-multi-select__input');
			const badges = page.locator('.kol-multi-select__badge-wrapper');

			await input.press('Backspace');
			await page.keyboard.press('ArrowLeft');
			await expect(badges.nth(0)).toBeFocused();

			await page.keyboard.press('End');
			await expect(input).toBeFocused();
		});

		test('should display pre-selected values on load', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" _options='${JSON.stringify(OPTIONS)}' _value='["E", "W"]'></kol-multi-select>`);

			await expect(page.getByText('East')).toBeVisible();
			await expect(page.getByText('West')).toBeVisible();

			const value = await page.locator('kol-multi-select').evaluate((el: HTMLKolMultiSelectElement) => el._value as string[]);
			expect(value).toEqual(['E', 'W']);
		});

		test('should handle ArrowLeft from input to move to last badge', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" _options='${JSON.stringify(OPTIONS)}'></kol-multi-select>`);

			await page.getByRole('button').click();
			await page.getByRole('listbox').getByText('East').click({ force: true });
			await page.getByRole('listbox').getByText('West').click({ force: true });

			const input = page.locator('input.kol-multi-select__input');
			const badges = page.locator('.kol-multi-select__badge-wrapper');

			await input.focus();

			await page.keyboard.press('ArrowLeft');
			await expect(badges.last()).toBeFocused();
		});

		test('should not move to badge with ArrowLeft if input has content', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" _options='${JSON.stringify(OPTIONS)}'></kol-multi-select>`);

			await page.getByRole('button').click();
			await page.getByRole('listbox').getByText('East').click({ force: true });

			const input = page.locator('input.kol-multi-select__input');

			await input.fill('test');

			await page.keyboard.press('ArrowLeft');
			await expect(input).toBeFocused();
		});

		test('should close listbox on Tab key', async ({ page }) => {
			await page.setContent(`<kol-multi-select _label="Input" _options='${JSON.stringify(OPTIONS)}'></kol-multi-select>`);

			await page.getByRole('button').click();
			await expect(page.getByRole('listbox')).toBeVisible();

			await page.keyboard.press('Tab');

			await expect(page.getByRole('listbox')).toHaveCount(0);
		});
	});
});
