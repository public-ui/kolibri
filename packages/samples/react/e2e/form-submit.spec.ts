import { expect, test } from '@playwright/test';

test.describe('form-submit', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('#/scenarios/form-submit?hideMenus');
	});

	test('Submit form with checkbox checked and with submit button (via Enter)', async ({ page }) => {
		await page.getByLabel('Checkbox1').check();
		await page.getByLabel('Checkbox1').press('Enter');
		expect(await page.locator('pre').innerText()).toContain('"Form with Submit-Button"');
	});

	test('Submit form with radio checked and with submit button (via Enter)', async ({ page }) => {
		await page.getByLabel('Radio1').check();
		await page.getByLabel('Radio1').press('Enter');
		expect(await page.locator('pre').innerText()).toContain('"Form with Submit-Button"');
	});

	test('Submit form with checkbox checked and without submit button (via Enter)', async ({ page }) => {
		await page.getByLabel('Checkbox2').check();
		await page.getByLabel('Checkbox2').press('Enter');
		expect(await page.locator('pre').innerText()).toContain('"Form without Submit-Button"');
	});

	test('Submit form with radio checked and without submit button (via Enter)', async ({ page }) => {
		await page.getByLabel('Radio2').check();
		await page.getByLabel('Radio2').press('Enter');
		expect(await page.locator('pre').innerText()).toContain('"Form without Submit-Button"');
	});
});