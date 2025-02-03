import { expect, test } from '@playwright/test';

test.describe('KolInputText SmartButton', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('#/input-text/smart-button?hideMenus');
	});
	test('SmartButton clicked', async ({ page }) => {
		const kolButton = page.locator('kol-button-wc');
		await expect(kolButton).toHaveCount(1);

		await kolButton.getByRole('button').click();

		const kolAlert = page.locator('kol-alert-wc');
		await expect(kolAlert).toHaveCount(1);
	});
});
