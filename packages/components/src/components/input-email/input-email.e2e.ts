import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-input-email', () => {
	test.describe('counter', () => {
		test('should show the counter for an initial value', async ({ page }) => {
			await page.setContent('<kol-input-email _label="Input" _value="Lorem Ipsum" _has-counter></kol-input-email');
			await expect(page.getByTestId('input-counter')).toHaveText('11 Zeichen');
		});

		test('should update the counter when the value changes', async ({ page }) => {
			await page.setContent('<kol-input-email _label="Input" _value="Lorem Ipsum" _has-counter></kol-input-email');
			await page.locator('input').fill('Lorem');
			await expect(page.getByTestId('input-counter')).toHaveText('5 Zeichen');
		});
	});
});
