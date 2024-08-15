import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-split-button', () => {
	test('should display popover when the split button is clicked', async ({ page }) => {
		await page.setContent(` <kol-split-button _label="Sample Button">Dropdown-Inhalt</kol-split-button> `);
		const splitButton = page.locator('kol-split-button ');

		const mainButton = splitButton.locator('.main-button');
		const secondaryButton = splitButton.locator('.secondary-button');
		const popover = splitButton.locator('kol-popover-wc');

		await expect(popover.locator('.popover')).not.toBeVisible();
		await secondaryButton.click({ force: true });
		await expect(popover.locator('.popover')).toBeVisible();
		await secondaryButton.click({ force: true });
		await expect(popover.locator('.popover')).not.toBeVisible();

		await expect(popover.locator('.popover')).not.toBeVisible();
		await mainButton.click({ force: true });
		await expect(popover.locator('.popover')).toBeVisible();
		await mainButton.click({ force: true });
		await expect(popover.locator('.popover')).not.toBeVisible();
	});
});
