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

		['kol-link', 'kol-link-wc'].forEach((tag) => {
			test(`should pass the internal anchor as event.target to the onClick callback (${tag})`, async ({ page }) => {
				await page.setContent(`<${tag} _label="Link"></${tag}>`);
				const kolLink = page.locator(tag);

				const targetIsAnchorPromise = kolLink.evaluate((element: HTMLKolLinkElement) => {
					return new Promise<boolean>((resolve) => {
						element._on = {
							onClick: (event: Event, _value: string) => {
								resolve(event.target instanceof HTMLAnchorElement && event.target.classList.contains('kol-link__interactive-element'));
							},
						};
					});
				});
				await page.waitForChanges();

				// Dispatch directly on the anchor to verify that setEventTarget pins the target
				await page.locator(`${tag} a`).dispatchEvent('click');

				await expect(targetIsAnchorPromise).resolves.toBe(true);
			});
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

	test.describe('when the link is disabled', () => {
		test.beforeEach(async ({ page }) => {
			await page.setContent('<kol-link _label="Link" _href="#target" _disabled></kol-link>');
		});

		test('should not take focus when clicked', async ({ page }) => {
			await page.locator('kol-link a').click({ force: true });

			await expect
				.poll(() => page.locator('kol-link').evaluate((element: HTMLKolLinkElement) => element.shadowRoot?.activeElement?.localName ?? null))
				.toBeNull();
		});

		test('should not take focus when the focus() method is called', async ({ page }) => {
			const kolLink = page.locator('kol-link');

			await kolLink.evaluate(async (element: HTMLKolLinkElement) => await element.focus());
			await page.waitForChanges();

			await expect.poll(() => kolLink.evaluate((element: HTMLKolLinkElement) => element.shadowRoot?.activeElement?.localName ?? null)).toBeNull();
		});
	});

	test.describe('tab order', () => {
		test('should skip a disabled link', async ({ page }) => {
			await page.setContent(
				'<button id="before">before</button><kol-link _label="Link" _href="#target" _disabled></kol-link><button id="after">after</button>',
			);
			await page.locator('#before').focus();

			await page.keyboard.press('Tab');

			await expect(page.locator('#after')).toBeFocused();
		});

		test('should include an enabled link', async ({ page }) => {
			await page.setContent('<button id="before">before</button><kol-link _label="Link" _href="#target"></kol-link>');
			await page.locator('#before').focus();

			await page.keyboard.press('Tab');

			await expect(page.locator('kol-link a')).toBeFocused();
		});
	});
});
