import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-abbr', () => {
	test('it shows tooltip on hover', async ({ page }) => {
		await page.setContent('<kol-abbr _label="for example">e.g.</kol-abbr>');
		const kolAbbr = page.locator('kol-abbr');
		const tooltip = kolAbbr.locator('kol-tooltip-wc kol-span-wc');
		await expect(tooltip).not.toBeVisible();
		await kolAbbr.hover();
		await expect(tooltip).toBeVisible();
		await expect(tooltip).toContainText('for example');
	});
});
