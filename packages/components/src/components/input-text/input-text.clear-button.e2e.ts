import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-input-text clear button', () => {
	test('should render clear button when type is search and input has value', async ({ page }) => {
		await page.setContent('<kol-input-text _label="Search" _type="search" _value="test"></kol-input-text>');
		const clearButton = page.getByTestId('kol-input-text-clear-button');
		await expect(clearButton).toBeVisible();
	});

	test('should not render clear button when type is not search', async ({ page }) => {
		await page.setContent('<kol-input-text _label="Text" _type="text" _value="test"></kol-input-text>');
		const clearButton = page.getByTestId('kol-input-text-clear-button');
		await expect(clearButton).not.toBeVisible();
	});

	test('should not render clear button when input is empty', async ({ page }) => {
		await page.setContent('<kol-input-text _label="Search" _type="search"></kol-input-text>');
		const clearButton = page.getByTestId('kol-input-text-clear-button');
		await expect(clearButton).not.toBeVisible();
	});

	test('should render clear button when input has value', async ({ page }) => {
		await page.setContent('<kol-input-text _label="Search" _type="search" _value="test"></kol-input-text>');
		const clearButton = page.getByTestId('kol-input-text-clear-button');
		await expect(clearButton).toBeVisible();
	});

	test('should clear input value when clear button is clicked', async ({ page }) => {
		await page.setContent('<kol-input-text _label="Search" _type="search" _value="test"></kol-input-text>');
		const input = page.locator('kol-input-text input');
		const clearButton = page.getByTestId('kol-input-text-clear-button');

		await expect(input).toHaveValue('test');
		await clearButton.click();
		await expect(input).toHaveValue('');
	});

	test('should not render clear button when disabled', async ({ page }) => {
		await page.setContent('<kol-input-text _label="Search" _type="search" _disabled _value="test"></kol-input-text>');
		const clearButton = page.getByTestId('kol-input-text-clear-button');
		await expect(clearButton).not.toBeVisible();
	});

	test('should have correct aria-label', async ({ page }) => {
		await page.setContent('<kol-input-text _label="Search" _type="search" _value="test"></kol-input-text>');
		const clearButton = page.getByTestId('kol-input-text-clear-button');
		await expect(clearButton).toHaveAttribute('aria-label', 'Suche löschen');
	});
});
