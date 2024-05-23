import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

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
	await page.waitForChanges();
	await select.selectOption({ label: 'Herr' });
	expect(await inputEventPromise).toBe(true);
});
