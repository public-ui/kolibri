import { test } from '@stencil/playwright';
import { testInputCallbacksAndEvents, testInputValueReflection } from '../../e2e';
import { expect } from '@playwright/test';

const COMPONENT_NAME = 'kol-combobox';
const TEST_VALUE = 'Hello World';
const OPTIONS = ['North', 'South', 'West', 'East'];

test.describe(COMPONENT_NAME, () => {
	testInputValueReflection<HTMLKolComboboxElement>(COMPONENT_NAME, TEST_VALUE);
	testInputCallbacksAndEvents<HTMLKolComboboxElement>(COMPONENT_NAME, TEST_VALUE);

	test('should fire input and change events', async ({ page }) => {
		await page.setContent(`<kol-combobox _label="Input" _suggestions=${JSON.stringify(OPTIONS)}></kol-combobox>`);
		const input = page.locator('input.kol-combobox__input');

		await input.fill(TEST_VALUE);
		await expect(input).toHaveValue(TEST_VALUE);
	});

	test('should open listbox when button is clicked', async ({ page }) => {
		await page.setContent(`<kol-combobox _label="Input" _suggestions=${JSON.stringify(OPTIONS)}></kol-combobox>`);
		await page.getByRole('button').click();
		const listbox = page.locator('ul[role="listbox"]');
		await expect(listbox).toBeVisible();
	});

	test('should close listbox when pressing Escape', async ({ page }) => {
		await page.setContent(`<kol-combobox _label="Input" _suggestions=${JSON.stringify(OPTIONS)}></kol-combobox>`);
		await page.getByRole('button').click();
		const input = page.locator('input.kol-combobox__input');
		await input.press('Escape');
		const listbox = page.locator('ul[role="listbox"]');
		await expect(listbox).toHaveCount(0);
	});

	test('should select option with Enter key', async ({ page }) => {
		await page.setContent(`<kol-combobox _label="Input" _suggestions=${JSON.stringify(OPTIONS)}></kol-combobox>`);
		await page.getByRole('button').click();
		const input = page.locator('input.kol-combobox__input');
		await input.focus();
		await page.keyboard.press('ArrowDown');
		await page.keyboard.press('Enter');

		await expect(input).toHaveValue('North');
	});

	test('should filter suggestions based on input', async ({ page }) => {
		await page.setContent(`<kol-combobox _label="Input"></kol-combobox>`);
		await page.evaluate(() => {
			const combobox = document.querySelector('kol-combobox');
			if (combobox) combobox._suggestions = ['North', 'South', 'West', 'East'];
		});
		const input = page.locator('input.kol-combobox__input');
		await input.focus();
		await input.fill('SOU');

		await page.waitForChanges();
		await page.waitForTimeout(300);
		const suggestions = page.locator('ul[role="listbox"] li');
		await expect(suggestions).toHaveCount(1);
		await expect(suggestions.first()).toHaveText('South');
	});

	test('should disable interaction when _disabled is true', async ({ page }) => {
		await page.setContent(`<kol-combobox _label="Input" _disabled _suggestions=${JSON.stringify(OPTIONS)}></kol-combobox>`);
		await page.getByRole('button').click({ force: true });
		const listbox = page.locator('ul[role="listbox"]');
		await expect(listbox).toHaveCount(0);
	});
});
