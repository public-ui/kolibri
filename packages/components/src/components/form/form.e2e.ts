import { expect, type Page } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-form', () => {
	const setUpForm = async (page: Page) => {
		await page.setContent('<kol-form />');
		return {
			form: page.locator('form'),
			kolForm: page.locator('kol-form'),
		};
	};

	test.describe('Callbacks', () => {
		const EVENTS: [string, string][] = [
			['submit', 'onSubmit'],
			['reset', 'onReset'],
		];
		EVENTS.forEach(([eventName, callbackName]) => {
			test(`should call ${callbackName} callback when internal form emits`, async ({ page }) => {
				const { form, kolForm } = await setUpForm(page);

				const callbackPromise = kolForm.evaluate((element: HTMLKolFormElement, callbackName) => {
					return new Promise<void>((resolve) => {
						element._on = {
							[callbackName]: () => {
								resolve();
							},
						};
					});
				}, callbackName);
				await page.waitForChanges();

				await form.dispatchEvent(eventName);
				await expect(callbackPromise).resolves.toBeUndefined();
			});
		});
	});

	test.describe('DOM events', () => {
		const EVENTS: [string, string][] = [
			['submit', 'submit'],
			['reset', 'reset'],
		];
		EVENTS.forEach(([nativeEvent, eventName]) => {
			test(`should emit ${eventName} when internal form emits ${nativeEvent}`, async ({ page }) => {
				const { form, kolForm } = await setUpForm(page);
				const eventPromise = kolForm.evaluate(async (element: HTMLElement, eventName: string) => {
					return new Promise<void>((resolve) => {
						element.addEventListener(eventName, () => {
							resolve();
						});
					});
				}, eventName);
				await page.waitForChanges();
				await form.dispatchEvent(nativeEvent);
				await expect(eventPromise).resolves.toBeUndefined();
			});
		});
	});

	test.describe('Error list', () => {
		test('should focus the form control an error entry points at', async ({ page }) => {
			await page.setContent(`
				<kol-form>
					<input id="first-field" />
					<input id="second-field" />
				</kol-form>
			`);
			const kolForm = page.locator('kol-form');
			await kolForm.evaluate((element: HTMLKolFormElement) => {
				element._errorList = [{ message: 'Das zweite Feld ist ein Pflichtfeld.', selector: '#second-field' }];
			});
			await page.waitForChanges();

			await kolForm.locator('.kol-form__link a').first().click();

			await expect(page.locator('#second-field')).toBeFocused();
		});
	});
});
