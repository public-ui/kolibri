import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test('abbr', async ({ page }) => {
	await page.setContent('<kol-abbr _label="zum Beispiel">z.B.</kol-abbr>');
	const kolAbbr = await page.locator('kol-abbr');
	const tooltip = await kolAbbr.locator('kol-tooltip-wc kol-span-wc');
	await expect(tooltip).not.toBeVisible();
	await kolAbbr.hover();
	await expect(tooltip).toBeVisible();
	await expect(tooltip).toContainText('zum Beispiel');
});
