import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('Combobox', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/#/combobox/basic');
	});

	test('should show a value initially', async ({ page }) => {
		const input = await page.locator('kol-combobox').first().getByLabel('Label');
		expect(await input.inputValue()).toBe('Deutschland');
	});

	test('should show all options when clicking the text input', async ({ page }) => {
		const combobox = await page.locator('kol-combobox').first();
		const input = combobox.getByLabel('Label');
		await input.click();
		expect(await combobox.getByRole('listbox')).toBeVisible();
		expect(await combobox.getByRole('listbox').locator('li').count()).toBe(193);
	});

	test('should show all options when clicking the arrow icon', async ({ page }) => {
		const combobox = await page.locator('kol-combobox').first();
		await combobox.locator('.combobox__icon').click();
		expect(await combobox.getByRole('listbox')).toBeVisible();
		expect(await combobox.getByRole('listbox').locator('li').count()).toBe(193);
	});
});
