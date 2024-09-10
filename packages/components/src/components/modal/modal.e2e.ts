import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-modal', () => {
	test.describe('attributes', () => {
		test(`it renders the attributes 'width' and 'aria-label'`, async ({ page }) => {
			await page.setContent('<kol-modal _label="Modal Test Element" _width="77%"></kol-modal>');
			const kolModal = page.locator('kol-modal');
			await kolModal.evaluate((element) => (element as HTMLKolModalElement).openModal());

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
			await kolModal.evaluate((element) => (element as HTMLKolModalElement).openModal());
			await expect(dialog).toBeVisible();
			await kolModal.evaluate((element) => (element as HTMLKolModalElement).closeModal());
			await expect(dialog).toBeHidden();
		});
	});

	test.describe('legacy attribute API', () => {
		test('it opens and closes the dialog', async ({ page }) => {
			await page.setContent('<kol-modal _label="">Modal content</kol-modal>');
			const kolModal = page.locator('kol-modal');
			const dialog = page.locator('dialog');

			await expect(dialog).toBeHidden();
			await kolModal.evaluate((element) => {
				(element as HTMLKolModalElement)._activeElement = document.createElement('button');
			});
			await expect(dialog).toBeVisible();
			await kolModal.evaluate((element) => {
				(element as HTMLKolModalElement)._activeElement = null;
			});
			await expect(dialog).toBeHidden();
		});
	});

	test.describe('events', () => {
		test('it calls the onClose callback when the closeModal-method has been called', async ({ page }) => {
			await page.setContent('<kol-modal _label="">Modal content</kol-modal>');
			const kolModal = page.locator('kol-modal');

			const closeEventPromise = kolModal.evaluate((element) => {
				return new Promise<void>((resolve) => {
					(element as HTMLKolModalElement)._on = {
						onClose: () => {
							resolve();
						},
					};
				});
			});

			await kolModal.evaluate(async (element) => {
				await (element as HTMLKolModalElement).openModal();
				await (element as HTMLKolModalElement).closeModal();
			});

			await expect(closeEventPromise).resolves.toBe(undefined);
		});

		test('it calls the onClose callback when the dialog closes natively', async ({ page }) => {
			await page.setContent('<kol-modal _label="">Modal content</kol-modal>');
			const kolModal = page.locator('kol-modal');

			const closeEventPromise = kolModal.evaluate((element) => {
				return new Promise<void>((resolve) => {
					(element as HTMLKolModalElement)._on = {
						onClose: () => {
							resolve();
						},
					};
				});
			});

			await kolModal.evaluate(async (element) => (element as HTMLKolModalElement).openModal());
			await page.keyboard.press('Escape');

			await expect(closeEventPromise).resolves.toBe(undefined);
		});
	});
});
