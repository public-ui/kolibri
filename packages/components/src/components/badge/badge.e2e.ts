import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { KolEvent } from '../../utils/events';

test.describe('kol-badge', () => {
	test.describe('Callbacks', () => {
		['onClick', 'onMouseDown'].forEach((callbackName) => {
			test(`should call ${callbackName} callback when smart button emits`, async ({ page }) => {
				await page.setContent(`<kol-badge _label="Badge with Button"></kol-badge>`);
				const kolBadge = page.locator('kol-badge');

				const callbackPromise = kolBadge.evaluate((element: HTMLKolBadgeElement, callbackName) => {
					return new Promise<void>((resolve) => {
						element._smartButton = {
							_label: `Smart Button`,
							_on: {
								[callbackName]: () => {
									resolve();
								},
							},
						};
					});
				}, callbackName);
				await page.waitForChanges();

				await page.locator('button').click();
				await expect(callbackPromise).resolves.toBeUndefined();
			});
		});
	});

	test.describe('DOM events', () => {
		[KolEvent.click, KolEvent.mousedown].forEach((event) => {
			test(`should emit ${event} when smart button emits ${event}`, async ({ page }) => {
				const BADGE_PROPS = { _label: `Smart Button` };
				await page.setContent(`<kol-badge _label="Badge with Button" _smart-button='${JSON.stringify(BADGE_PROPS)}'></kol-badge>`);
				const eventPromise = page.locator('kol-badge').evaluate(async (element, event) => {
					return new Promise((resolve) => {
						element.addEventListener(event, resolve);
					});
				}, event);
				await page.waitForChanges();
				await page.locator('button').dispatchEvent(event);
				await expect(eventPromise).resolves.toBeTruthy();
			});
		});
	});
});
