import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { KolEvent } from '../../utils/events';

test.describe('kol-alert', () => {
	test.describe('Callbacks', () => {
		test('should call "onClose" callback when the close button is clicked', async ({ page }) => {
			await page.setContent('<kol-alert _label="Alert" _has-closer />');
			const callbackPromise = page.locator('kol-alert').evaluate(async (element: HTMLKolAlertElement) => {
				return new Promise((resolve) => {
					element._on = {
						onClose: (_event: Event, value?: unknown) => {
							resolve(value);
						},
					};
				});
			});
			await page.waitForChanges();
			await page.getByTestId('alert-close-button').click();
			await expect(callbackPromise).resolves.toBeUndefined();
		});
	});

	test.describe('DOM events', () => {
		test('should emit "close" when close button is clicked', async ({ page }) => {
			await page.setContent('<kol-alert _label="Alert" _has-closer />');
			const eventPromise = page.locator('kol-alert').evaluate(async (element: HTMLKolAlertElement, KolEvent) => {
				return new Promise((resolve) => {
					element.addEventListener(KolEvent.close, resolve);
				});
			}, KolEvent);
			await page.waitForChanges();
			await page.getByTestId('alert-close-button').click();
			await expect(eventPromise).resolves.toBeTruthy();
		});
	});
});
