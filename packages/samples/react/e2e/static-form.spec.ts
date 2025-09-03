import { expect, test } from '@playwright/test';

test.describe('static-form', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('#/scenarios/static-form?hideMenus');
	});

	test('Submit form with checkbox checked (via Enter)', async ({ page }) => {
		await page.getByLabel('Checkbox').check();
		await page.getByLabel('Checkbox').press('Enter');
		expect(await page.locator('pre').innerText()).toContain('"checkbox": "true"');
	});

	test('Submit form with radio (Option A) checked (via Enter)', async ({ page }) => {
		await page.getByLabel('Option A').check();
		await page.getByLabel('Option A').press('Enter');
		expect(await page.locator('pre').innerText()).toContain('"radio": "A"');
	});
});
