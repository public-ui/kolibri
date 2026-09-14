import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-details', () => {
	test.describe('Callbacks', () => {
		test(`should call 'onClick' callback when title is clicked`, async ({ page }) => {
			await page.setContent('<kol-details _label="Details" />');
			const kolDetails = page.locator('kol-details');

			const callbackPromise = kolDetails.evaluate((element: HTMLKolDetailsElement) => {
				return new Promise((resolve) => {
					element._on = {
						onClick: (_event: MouseEvent, value?: boolean) => {
							resolve(value);
						},
					};
				});
			});
			await page.waitForChanges();

			await page.locator('summary').click();
			await expect(callbackPromise).resolves.toBe(true);
		});

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

			await page.locator('summary').click();
			await expect(callbackPromise).resolves.toBeUndefined();
		});
	});

	test.describe('DOM events', () => {
		test(`should emit 'click' when title is clicked`, async ({ page }) => {
			await page.setContent('<kol-details _label="Details" />');
			const kolDetails = page.locator('kol-details');

			const eventPromise = kolDetails.evaluate(async (element: HTMLKolDetailsElement) => {
				return new Promise((resolve) => {
					/**
					 * The native button click bubbles through the host as a `click` event of its own and
					 * arrives first, so the listener waits for the component's synthetic CustomEvent —
					 * the one carrying the new open state as its boolean detail.
					 */
					element.addEventListener('click', (event: Event) => {
						const detail: unknown = (event as CustomEvent<unknown>).detail;
						if (typeof detail === 'boolean') {
							resolve(detail);
						}
					});
				});
			});
			await page.waitForChanges();

			await page.locator('summary').click();
			await expect(eventPromise).resolves.toBe(true);
		});

		test(`should emit 'toggle' when title is clicked`, async ({ page }) => {
			await page.setContent('<kol-details _label="Details" _has-closer />');
			const kolDetails = page.locator('kol-details');

			const eventPromise = kolDetails.evaluate(async (element: HTMLKolDetailsElement) => {
				return new Promise((resolve) => {
					element.addEventListener('toggle', resolve);
				});
			});
			await page.waitForChanges();

			await page.locator('summary').click();
			await expect(eventPromise).resolves.toBeTruthy();
		});
	});

	test.describe('Aria attributes', () => {
		test('should have proper aria attributes', async ({ page }) => {
			await page.setContent('<kol-details _label="Details">Expandable content</kol-details>');
			const summary = page.locator('summary');
			const details = page.locator('details');
			const content = page.locator('.collapsible__content');

			/* The expanded state is the native `open` attribute on `<details>` — no hand-maintained
			   aria-expanded to keep in sync. */
			await expect(details).not.toHaveAttribute('open');
			await expect(summary).toHaveAttribute('aria-controls', /-control-/);
			await expect(content).toHaveAttribute('role', 'region');
			await expect(content).toHaveAttribute('aria-labelledby', /-heading-/);
			await expect(content).toHaveAttribute('aria-hidden', 'true');

			await summary.click();

			await expect(details).toHaveAttribute('open', '');
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
