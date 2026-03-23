import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-split-button', () => {
	test('should display toggle popover when the secondary button is clicked', async ({ page }) => {
		await page.setContent(` <kol-split-button _label="Sample Button">Dropdown contents</kol-split-button> `);
		const splitButton = page.locator('kol-split-button ');

		const secondaryButton = splitButton.locator('.kol-split-button__secondary-button');
		const popover = splitButton.locator('.kol-popover');

		await expect(popover).not.toBeVisible();
		await secondaryButton.click();
		await expect(popover).toBeVisible();
		await secondaryButton.click();
		await expect(popover).not.toBeVisible();
	});
});
