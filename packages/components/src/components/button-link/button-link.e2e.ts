import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { KolEvent } from '../../utils/events';

test.describe('kol-button-link', () => {
	test('it renders label', async ({ page }) => {
                await page.setContent('<kol-button-link _label="Test ButtonLink Element" _variant="primary"></kol-button-link>');
                const kolButton = page.locator('kol-button-link');
                await expect(kolButton).toContainText('Test ButtonLink Element');
	});

	test.describe('Callbacks', () => {
		['onClick', 'onMouseDown'].forEach((callbackName) => {
			test(`should call ${callbackName} callback when internal button emits`, async ({ page }) => {
				await page.setContent('<kol-button-link _label="Button"></kol-button-link>');
                                const kolButton = page.locator('kol-button-link');
                                const internalButton = kolButton.locator('kol-button-wc').locator('button');

				const callbackPromise = kolButton.evaluate((element: HTMLKolButtonElement, callbackName) => {
					return new Promise<void>((resolve) => {
						element._on = {
							[callbackName]: () => {
								resolve();
							},
						};
					});
				}, callbackName);
				await page.waitForChanges();

                                await internalButton.click();
				await expect(callbackPromise).resolves.toBeUndefined();
			});
		});
	});

	test.describe('DOM events', () => {
		const EVENTS: [string, KolEvent][] = [
			['click', KolEvent.click],
			['mousedown', KolEvent.mousedown],
		];
		EVENTS.forEach(([nativeEvent, kolEvent]) => {
			test(`should emit ${kolEvent} when internal button emits ${nativeEvent}`, async ({ page }) => {
				await page.setContent('<kol-button-link _label="Button"></kol-button-link>');
				const eventPromise = page.locator('kol-button-link').evaluate(async (element, event) => {
					return new Promise((resolve) => {
						element.addEventListener(event, resolve);
					});
				}, kolEvent);
				await page.waitForChanges();
                                const internalButton = page
                                        .locator('kol-button-link')
                                        .locator('kol-button-wc')
                                        .locator('button');
                                await internalButton.dispatchEvent(nativeEvent);
				await expect(eventPromise).resolves.toBeTruthy();
			});
		});
	});
});
