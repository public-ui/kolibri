import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-card', () => {
	test.describe('Callbacks', () => {
		test('should call "onClose" callback when the close button is clicked', async ({ page }) => {
			await page.setContent('<kol-card _label="Card" _has-closer />');
			const callbackPromise = page.locator('kol-card').evaluate(async (element: HTMLKolCardElement) => {
				return new Promise((resolve) => {
					element._on = {
						onClose: (_event: Event, value?: unknown) => {
							resolve(value);
						},
					};
				});
			});
			await page.waitForChanges();
			await page.getByTestId('card-close-button').click();
			await expect(callbackPromise).resolves.toBeUndefined();
		});
	});

	test.describe('DOM events', () => {
		test('should emit "close" when close button is clicked', async ({ page }) => {
			await page.setContent('<kol-card _label="Card" _has-closer />');
			const eventPromise = page.locator('kol-card').evaluate(async (element: HTMLKolCardElement) => {
				return new Promise((resolve) => {
					element.addEventListener('close', resolve);
				});
			});
			await page.waitForChanges();
			await page.getByTestId('card-close-button').click();
			await expect(eventPromise).resolves.toBeTruthy();
		});
	});
});
