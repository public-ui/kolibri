import { test, expect } from '@playwright/test';

test('select', async ({ page }) => {
	await page.goto('/#/select/basic');
	const kolSelect = await page.locator('kol-select', { hasText: 'Anrede a' }).first();
	const select = await page.getByLabel('Anrede a');

	const inputEventPromise = kolSelect.evaluate((element) => {
		return new Promise<boolean>((resolve) => {
			element._on = {
				onInput: () => {
					resolve(true);
				},
			};
		});
	});
	await page.evaluate(() => new Promise((resolve) => setTimeout(resolve)));
	await select.selectOption({ label: 'Herr' });
	expect(await inputEventPromise).toBe(true);
});
