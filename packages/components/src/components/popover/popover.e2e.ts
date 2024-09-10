import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-popover', () => {
	test('should display popover when _show is true and hide when _show is false', async ({ page }) => {
		await page.setContent(`<kol-popover-wc _align="top">Dropdown-Inhalt</kol-popover-wc>`);
		const popoverComponent = page.locator('kol-popover-wc');
		const popoverElement = popoverComponent.locator('.popover');

		await expect(popoverElement).not.toBeVisible();
		await popoverComponent.evaluate(() => {
			const popover = document.querySelector('kol-popover-wc');

			if (popover) {
				popover._show = true;
			}
		});
		await expect(popoverElement).toBeVisible();

		await page.evaluate(() => {
			const popover = document.querySelector('kol-popover-wc');
			if (popover) popover._show = false;
		});
		await expect(popoverElement).not.toBeVisible();
	});
});
