import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-popover', () => {
	test('should display popover when _show is true and hide when _show is false', async ({ page }) => {
		await page.setContent(`<kol-popover _align="top">Popover content</kol-popover>`);
		const popoverComponent = page.locator('kol-popover');
		const popoverElement = popoverComponent.locator('.kol-popover__content');

		await expect(popoverElement).not.toBeVisible();
		await popoverComponent.evaluate(() => {
			const popover = document.querySelector('kol-popover');
			if (popover) {
				popover._show = true;
			}
		});
		await expect(popoverElement).toBeVisible();

		await page.evaluate(() => {
			const popover = document.querySelector('kol-popover');
			if (popover) popover._show = false;
		});
		await expect(popoverElement).not.toBeVisible();
	});

	test.describe('Callbacks', () => {
		test('it calls the onClose callback when popover is closed', async ({ page }) => {
			await page.setContent(`<kol-popover _show>Popover content</kol-popover>`);

			const callbackPromise = page.locator('kol-popover').evaluate((element: HTMLElement & { _on?: object }) => {
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
		test('it emits close when popover is closed', async ({ page }) => {
			await page.setContent(`<kol-popover _show>Popover content</kol-popover>`);

			const eventPromise = page.locator('kol-popover').evaluate((element: HTMLElement) => {
				return new Promise<void>((resolve) => {
					element.addEventListener('close', () => {
						resolve();
					});
				});
			});
			await page.waitForChanges();
			await page.keyboard.press('Escape');

			await expect(eventPromise).resolves.toBeUndefined();
		});
	});
});
