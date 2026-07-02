import type { Page } from '@playwright/test';
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

		test.describe('scroll lock', () => {
			const getDocumentOverflow = (page: Page) => page.evaluate(() => getComputedStyle(document.documentElement).overflow);

			test('it locks the background scroll while open and unlocks it after closing', async ({ page }) => {
				await page.setContent(`<div style="height: 200vh;"><${tag} _label="">Modal content</${tag}></div>`);
				const dialogElement = page.locator(tag);

				await dialogElement.evaluate((element) => (element as HTMLKolDialogElement).openModal());
				await expect.poll(() => getDocumentOverflow(page)).toBe('hidden');

				await dialogElement.evaluate((element) => (element as HTMLKolDialogElement).closeModal());
				await expect.poll(() => getDocumentOverflow(page)).toBe('visible');
			});

			test('it unlocks the background scroll when the dialog closes natively', async ({ page }) => {
				await page.setContent(`<div style="height: 200vh;"><${tag} _label="">Modal content</${tag}></div>`);
				const dialogElement = page.locator(tag);

				await dialogElement.evaluate((element) => (element as HTMLKolDialogElement).openModal());
				await expect.poll(() => getDocumentOverflow(page)).toBe('hidden');

				await page.keyboard.press('Escape');
				await expect.poll(() => getDocumentOverflow(page)).toBe('visible');
			});

			test('it does not lock the background scroll when opened non-modally', async ({ page }) => {
				await page.setContent(`<div style="height: 200vh;"><${tag} _label="">Modal content</${tag}></div>`);
				const dialogElement = page.locator(tag);

				await dialogElement.evaluate((element) => (element as HTMLKolDialogElement).show());
				await expect(page.locator('dialog')).toBeVisible();
				expect(await getDocumentOverflow(page)).toBe('visible');
			});

			test('it keeps the lock until the last of two stacked dialogs closes', async ({ page }) => {
				await page.setContent(
					`<div style="height: 200vh;"><${tag} id="outer" _label="">Outer content</${tag}><${tag} id="inner" _label="">Inner content</${tag}></div>`,
				);
				const outer = page.locator('#outer');
				const inner = page.locator('#inner');

				await outer.evaluate((element) => (element as HTMLKolDialogElement).openModal());
				await inner.evaluate((element) => (element as HTMLKolDialogElement).openModal());
				await expect.poll(() => getDocumentOverflow(page)).toBe('hidden');

				await inner.evaluate((element) => (element as HTMLKolDialogElement).closeModal());
				await expect(page.locator('#inner dialog')).toBeHidden();
				expect(await getDocumentOverflow(page)).toBe('hidden');

				await outer.evaluate((element) => (element as HTMLKolDialogElement).closeModal());
				await expect.poll(() => getDocumentOverflow(page)).toBe('visible');
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
