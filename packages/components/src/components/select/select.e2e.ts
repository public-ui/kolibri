import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-select', () => {
	test('it should call input callback on change', async ({ page }) => {
		const options = JSON.stringify([
			{ label: 'North', value: 'N' },
			{ label: 'South', value: 'S' },
			{ label: 'West', value: 'W' },
			{ label: 'East', value: 'E' },
		]);
		await page.setContent(`<kol-select _label="Sample Select" _options='${options}'></kol-select>`);
		const kolSelect = page.locator('kol-select');
		const select = page.locator('select');

		const inputEventPromise = kolSelect.evaluate((element) => {
			return new Promise<string[]>((resolve) => {
				(element as HTMLKolSelectElement)._on = {
					onInput: (_event, value: unknown) => {
						resolve(value as string[]);
					},
				};
			});
		});
		await page.waitForChanges();
		await select.selectOption({ label: 'East' });
		expect(await inputEventPromise).toEqual(['E']);
	});
});
