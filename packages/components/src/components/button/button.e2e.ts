import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-button', () => {
	test('it renders label', async ({ page }) => {
		await page.setContent('<kol-button _label="Test Button Element" _variant="primary"></kol-button>');
		const kolButton = await page.locator('kol-button');
		await expect(kolButton).toContainText('Test Button Element');
	});

	// test('it emits event on click', async ({ page }) => {
	//
	// });
});
