import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-details', () => {
	test.describe('Callbacks', () => {
		test(`should call 'onToggle' callback when title is clicked`, async ({ page }) => {
			await page.setContent('<kol-details _label="Details" _has-closer />');
			const kolDetails = page.locator('kol-details');

			const callbackPromise = kolDetails.evaluate((element: HTMLKolDetailsElement) => {
				return new Promise<void>((resolve) => {
					element._on = {
						onToggle: () => {
							resolve();
						},
					};
				});
			});
			await page.waitForChanges();

			await page.locator('button').click();
			await expect(callbackPromise).resolves.toBeUndefined();
		});
	});

	test.describe('DOM events', () => {
		test(`should emit 'toggle' when title is clicked`, async ({ page }) => {
			await page.setContent('<kol-details _label="Details" _has-closer />');
			const kolDetails = page.locator('kol-details');

			const eventPromise = kolDetails.evaluate(async (element: HTMLKolDetailsElement) => {
				return new Promise((resolve) => {
					element.addEventListener('toggle', resolve);
				});
			});
			await page.waitForChanges();

			await page.locator('button').click();
			await expect(eventPromise).resolves.toBeTruthy();
		});
	});
});
