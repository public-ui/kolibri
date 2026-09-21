import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-badge', () => {
	test.describe('Callbacks', () => {
		['onClick', 'onMouseDown'].forEach((callbackName) => {
			test(`should call ${callbackName} callback when smart button emits`, async ({ page }) => {
				await page.setContent(`<kol-badge _label="Badge with Button"></kol-badge>`);
				const kolBadge = page.locator('kol-badge');

				const callbackPromise = kolBadge.evaluate((element: HTMLKolBadgeElement, callbackName) => {
					return new Promise<void>((resolve) => {
						element._smartButton = {
							_label: `Smart Button`,
							_on: {
								[callbackName]: () => {
									resolve();
								},
							},
						};
					});
				}, callbackName);
				await page.waitForChanges();

				await page.locator('button').click();
				await expect(callbackPromise).resolves.toBeUndefined();
			});
		});
	});

	test.describe('DOM events', () => {
		['click', 'mousedown'].forEach((event) => {
			test(`should emit ${event} when smart button emits ${event}`, async ({ page }) => {
				const BADGE_PROPS = { _label: `Smart Button` };
				await page.setContent(`<kol-badge _label="Badge with Button" _smart-button='${JSON.stringify(BADGE_PROPS)}'></kol-badge>`);
				const eventPromise = page.locator('kol-badge').evaluate(async (element, event) => {
					return new Promise((resolve) => {
						element.addEventListener(event, resolve);
					});
				}, event);
				await page.waitForChanges();
				await page.locator('button').dispatchEvent(event);
				await expect(eventPromise).resolves.toBeTruthy();
			});
		});
	});

	test('should focus the smart button when focus is called', async ({ page }) => {
		const BADGE_PROPS = { _label: `Smart Button` };
		await page.setContent(`<kol-badge _label="Badge with Button" _smart-button='${JSON.stringify(BADGE_PROPS)}'></kol-badge>`);
		await page.waitForChanges();

		const result = await page.locator('kol-badge').evaluate(async (badge: HTMLKolBadgeElement) => {
			// Call focus and check what gets focused
			await badge.focus();

			// Wait for focus to be applied
			await new Promise((resolve) => setTimeout(resolve, 10));

			// Check the focused element in the badge's shadow DOM
			const shadowActiveElement = badge.shadowRoot?.activeElement;

			return {
				shadowActiveElementTag: shadowActiveElement?.tagName,
			};
		});

		// The native button should be focused in the badge's shadow DOM
		expect(result.shadowActiveElementTag).toBe('BUTTON');
	});

	test.describe('Read-mode wrapping', () => {
		test('excludes the wrapping line break from text selection', async ({ page }) => {
			await page.setContent(`<kol-badge _label="Label"></kol-badge>`);
			await page.waitForChanges();

			const userSelect = await page.locator('kol-badge').evaluate((badge: HTMLKolBadgeElement) => {
				const lineBreak = badge.shadowRoot?.querySelector('.kol-badge > br');
				return lineBreak ? getComputedStyle(lineBreak).userSelect : null;
			});

			expect(userSelect).toBe('none');
		});

		// Chromium only — playwright.config.ts enables no other project. Only the real clipboard reflects
		// how the <br /> is serialized: DOM ranges do not descend into shadow roots, and clipboardData is
		// write-only during the copy event.
		test('does not add a blank line when a sentence containing a badge is copied', async ({ page }) => {
			await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
			await page.setContent(`<p id="sentence">Alpha <kol-badge _label="Label"></kol-badge> Omega</p>`);
			await page.waitForChanges();

			const sentence = (await page.locator('#sentence').boundingBox())!;
			await page.mouse.move(sentence.x + 1, sentence.y + 5);
			await page.mouse.down();
			await page.mouse.move(sentence.x + sentence.width - 1, sentence.y + sentence.height - 5, { steps: 5 });
			await page.mouse.up();
			await page.evaluate(() => document.execCommand('copy'));

			const copied = await page.evaluate(() => navigator.clipboard.readText());

			expect(copied).toBe('Alpha\nLabel\nOmega');
		});
	});
});
