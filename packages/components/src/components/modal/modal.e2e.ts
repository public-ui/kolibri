import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { KolEvent } from '../../utils/events';

test.describe('kol-modal', () => {
	test.describe('attributes', () => {
		test(`it renders the attributes 'width' and 'aria-label'`, async ({ page }) => {
			await page.setContent('<kol-modal _label="Modal Test Element" _width="77%"></kol-modal>');
			const kolModal = page.locator('kol-modal');
			await kolModal.evaluate((element: HTMLKolModalElement) => element.openModal());

			const dialog = page.locator('dialog');
			await expect(dialog).toHaveAttribute('style', 'width: 77%;');
			await expect(dialog).toHaveAttribute('aria-label', 'Modal Test Element');
		});
	});

	test.describe('methods API', () => {
		test('it opens and closes the dialog', async ({ page }) => {
			await page.setContent('<kol-modal _label="">Modal content</kol-modal>');
			const kolModal = page.locator('kol-modal');
			const dialog = page.locator('dialog');

			await expect(dialog).toBeHidden();
			await kolModal.evaluate((element: HTMLKolModalElement) => element.openModal());
			await expect(dialog).toBeVisible();
			await kolModal.evaluate((element: HTMLKolModalElement) => element.closeModal());
			await expect(dialog).toBeHidden();
		});
	});

	test.describe('events', () => {
		test('it calls the onClose callback when the closeModal-method has been called', async ({ page }) => {
			await page.setContent('<kol-modal _label="">Modal content</kol-modal>');
			const kolModal = page.locator('kol-modal');

			const callbackPromise = kolModal.evaluate((element: HTMLKolModalElement) => {
				return new Promise<void>((resolve) => {
					element._on = {
						onClose: () => {
							resolve();
						},
					};
				});
			});

			await kolModal.evaluate(async (element: HTMLKolModalElement) => {
				await element.openModal();
				await element.closeModal();
			});

			await expect(callbackPromise).resolves.toBeUndefined();
		});

		test('it calls the onClose callback when the dialog closes natively', async ({ page }) => {
			await page.setContent('<kol-modal _label="">Modal content</kol-modal>');
			const kolModal = page.locator('kol-modal');

			const callbackPromise = kolModal.evaluate((element: HTMLKolModalElement) => {
				return new Promise<void>((resolve) => {
					element._on = {
						onClose: () => {
							resolve();
						},
					};
				});
			});

			await kolModal.evaluate(async (element: HTMLKolModalElement) => element.openModal());
			await page.keyboard.press('Escape');

			await expect(callbackPromise).resolves.toBeUndefined();
		});
	});

	test.describe('DOM events', () => {
		test('it should emit close when the closeModal-method has been called', async ({ page }) => {
			await page.setContent('<kol-modal _label="">Modal content</kol-modal>');
			const kolModal = page.locator('kol-modal');

			const eventPromise = kolModal.evaluate((element: HTMLKolModalElement, KolEvent) => {
				return new Promise<void>((resolve) => {
					element.addEventListener(KolEvent.close, () => {
						resolve();
					});
				});
			}, KolEvent);

			await kolModal.evaluate(async (element: HTMLKolModalElement) => {
				await element.openModal();
				await element.closeModal();
			});

			await expect(eventPromise).resolves.toBeUndefined();
		});

		test('it should emit close when the dialog closes natively', async ({ page }) => {
			await page.setContent('<kol-modal _label="">Modal content</kol-modal>');
			const kolModal = page.locator('kol-modal');

			const eventPromise = kolModal.evaluate((element: HTMLKolModalElement, KolEvent) => {
				return new Promise<void>((resolve) => {
					element.addEventListener(KolEvent.close, () => {
						resolve();
					});
				});
			}, KolEvent);

			await kolModal.evaluate(async (element: HTMLKolModalElement) => {
				await element.openModal();
			});
			await page.keyboard.press('Escape');

			await expect(eventPromise).resolves.toBeUndefined();
		});
	});

	test.describe('kol-modal - variant', () => {
		test('it renders the close button in card variant', async ({ page }) => {
			await page.setContent('<kol-modal _variant="card" _label="">Modal content</kol-modal>');
			const kolModal = page.locator('kol-modal');
			const dialog = page.locator('dialog');
			await expect(dialog).toBeHidden();
			await kolModal.evaluate((element: HTMLKolModalElement) => element.openModal());
			await expect(dialog).toBeVisible();
			const closeButton = page.locator('.kol-modal__close-button');
			await expect(closeButton).toBeVisible();
			await closeButton.click();
			await expect(dialog).toBeHidden();
		});

		test('it does not render the close button in blank variant', async ({ page }) => {
			await page.setContent('<kol-modal _variant="blank" _label="">Modal content</kol-modal>');
			const kolModal = page.locator('kol-modal');
			const dialog = page.locator('dialog');
			const closeButton = page.locator('.kol-modal__close-button');
			await kolModal.evaluate((element: HTMLKolModalElement) => element.openModal());
			await expect(dialog).toBeVisible();
			await expect(closeButton).toBeHidden();
		});
	});
});
