import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

const dialogTags = ['kol-dialog', 'kol-modal'] as const;

dialogTags.forEach((tag) => {
	test.describe(tag, () => {
		test.describe('attributes', () => {
			test(`it renders the attributes 'width' and 'aria-label'`, async ({ page }) => {
				await page.setContent(`<${tag} _label="Modal Test Element" _width="77%"></${tag}>`);
				const dialogElement = page.locator(tag);
				await dialogElement.evaluate((element) => (element as HTMLKolDialogElement).openModal());

				const dialog = page.locator('dialog');
				await expect(dialog).toHaveAttribute('style', 'width: 77%;');
				await expect(dialog).toHaveAttribute('aria-label', 'Modal Test Element');
			});
		});

		test.describe('methods API', () => {
			test('it opens and closes the dialog', async ({ page }) => {
				await page.setContent(`<${tag} _label="">Modal content</${tag}>`);
				const dialogElement = page.locator(tag);
				const dialog = page.locator('dialog');

				await expect(dialog).toBeHidden();
				await dialogElement.evaluate((element) => (element as HTMLKolDialogElement).openModal());
				await expect(dialog).toBeVisible();
				await dialogElement.evaluate((element) => (element as HTMLKolDialogElement).closeModal());
				await expect(dialog).toBeHidden();
			});
		});

		test.describe('events', () => {
			test('it calls the onClose callback when the closeModal-method has been called', async ({ page }) => {
				await page.setContent(`<${tag} _label="">Modal content</${tag}>`);
				const dialogElement = page.locator(tag);

				const callbackPromise = dialogElement.evaluate((element) => {
					const dialog = element as HTMLKolDialogElement;
					return new Promise<void>((resolve) => {
						dialog._on = {
							onClose: () => {
								resolve();
							},
						};
					});
				});

				await dialogElement.evaluate(async (element) => {
					const dialog = element as HTMLKolDialogElement;
					await dialog.openModal();
					await dialog.closeModal();
				});

				await expect(callbackPromise).resolves.toBeUndefined();
			});

			test('it calls the onClose callback when the dialog closes natively', async ({ page }) => {
				await page.setContent(`<${tag} _label="">Modal content</${tag}>`);
				const dialogElement = page.locator(tag);

				const callbackPromise = dialogElement.evaluate((element) => {
					const dialog = element as HTMLKolDialogElement;
					return new Promise<void>((resolve) => {
						dialog._on = {
							onClose: () => {
								resolve();
							},
						};
					});
				});

				await dialogElement.evaluate(async (element) => (element as HTMLKolDialogElement).openModal());
				await page.keyboard.press('Escape');

				await expect(callbackPromise).resolves.toBeUndefined();
			});
		});

		test.describe('DOM events', () => {
			test('it should emit close when the closeModal-method has been called', async ({ page }) => {
				await page.setContent(`<${tag} _label="">Modal content</${tag}>`);
				const dialogElement = page.locator(tag);

				const eventPromise = dialogElement.evaluate((element) => {
					const dialog = element as HTMLKolDialogElement;
					return new Promise<void>((resolve) => {
						dialog.addEventListener('close', () => {
							resolve();
						});
					});
				});

				await dialogElement.evaluate(async (element) => {
					const dialog = element as HTMLKolDialogElement;
					await dialog.openModal();
					await dialog.closeModal();
				});

				await expect(eventPromise).resolves.toBeUndefined();
			});

			test('it should emit close when the dialog closes natively', async ({ page }) => {
				await page.setContent(`<${tag} _label="">Modal content</${tag}>`);
				const dialogElement = page.locator(tag);

				const eventPromise = dialogElement.evaluate((element) => {
					const dialog = element as HTMLKolDialogElement;
					return new Promise<void>((resolve) => {
						dialog.addEventListener('close', () => {
							resolve();
						});
					});
				});

				await dialogElement.evaluate(async (element) => {
					const dialog = element as HTMLKolDialogElement;
					await dialog.openModal();
				});
				await page.keyboard.press('Escape');

				await expect(eventPromise).resolves.toBeUndefined();
			});
		});

		test.describe(`${tag} - variant`, () => {
			test('it renders the close button in card variant', async ({ page }) => {
				await page.setContent(`<${tag} _variant="card" _label="">Modal content</${tag}>`);
				const dialogElement = page.locator(tag);
				const dialog = page.locator('dialog');
				await expect(dialog).toBeHidden();
				await dialogElement.evaluate((element) => (element as HTMLKolDialogElement).openModal());
				await expect(dialog).toBeVisible();
				const closeButton = page.getByTestId('card-close-button').locator('button');
				await expect(closeButton).toBeVisible();
				await closeButton.evaluate((button) => (button as HTMLButtonElement).click());
				await expect(dialog).toBeHidden();
			});
			test('it does not render the close button in blank variant', async ({ page }) => {
				await page.setContent(`<${tag} _variant="blank" _label="">Modal content</${tag}>`);
				const dialogElement = page.locator(tag);
				const dialog = page.locator('dialog');
				await dialogElement.evaluate((element) => (element as HTMLKolDialogElement).openModal());
				await expect(dialog).toBeVisible();
				await expect(page.getByTestId('card-close-button')).toHaveCount(0);
				await dialogElement.evaluate((element) => (element as HTMLKolDialogElement).closeModal());
				await expect(dialog).toBeHidden();
			});
		});
	});
});
