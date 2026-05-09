import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-link', () => {
	test.describe('Callbacks', () => {
		test(`should call onClick callback when internal anchor emits click`, async ({ page }) => {
			await page.setContent('<kol-link _label="Link"></kol-link>');
			const kolLink = page.locator('kol-link');

			const callbackPromise = kolLink.evaluate((element: HTMLKolLinkElement) => {
				return new Promise<void>((resolve) => {
					element._on = {
						onClick: () => {
							resolve();
						},
					};
				});
			});
			await page.waitForChanges();

			await page.locator('a').dispatchEvent('click');
			await expect(callbackPromise).resolves.toBeUndefined();
		});
	});

	test.describe('DOM events', () => {
		test(`should emit click when internal anchor emits click`, async ({ page }) => {
			await page.setContent('<kol-link _label="Link"></kol-link>');
			const eventPromise = page.locator('kol-link').evaluate(async (element: HTMLKolLinkElement) => {
				return new Promise<void>((resolve) => {
					element.addEventListener('click', () => {
						resolve();
					});
				});
			});
			await page.waitForChanges();
			await page.locator('a').dispatchEvent('click');

			await expect(eventPromise).resolves.toBeUndefined();
		});
	});

	test(`should not call onClick callback or emit click when disabled`, async ({ page }) => {
		await page.setContent('<kol-link _href="#target" _label="Link" _disabled="true"></kol-link>');
		const kolLink = page.locator('kol-link');

		await kolLink.evaluate((element: HTMLKolLinkElement) => {
			window.sessionStorage.setItem('kol-link-callback-count', '0');
			window.sessionStorage.setItem('kol-link-event-count', '0');
			element._on = {
				onClick: () => {
					window.sessionStorage.setItem('kol-link-callback-count', '1');
				},
			};
			element.addEventListener('click', (event) => {
				if (event instanceof CustomEvent && event.detail === '#target') {
					window.sessionStorage.setItem('kol-link-event-count', '1');
				}
			});
		});
		await page.waitForChanges();

		await page.locator('a').dispatchEvent('click');

		await expect
			.poll(async () => {
				return await page.evaluate(() => ({
					callbackCount: window.sessionStorage.getItem('kol-link-callback-count'),
					eventCount: window.sessionStorage.getItem('kol-link-event-count'),
				}));
			})
			.toEqual({ callbackCount: '0', eventCount: '0' });
	});

	test.skip('should hide tooltip after click until link is left and focused again', async ({ page }) => {
		await page.setContent('<kol-link _href="#target" _label="Tooltip Link" _hide-label="true"></kol-link>');
		const link = page.locator('a');
		const tooltip = page.locator('.kol-link__tooltip .kol-tooltip__floating');
		const tooltipStateTimeout = 3000;

		await link.focus();
		await expect
			.poll(
				async () => {
					return await tooltip.evaluate((el) => el.classList.contains('show'));
				},
				{ timeout: tooltipStateTimeout },
			)
			.toBe(true);

		await link.click();
		await expect
			.poll(
				async () => {
					return await tooltip.evaluate((el) => el.classList.contains('hide'));
				},
				{ timeout: tooltipStateTimeout },
			)
			.toBe(true);

		await page.locator('body').focus();
		await link.focus();
		await expect
			.poll(
				async () => {
					return await tooltip.evaluate((el) => el.classList.contains('show'));
				},
				{ timeout: tooltipStateTimeout },
			)
			.toBe(true);
	});
});
