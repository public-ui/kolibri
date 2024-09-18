import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-button', () => {
	test.describe('has smart-button', () => {
		test.beforeEach(async ({ page }) => {
			await page.setContent('<kol-text-input class="kol-input-text hydrated" _label="Test Button with smart-button" _type="text"></kol-text-input>');
			const kolInput = page.locator('kol-text-input');
			await expect(kolInput).toContainText('Test Input with smart-button');
		});
	});
});
