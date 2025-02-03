import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { KolEvent } from '../../utils/events';

test.describe('kol-link', () => {
	test.describe('Callbacks', () => {
		test(`should call onClick callback when internal anchor emits click`, async ({ page }) => {
			await page.setContent('<kol-link _label="Link"></kol-link>');
			const kolLink = page.locator('kol-link');

			const callbackPromise = kolLink.evaluate((element: HTMLKolLinkElement) => {
				return new Promise<void>((resolve) => {
					element._on = {
						onClick: () => {
							resolve();
						},
					};
				});
			});
			await page.waitForChanges();

			await page.locator('a').dispatchEvent('click');
			await expect(callbackPromise).resolves.toBeUndefined();
		});
	});

	test.describe('DOM events', () => {
		test(`should emit click when internal anchor emits click`, async ({ page }) => {
			await page.setContent('<kol-link _label="Link"></kol-link>');
			const eventPromise = page.locator('kol-link').evaluate(async (element: HTMLKolLinkElement, KolEvent) => {
				return new Promise<void>((resolve) => {
					element.addEventListener(KolEvent.click, () => {
						resolve();
					});
				});
			}, KolEvent);
			await page.waitForChanges();
			await page.locator('a').dispatchEvent('click');

			await expect(eventPromise).resolves.toBeUndefined();
		});
	});
});
