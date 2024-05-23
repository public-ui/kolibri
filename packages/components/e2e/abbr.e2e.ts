import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test('abbr', async ({ page }) => {
	await page.goto('/#/abbr/basic');
	const paragraph = await page.locator('p').filter({ hasText: 'Ich bin z.B.zum Beispiel eine Abkürzung.' });
	const tooltip = await paragraph.locator('kol-span-wc');
	await expect(tooltip).not.toBeVisible();
	await paragraph.getByLabel('zum Beispiel').hover();
	await expect(tooltip).toBeVisible();
	await expect(tooltip).toContainText('zum Beispiel');
});
