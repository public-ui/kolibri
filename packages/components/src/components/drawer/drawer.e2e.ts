import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

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

		test(`should call 'onToggle' callback when drawer is opened`, async ({ page }) => {
			await page.setContent('<kol-drawer _label="Details">Drawer content</kol-drawer>');
			const kolDrawer = page.locator('kol-drawer');

			const callbackPromise = kolDrawer.evaluate((element: HTMLKolDrawerElement) => {
				return new Promise((resolve) => {
					element._on = {
						onToggle: (value?: boolean) => {
							resolve(value);
						},
					};
				});
			});
			await page.waitForChanges();
			await kolDrawer.evaluate((element: HTMLKolDrawerElement) => {
				element._open = true;
			});
			await expect(callbackPromise).resolves.toBe(true);
		});

		test(`should call 'onToggle' callback when drawer is closed`, async ({ page }) => {
			await page.setContent('<kol-drawer _label="Details" _open>Drawer content</kol-drawer>');
			const kolDrawer = page.locator('kol-drawer');

			const callbackPromise = kolDrawer.evaluate((element: HTMLKolDrawerElement) => {
				return new Promise((resolve) => {
					element._on = {
						onToggle: (value?: boolean) => {
							resolve(value);
						},
					};
				});
			});
			await page.waitForChanges();

			await page.keyboard.press('Escape');
			await expect(callbackPromise).resolves.toBe(false);
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

	test.describe('scroll lock', () => {
		const getDocumentOverflow = (page: Page) => page.evaluate(() => getComputedStyle(document.documentElement).overflow);

		test('it locks the background scroll while open and unlocks it after closing', async ({ page }) => {
			await page.setContent('<div style="height: 200vh;"><kol-drawer _label="Details" _open>Drawer content</kol-drawer></div>');
			await page.waitForChanges();
			await expect.poll(() => getDocumentOverflow(page)).toBe('hidden');

			await page.keyboard.press('Escape');
			// The scroll lock is released after the slide-out animation, when the native dialog closes.
			await expect.poll(() => getDocumentOverflow(page)).toBe('visible');
		});

		test('it does not lock the background scroll when opened non-modally', async ({ page }) => {
			await page.setContent(
				'<div style="height: 200vh;"><kol-drawer _label="Details"><div data-testid="drawer-content">Drawer content</div></kol-drawer></div>',
			);
			const kolDrawer = page.locator('kol-drawer');

			await kolDrawer.evaluate((element: HTMLKolDrawerElement) => element.show());
			await expect(page.getByTestId('drawer-content')).toBeVisible();
			expect(await getDocumentOverflow(page)).toBe('visible');
		});
	});

	test.describe('DOM events', () => {
		test(`should emit 'close' when drawer is closed`, async ({ page }) => {
			await page.setContent('<kol-drawer _label="Details" >Drawer content</kol-drawer>');
			const kolDrawer = page.locator('kol-drawer');

			const eventPromise = kolDrawer.evaluate((element: HTMLKolDrawerElement) => {
				element._open = true; // see #7165
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
