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

	test.describe('Keyboard Navigation (WCAG 2.1 AA)', () => {
		test(`should dispatch click event when Enter is pressed on link`, async ({ page }) => {
			await page.setContent('<kol-link _href="#target" _label="Link"></kol-link>');
			const link = page.locator('a');

			const eventPromise = page.locator('kol-link').evaluate(async (element: HTMLKolLinkElement) => {
				return new Promise<string | undefined>((resolve) => {
					element.addEventListener('click', (event: Event) => {
						const customEvent = event as CustomEvent;
						resolve(customEvent.detail);
					});
				});
			});
			await page.waitForChanges();

			await link.focus();
			await link.press('Enter');

			await expect(eventPromise).resolves.toBe('#target');
		});

		test.skip(`should dispatch click event when Space is pressed on link with role="button"`, async ({ page }) => {
			// TODO: Space-key handling for role="button" not yet implemented in LinkFC
			// This requires adding a keydown handler that triggers click when space is pressed
			// and role="button" is set. Currently, only Enter works natively on <a> elements.
			await page.setContent('<kol-link _href="#target" _label="Link" _role="button"></kol-link>');
			const link = page.locator('a');

			const eventPromise = link.evaluate(async (el) => {
				return new Promise<boolean>((resolve) => {
					const listener = () => {
						el.removeEventListener('click', listener);
						resolve(true);
					};
					el.addEventListener('click', listener);

					// Set a timeout to fail the promise if no click occurs
					setTimeout(() => {
						el.removeEventListener('click', listener);
						resolve(false);
					}, 500);
				});
			});
			await page.waitForChanges();

			// Focus and press Space
			await link.focus();
			await link.press('Space');

			const wasClicked = await eventPromise;
			expect(wasClicked).toBe(true);
		});

		test(`should not dispatch click event when Space is pressed on default role="link"`, async ({ page }) => {
			await page.setContent('<kol-link _href="#target" _label="Link"></kol-link>');
			const link = page.locator('a');

			let clickEventDispatched = false;
			await page.locator('kol-link').evaluate((element: HTMLKolLinkElement) => {
				element.addEventListener('click', () => {
					window.sessionStorage.setItem('kol-link-space-event', 'true');
				});
			});
			await page.waitForChanges();

			await link.focus();
			await link.press('Space');

			clickEventDispatched = await page.evaluate(() => window.sessionStorage.getItem('kol-link-space-event') === 'true');
			expect(clickEventDispatched).toBe(false);
		});

		test(`should respect tabIndex property for default tabbability`, async ({ page }) => {
			await page.setContent('<kol-link _href="#" _label="Link"></kol-link>');
			const link = page.locator('a');

			// Links are tabbable by default (no explicit tabindex attribute)
			const tabIndexValue = await link.evaluate((el) => el.tabIndex);
			// tabIndex defaults to 0 for links
			expect(tabIndexValue).toBeGreaterThanOrEqual(0);
		});

		test(`should set tabIndex=-1 when _disabled=true`, async ({ page }) => {
			await page.setContent('<kol-link _href="#" _label="Link" _disabled="true"></kol-link>');
			const link = page.locator('a');

			const tabIndexValue = await link.evaluate((el) => el.tabIndex);
			expect(tabIndexValue).toBe(-1);
		});

		test(`should not respond to keyboard when disabled`, async ({ page }) => {
			await page.setContent('<kol-link _href="#target" _label="Link" _disabled="true"></kol-link>');
			const link = page.locator('a');

			const ariaDisabled = await link.getAttribute('aria-disabled');
			expect(ariaDisabled).toBe('true');

			// Verify tabIndex is -1 when disabled
			const tabIndex = await link.evaluate((el) => el.tabIndex);
			expect(tabIndex).toBe(-1);

			// Verify callback is not called
			await page.locator('kol-link').evaluate((element: HTMLKolLinkElement) => {
				window.sessionStorage.setItem('kol-link-disabled-event', '0');
				element._on = {
					onClick: () => {
						window.sessionStorage.setItem('kol-link-disabled-event', '1');
					},
				};
			});
			await page.waitForChanges();

			// Dispatch click directly to simulate interaction attempt
			await link.dispatchEvent('click');

			const wasClicked = await page.evaluate(() => window.sessionStorage.getItem('kol-link-disabled-event'));
			expect(wasClicked).toBe('0');
		});

		test(`should handle empty href gracefully`, async ({ page }) => {
			await page.setContent('<kol-link _label="Link"></kol-link>');
			const link = page.locator('a');

			const href = await link.getAttribute('href');
			expect(href).toBe('javascript:void(0);');

			// Verify click still works and dispatches event
			const eventPromise = page.locator('kol-link').evaluate(async (element: HTMLKolLinkElement) => {
				return new Promise<boolean>((resolve) => {
					element.addEventListener('click', () => {
						resolve(true);
					});
				});
			});
			await page.waitForChanges();

			await link.click();
			await expect(eventPromise).resolves.toBe(true);
		});

		test(`should dispatch click with correct href detail`, async ({ page }) => {
			await page.setContent('<kol-link _href="https://example.com/path" _label="Link"></kol-link>');
			const link = page.locator('a');

			const detailPromise = page.locator('kol-link').evaluate(async (element: HTMLKolLinkElement) => {
				return new Promise<string | undefined>((resolve) => {
					element.addEventListener('click', (event: Event) => {
						const customEvent = event as CustomEvent;
						resolve(customEvent.detail);
					});
				});
			});
			await page.waitForChanges();

			await link.focus();
			await link.press('Enter');

			await expect(detailPromise).resolves.toBe('https://example.com/path');
		});
	});
});
