import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-form', () => {
	test.describe('Callbacks', () => {
		const EVENTS: [string, string, unknown?][] = [
			['submit', 'onSubmit'],
			['reset', 'onReset'],
		];
		EVENTS.forEach(([eventName, callbackName]) => {
			test(`should call ${callbackName} callback when internal form emits`, async ({ page }) => {
				await page.setContent('<kol-form />');
				const kolForm = page.locator('kol-form');

				const callbackPromise = kolForm.evaluate((element: HTMLKolFormElement, callbackName) => {
					return new Promise<void>((resolve) => {
						element._on = {
							[callbackName]: () => {
								resolve();
							},
						};
					});
				}, callbackName);
				await page.waitForChanges();

				await page.locator('form').dispatchEvent(eventName);
				await expect(callbackPromise).resolves.toBeUndefined();
			});
		});
	});

	test.describe('DOM events', () => {
		const EVENTS: [string, string][] = [
			['submit', 'submit'],
			['reset', 'reset'],
		];
		EVENTS.forEach(([nativeEvent, eventName]) => {
			test(`should emit ${eventName} when internal form emits ${nativeEvent}`, async ({ page }) => {
				await page.setContent('<kol-form />');
				const eventPromise = page.locator('kol-form').evaluate(async (element: HTMLKolFormElement, eventName: string) => {
					return new Promise<void>((resolve) => {
						element.addEventListener(eventName, () => {
							resolve();
						});
					});
				}, eventName);
				await page.waitForChanges();
				await page.locator('form').dispatchEvent(nativeEvent);
				await expect(eventPromise).resolves.toBeUndefined();
			});
		});
	});
});
