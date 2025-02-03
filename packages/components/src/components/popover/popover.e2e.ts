import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { KolEvent } from '../../utils/events';

test.describe('kol-popover', () => {
	test('should display popover when _show is true and hide when _show is false', async ({ page }) => {
		await page.setContent(`<kol-popover-wc _align="top">Popover content</kol-popover-wc>`);
		const popoverComponent = page.locator('kol-popover-wc');
		const popoverElement = popoverComponent.locator('.kol-popover__content');

		await expect(popoverElement).not.toBeVisible();
		await popoverComponent.evaluate(() => {
			const popover = document.querySelector('kol-popover-wc');

			if (popover) {
				popover._show = true;
			}
		});
		await expect(popoverElement).toBeVisible();

		await page.evaluate(() => {
			const popover = document.querySelector('kol-popover-wc');
			if (popover) popover._show = false;
		});
		await expect(popoverElement).not.toBeVisible();
	});

	test.describe('Callbacks', () => {
		test(`it calls the onClose callback when popover is closed`, async ({ page }) => {
			await page.setContent(`<kol-popover-wc _show>Popover content</kol-popover-wc>`);

			const callbackPromise = page.locator('kol-popover-wc').evaluate((element: HTMLKolPopoverWcElement) => {
				return new Promise<void>((resolve) => {
					element._on = {
						onClose: () => {
							resolve();
						},
					};
				});
			});
			await page.waitForChanges();
			await page.keyboard.press('Escape');

			await expect(callbackPromise).resolves.toBeUndefined();
		});
	});

	test.describe('DOM events', () => {
		test(`it emits close when popover is closed`, async ({ page }) => {
			await page.setContent(`<kol-popover-wc _show>Popover content</kol-popover-wc>`);

			const eventPromise = page.locator('kol-popover-wc').evaluate((element: HTMLKolPopoverWcElement, KolEvent) => {
				return new Promise<void>((resolve) => {
					element.addEventListener(KolEvent.close, () => {
						resolve();
					});
				});
			}, KolEvent);
			await page.waitForChanges();
			await page.keyboard.press('Escape');

			await expect(eventPromise).resolves.toBeUndefined();
		});
	});
});
