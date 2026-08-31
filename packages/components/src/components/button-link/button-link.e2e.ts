import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-button-link', () => {
	test('it renders label', async ({ page }) => {
		await page.setContent('<kol-button-link _label="Test ButtonLink Element" _variant="primary"></kol-button-link>');
		const kolButton = page.locator('kol-button-link');
		await expect(kolButton).toContainText('Test ButtonLink Element');
	});

	/*
	 * The block modifiers sit on the BEM root, which the skeleton renders as the wrapper around the
	 * interactive element — `<div class="kol-button kol-button--inline"><button class="kol-button__button">`.
	 * Assertions on modifiers therefore address `.kol-button`, not the inner `<button>`.
	 */
	test('it supports inline rendering via _inline', async ({ page }) => {
		await page.setContent('<kol-button-link _label="Inline ButtonLink" _inline></kol-button-link>');
		const kolButtonLink = page.locator('kol-button-link');
		const buttonRoot = kolButtonLink.locator('.kol-button');
		await expect(buttonRoot).toHaveClass(/kol-button--inline/);
	});

	test('it maps legacy _variant to inline handling', async ({ page }) => {
		await page.setContent('<kol-button-link _label="Legacy Variant" _variant="standalone" _inline="false"></kol-button-link>');
		const kolButtonLink = page.locator('kol-button-link');
		const buttonRoot = kolButtonLink.locator('.kol-button');
		await expect(buttonRoot).toHaveClass(/kol-button--standalone/);
	});

	test.describe('Callbacks', () => {
		['onClick', 'onMouseDown'].forEach((callbackName) => {
			test(`should call ${callbackName} callback when internal button emits`, async ({ page }) => {
				await page.setContent('<kol-button-link _label="Button"></kol-button-link>');
				const kolButton = page.locator('kol-button-link');

				const callbackPromise = kolButton.evaluate((element: HTMLKolButtonElement, callbackName) => {
					return new Promise<void>((resolve) => {
						element._on = {
							[callbackName]: () => {
								resolve();
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
			test(`should emit ${event} when internal button emits ${event}`, async ({ page }) => {
				await page.setContent('<kol-button-link _label="Button"></kol-button-link>');
				const eventPromise = page.locator('kol-button-link').evaluate(async (element, event) => {
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
});
