import { expect, test } from '@playwright/test';

test.describe('date-in-form', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/#/scenarios/date-in-form');
	});

	test('Enter on date icon', async ({ page }) => {
		const errorLogs: string[] = [];
		page.on("console", (msg) => {
			if (msg.type() === 'error') {
				errorLogs.push(msg.text());
			}
		});

		const kolInputDate = page.locator('.kol-input-date .kol-input');
		await expect(kolInputDate).toHaveCount(1);

		await kolInputDate.focus();
		await page.keyboard.press('Enter');
		await page.waitForTimeout(500);
		await expect(errorLogs).toHaveLength(2);

		await kolInputDate.focus();
		await page.keyboard.press('Tab');
		await page.keyboard.press('Tab');
		await page.keyboard.press('Tab');
		await page.keyboard.press('Enter');
		await page.waitForTimeout(500);
		await expect(errorLogs).toHaveLength(1);

	});
});
