import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { KolEvent } from '../../utils/events';

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
		const EVENTS: [string, KolEvent][] = [
			['submit', KolEvent.submit],
			['reset', KolEvent.reset],
		];
		EVENTS.forEach(([nativeEvent, kolEvent]) => {
			test(`should emit ${kolEvent} when internal form emits ${nativeEvent}`, async ({ page }) => {
				await page.setContent('<kol-form />');
				const eventPromise = page.locator('kol-form').evaluate(async (element: HTMLKolFormElement, kolEvent) => {
					return new Promise<void>((resolve) => {
						element.addEventListener(kolEvent, () => {
							resolve();
						});
					});
				}, kolEvent);
				await page.waitForChanges();
				await page.locator('form').dispatchEvent(nativeEvent);
				await expect(eventPromise).resolves.toBeUndefined();
			});
		});
	});
});
