import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-input-text', () => {
	test.describe('counter', () => {
		test('should show the counter for an initial value', async ({ page }) => {
			await page.setContent('<kol-input-text _label="Input" _value="Lorem Ipsum" _has-counter></kol-input-text>');
			await expect(page.getByTestId('input-counter')).toHaveText('11 Zeichen');
		});

		test('should update the counter when the value changes', async ({ page }) => {
			await page.setContent('<kol-input-text _label="Input" _value="Lorem Ipsum" _has-counter></kol-input-text>');
			await page.locator('input').fill('Lorem');
			await expect(page.getByTestId('input-counter')).toHaveText('5 Zeichen');
		});
	});
	test.describe('smart-button', () => {
		test('should have smart-button', async ({ page }) => {
			const smartButton = JSON.stringify({
				_icons: 'codicon-info',
				_label: 'Smart-Button',
			});

			await page.setContent(`<kol-input-text _label="With Smart Button" _type="text" _smart-button='${smartButton}'></kol-input-text>`);
			const kolButton = page.locator('kol-button-wc');
			await expect(kolButton).toHaveCount(1);

			await kolButton.click();
		});
	});
});
