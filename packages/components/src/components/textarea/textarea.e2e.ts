import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-textarea', () => {
	test.describe('counter', () => {
		test('should show the counter for an initial value', async ({ page }) => {
			await page.setContent('<kol-textarea _label="Textarea" _value="Lorem Ipsum" _has-counter></kol-textarea>');
			await expect(page.getByTestId('input-counter')).toHaveText('11 Zeichen');
		});

		test('should update the counter when the value changes', async ({ page }) => {
			await page.setContent('<kol-textarea _label="Textarea" _value="Lorem Ipsum" _has-counter></kol-textarea>');
			await page.locator('textarea').fill('Lorem');
			await expect(page.getByTestId('input-counter')).toHaveText('5 Zeichen');
		});
	});
});
