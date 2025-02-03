import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { KolEvent } from '../../utils/events';

test.describe('kol-drawer', () => {
	test.describe('Callbacks', () => {
		test(`should call 'onClose' callback when drawer is closed`, async ({ page }) => {
			await page.setContent('<kol-drawer _label="Details" _open>Drawer content</kol-drawer>');
			const kolDrawer = page.locator('kol-drawer');

			const callbackPromise = kolDrawer.evaluate((element: HTMLKolDrawerElement) => {
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

	test.describe('_open property', () => {
		test(`should open initially when _open property is true`, async ({ page }) => {
			await page.setContent('<kol-drawer _label="Details" _open><div data-testid="drawer-content">Drawer content</div></kol-drawer>');
			await expect(page.getByTestId('drawer-content')).toBeVisible();
		});

		test(`should open when _open property becomes true`, async ({ page }) => {
			await page.setContent('<kol-drawer _label="Details"><div data-testid="drawer-content">Drawer content</div></kol-drawer>');
			const kolDrawer = page.locator('kol-drawer');
			await kolDrawer.evaluate((element: HTMLKolDrawerElement) => {
				element._open = true;
			});
			await expect(page.getByTestId('drawer-content')).toBeVisible();
		});

		test(`should close when _open property becomes false`, async ({ page }) => {
			await page.setContent('<kol-drawer _label="Details" _open><div data-testid="drawer-content">Drawer content</div></kol-drawer>');
			const kolDrawer = page.locator('kol-drawer');
			await kolDrawer.evaluate((element: HTMLKolDrawerElement) => {
				element._open = false;
			});
			await expect(page.getByTestId('drawer-content')).not.toBeVisible();
		});
	});

	test.describe('DOM events', () => {
		test(`should emit 'close' when drawer is closed`, async ({ page }) => {
			await page.setContent('<kol-drawer _label="Details" >Drawer content</kol-drawer>');
			const kolDrawer = page.locator('kol-drawer');

			const eventPromise = kolDrawer.evaluate((element: HTMLKolDrawerElement, KolEvent) => {
				element._open = true; // see #7165
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
