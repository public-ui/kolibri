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

	test.describe('alert', () => {
		test('should render error messages with role=alert when the _alert prop is set to true', async ({ page }) => {
			await page.setContent(`<kol-input-text
															_label="Input"
															_msg="{'_description': 'Broken', '_type': 'error'}"
															_touched
															_alert
														/>`);

			await expect(page.locator('kol-alert-wc')).toHaveAttribute('role', 'alert');
		});

		test('should control the role=alert on error messages based on focus when no _alert prop is set', async ({ page }) => {
			await page.setContent(`<kol-input-text
															_label="Input"
															_msg="{'_description': 'Broken', '_type': 'erro=r'}"
															_touched
														/>`);

			await expect(page.locator('kol-alert-wc')).toHaveAttribute('role', 'alert');
			await page.locator('input').focus();
			await expect(page.locator('kol-alert-wc')).not.toHaveAttribute('role', 'alert');
			await page.locator('input').blur();
			await expect(page.locator('kol-alert-wc')).toHaveAttribute('role', 'alert');
		});
	});
});
