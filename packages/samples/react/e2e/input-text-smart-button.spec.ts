import { expect, test } from '@playwright/test';

test.describe('KolInputText Smart-Button', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('#/input-text/smart-button?hideMenus');
	});
	test('Smart-Button clicked', async ({ page }) => {
		const kolButton = page.locator('.kol-input-container__smart-button');
		await expect(kolButton).toHaveCount(2);

		await kolButton.first().getByRole('button').click();

		const kolToast = page.locator('.kol-toast-item');
		await expect(kolToast).toHaveCount(1);
	});
});
