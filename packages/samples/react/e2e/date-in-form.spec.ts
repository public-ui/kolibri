import { expect, test } from '@playwright/test';

test.describe('date-in-form', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/#/scenarios/date-in-form');
	});

	test('Enter on date icon', async ({ page }) => {
		const errorLogs: string[] = [];
		page.on('console', (msg) => {
			if (msg.type() === 'error') {
				errorLogs.push(msg.text());
			}
		});

		const kolInputDate = page.locator('.kol-input-date');
		await expect(kolInputDate).toHaveCount(1);

		await kolInputDate.click();
		await page.keyboard.press('Enter');
		await page.waitForTimeout(500);
		await expect(errorLogs).toHaveLength(1);

		await kolInputDate.click();
		await page.keyboard.press('Tab');
		await page.keyboard.press('Tab');
		await page.keyboard.press('Tab');
		await page.keyboard.press('Enter');
		await page.waitForTimeout(500);
		await expect(errorLogs).toHaveLength(1);
	});
});
