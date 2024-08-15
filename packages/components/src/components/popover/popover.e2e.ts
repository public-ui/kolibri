import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-popover-wc', () => {
	test('should display popover when _show is true and hide when _show is false', async ({ page }) => {
		await page.setContent(` <button id="trigger">Trigger Button</button> <kol-popover-wc _align="top" >Dropdown-Inhalt</kol-popover-wc> `);
		const popover = page.locator('kol-popover-wc');
		await expect(popover.locator('.popover')).not.toBeVisible();
		await popover.evaluate(() => {
			const popover = document.querySelector('kol-popover-wc');

			if (popover) {
				popover._show = true;
			}
		});

		await expect(popover.locator('.popover')).toBeVisible();
		const alignAttr = await popover.evaluate((el) => el.getAttribute('_align'));
		expect(alignAttr).toBe('top');
		await page.evaluate(() => {
			const popover = document.querySelector('kol-popover-wc');
			if (popover) popover._show = false;
		});
		await expect(popover.locator('.popover')).not.toBeVisible();
	});
});
