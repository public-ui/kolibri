import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-details', () => {
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

			await page.locator('button').click();
			await expect(callbackPromise).resolves.toBeUndefined();
		});
	});

	test.describe('DOM events', () => {
		test(`should emit 'toggle' when title is clicked`, async ({ page }) => {
			await page.setContent('<kol-details _label="Details" _has-closer />');
			const kolDetails = page.locator('kol-details');

			const eventPromise = kolDetails.evaluate(async (element: HTMLKolDetailsElement) => {
				return new Promise((resolve) => {
					element.addEventListener('toggle', resolve);
				});
			});
			await page.waitForChanges();

			await page.locator('button').click();
			await expect(eventPromise).resolves.toBeTruthy();
		});
	});

	test.describe('Aria attributes', () => {
		test('should have proper aria attributes', async ({ page }) => {
			await page.setContent('<kol-details _label="Details">Expandable content</kol-details>');
			const button = page.getByRole('button');
			const content = page.locator('.collapsible__content');

			await expect(button).toHaveAttribute('aria-expanded', 'false');
			await expect(button).toHaveAttribute('aria-controls', /-control-/);
			await expect(content).toHaveAttribute('role', 'region');
			await expect(content).toHaveAttribute('aria-labelledby', /-heading-/);
			await expect(content).toHaveAttribute('aria-hidden', 'true');

			await button.click();

			await expect(button).toHaveAttribute('aria-expanded', 'true');
			await expect(content).not.toHaveAttribute('aria-hidden');
		});
	});

	test.describe('click() method', () => {
		test('should open details when click() method is called', async ({ page }) => {
			await page.setContent('<kol-details _label="Details">Expandable content</kol-details>');
			const kolDetails = page.locator('kol-details');

			// Initially details should be closed
			const isClosedBefore = await kolDetails.evaluate((element: HTMLKolDetailsElement) => {
				const detailsElement = element as HTMLElement & { _open?: boolean };
				return !detailsElement._open;
			});
			expect(isClosedBefore).toBe(true);

			await kolDetails.evaluate(async (element: HTMLKolDetailsElement) => await element.click());
			await page.waitForChanges();

			// After click, details should be open
			const isOpenAfter = await kolDetails.evaluate((element: HTMLKolDetailsElement) => {
				const detailsElement = element as HTMLElement & { _open?: boolean };
				return detailsElement._open;
			});
			expect(isOpenAfter).toBe(true);
		});

		test('should toggle details when click() method is called multiple times', async ({ page }) => {
			await page.setContent('<kol-details _label="Details">Expandable content</kol-details>');
			const kolDetails = page.locator('kol-details');

			// Open details
			await kolDetails.evaluate(async (element: HTMLKolDetailsElement) => await element.click());
			await page.waitForChanges();

			const isOpen = await kolDetails.evaluate((element: HTMLElement) => {
				const detailsElement = element as HTMLElement & { _open?: boolean };
				return detailsElement._open;
			});
			expect(isOpen).toBe(true);

			// Close details
			await page.waitForChanges();
			await kolDetails.evaluate(async (element: HTMLKolDetailsElement) => await element.click());
			await page.waitForChanges();

			const isClosed = await kolDetails.evaluate((element: HTMLElement) => {
				const detailsElement = element as HTMLElement & { _open?: boolean };
				return detailsElement._open;
			});
			expect(isClosed).toBe(false);
		});
	});
});
