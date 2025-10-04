import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { KolEvent } from '../../utils/events';

test.describe('kol-details', () => {
	test.describe('when details is enabled', () => {
		test.beforeEach(async ({ page }) => {
			await page.setContent('<kol-details _label="Details">Details content</kol-details>');
		});

		test('should show the details content after the title has been clicked', async ({ page }) => {
			await expect(page.locator('.collapsible__content')).toHaveAttribute('aria-hidden', 'true');
			await page.getByRole('button', { name: 'Details' }).click();
			await expect(page.locator('.collapsible__content')).not.toHaveAttribute('aria-hidden', 'true');
		});

		test('should hide the details content after the title has been clicked again', async ({ page }) => {
			await page.getByRole('button', { name: 'Details' }).click();
			await expect(page.locator('.collapsible__content')).not.toHaveAttribute('aria-hidden', 'true');
			await page.getByRole('button', { name: 'Details' }).click();
			await expect(page.locator('.collapsible__content')).toHaveAttribute('aria-hidden', 'true');
		});
	});

	test.describe('when details is disabled', () => {
		test.beforeEach(async ({ page }) => {
			await page.setContent('<kol-details _label="Details" _disabled>Details content</kol-details>');
		});

		test('should not show the details content after the title has been clicked', async ({ page }) => {
			await page.getByRole('button', { name: 'Details' }).click({ force: true });
			await expect(page.locator('.collapsible__content')).toHaveAttribute('aria-hidden', 'true');
		});
	});

	test.describe('Callbacks', () => {
		test(`should call 'onToggle' callback when title is clicked`, async ({ page }) => {
			await page.setContent('<kol-details _label="Details" _has-closer />');
			const kolDetails = page.locator('kol-details');

			const callbackPromise = kolDetails.evaluate((element: HTMLKolDetailsElement) => {
				return new Promise<void>((resolve) => {
					element._on = {
						onToggle: () => {
							resolve();
						},
					};
				});
			});
			await page.waitForChanges();

			await page.getByRole('button', { name: 'Details' }).click();
			await expect(callbackPromise).resolves.toBeUndefined();
		});
	});

	test.describe('DOM events', () => {
		test(`should emit 'toggle' when title is clicked`, async ({ page }) => {
			await page.setContent('<kol-details _label="Details" _has-closer />');
			const eventPromise = page.evaluate((eventName: KolEvent) => {
				return new Promise<boolean>((resolve) => {
					const detailsElement = document.querySelector('kol-details');

					if (!detailsElement) {
						resolve(false);

						return;
					}

					const handleEvent = () => {
						detailsElement.removeEventListener(eventName, handleEvent);
						resolve(true);
					};

					detailsElement.addEventListener(eventName, handleEvent);
				});
			}, KolEvent.toggle);
			await page.waitForChanges();

			await page.getByRole('button', { name: 'Details' }).click();
			await expect(eventPromise).resolves.toBeTruthy();
		});
	});
});
