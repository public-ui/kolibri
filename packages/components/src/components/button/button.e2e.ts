import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { EXPERIMENTAL_MODE_HEAD, insertAfterStartup, readFormData, registerWithReflectInputValues } from '../../e2e/input-behavior-contract';
import { setContentWithRetry } from '../../e2e/utils/setContentWithRetry';

test.describe('kol-button', () => {
	test('it renders label', async ({ page }) => {
		await page.setContent('<kol-button _label="Test Button Element" _variant="primary"></kol-button>');
		const kolButton = page.locator('kol-button');
		await expect(kolButton).toContainText('Test Button Element');
	});

	test.describe('Callbacks', () => {
		['onClick', 'onMouseDown'].forEach((callbackName) => {
			test(`should call ${callbackName} callback when internal button emits`, async ({ page }) => {
				await page.setContent('<kol-button _label="Button"></kol-button>');
				const kolButton = page.locator('kol-button');

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
				await page.setContent('<kol-button _label="Button"></kol-button>');
				const eventPromise = page.locator('kol-button').evaluate(async (element, event) => {
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

	/*
	 * Pins the form participation of the button through `FormAssociationBehavior`.
	 * The button creates no hidden form element, because its name is unknown when the behavior is constructed (#11036).
	 */
	test.describe('Form association', () => {
		const button = '<kol-button _label="Button" _name="action" _value="button-value"></kol-button>';

		test('creates no hidden form element with reflectInputValues', async ({ page }) => {
			await setContentWithRetry(page, '<form></form>');
			await registerWithReflectInputValues(page);
			await insertAfterStartup(page, button, 'form');
			await page.locator('kol-button button').click();
			await page.waitForChanges();

			await expect(page.locator('kol-button > [data-form-associated]')).toHaveCount(0);
			expect(await readFormData(page)).toEqual([]);
		});

		test('creates no hidden form element with reflectInputValues in experimental mode', async ({ page }) => {
			await setContentWithRetry(page, `${EXPERIMENTAL_MODE_HEAD}<body><form></form></body>`);
			await registerWithReflectInputValues(page);
			await insertAfterStartup(page, button, 'form');
			await page.locator('kol-button button').click();
			await page.waitForChanges();

			await expect(page.locator('kol-button > [data-form-associated]')).toHaveCount(0);
			expect(await readFormData(page)).toEqual([]);
		});

		test('synchronizes _value into _syncValueBySelector in experimental mode', async ({ page }) => {
			await setContentWithRetry(page, `${EXPERIMENTAL_MODE_HEAD}<body><input id="target" /></body>`);
			await insertAfterStartup(page, '<kol-button _label="Button" _value="button-value" _sync-value-by-selector="#target"></kol-button>');

			await expect(page.locator('#target')).toHaveValue('button-value');

			await page.locator('#target').fill('');
			await page.locator('kol-button button').click();
			await page.waitForChanges();

			await expect(page.locator('#target')).toHaveValue('button-value');
		});

		test('ignores _syncValueBySelector outside experimental mode', async ({ page }) => {
			await setContentWithRetry(page, '<input id="target" />');
			await insertAfterStartup(page, '<kol-button _label="Button" _value="button-value" _sync-value-by-selector="#target"></kol-button>');
			await page.locator('kol-button button').click();
			await page.waitForChanges();

			await expect(page.locator('#target')).toHaveValue('');
		});
	});

	test.describe('click() method', () => {
		test('should activate button when click() method is called', async ({ page }) => {
			await page.setContent('<kol-button _label="Click me"></kol-button>');
			const kolButton = page.locator('kol-button');

			const callbackPromise = kolButton.evaluate((element: HTMLKolButtonElement) => {
				return new Promise<number>((resolve) => {
					let clickCount = 0;
					const buttonElement = element as HTMLKolButtonElement & { _on?: { onClick?: () => void } };
					buttonElement._on = {
						onClick: () => {
							clickCount++;
							resolve(clickCount);
						},
					};
				});
			});
			await page.waitForChanges();

			await kolButton.evaluate(async (el: HTMLKolButtonElement) => await el.click());
			await expect(callbackPromise).resolves.toBe(1);
		});

		test('should not double-execute when host is clicked directly', async ({ page }) => {
			await page.setContent('<kol-button _label="Click me"></kol-button>');
			const kolButton = page.locator('kol-button');

			await kolButton.evaluate((element: HTMLKolButtonElement) => {
				(window as unknown as Record<string, number>).clickCount = 0;
				const buttonElement = element as HTMLKolButtonElement & { _on?: { onClick?: () => void } };
				buttonElement._on = {
					onClick: () => {
						(window as unknown as Record<string, number>).clickCount++;
					},
				};
			});
			await page.waitForChanges();

			await kolButton.click();
			const finalCount = await page.evaluate(() => (window as unknown as Record<string, number>).clickCount);
			expect(finalCount).toBe(1);
		});
	});

	test.skip('should hide tooltip after click until button is left and focused again', async ({ page }) => {
		await page.setContent('<kol-button _label="Tooltip Button" _hide-label="true"></kol-button>');
		const button = page.locator('button');
		const tooltip = page.locator('.kol-button__tooltip .kol-tooltip__floating');
		const tooltipStateTimeout = 3000;

		await button.focus();
		await expect
			.poll(
				async () => {
					return await tooltip.evaluate((el) => el.classList.contains('show'));
				},
				{ timeout: tooltipStateTimeout },
			)
			.toBe(true);

		await button.click();
		await expect
			.poll(
				async () => {
					return await tooltip.evaluate((el) => el.classList.contains('hide'));
				},
				{ timeout: tooltipStateTimeout },
			)
			.toBe(true);

		await page.locator('body').focus();
		await button.focus();
		await expect
			.poll(
				async () => {
					return await tooltip.evaluate((el) => el.classList.contains('show'));
				},
				{ timeout: tooltipStateTimeout },
			)
			.toBe(true);
	});
});
