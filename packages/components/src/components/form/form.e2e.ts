import { expect, type Locator, type Page } from '@playwright/test';
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

	test.describe('Button submit and reset', () => {
		/** Resolves with the order in which the `_on` callback and the DOM event arrive on the kol-form host. */
		const watchCallbackAndDomEvent = async (kolForm: Locator, callbackName: 'onSubmit' | 'onReset', eventName: 'submit' | 'reset'): Promise<string[]> =>
			kolForm.evaluate(
				(element: HTMLKolFormElement, { callbackName, eventName }: { callbackName: string; eventName: string }) =>
					new Promise<string[]>((resolve) => {
						const order: string[] = [];
						element._on = {
							[callbackName]: () => {
								order.push('callback');
							},
						};
						element.addEventListener(eventName, () => {
							order.push('dom-event');
							resolve(order);
						});
					}),
				{ callbackName, eventName },
			);

		for (const [type, callbackName, eventName] of [
			['submit', 'onSubmit', 'submit'],
			['reset', 'onReset', 'reset'],
		] as const) {
			test(`should run callback and emit the ${eventName} event on the host when a kol-button of type ${type} inside the form is clicked`, async ({ page }) => {
				await page.setContent(`<kol-form><kol-button _label="Button" _type="${type}"></kol-button></kol-form>`);
				const kolForm = page.locator('kol-form');

				const orderPromise = watchCallbackAndDomEvent(kolForm, callbackName, eventName);
				await kolForm.locator('kol-button button').click();

				await expect(orderPromise).resolves.toEqual(['callback', 'dom-event']);
			});
		}
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

		test('should focus the inner input of a KoliBri form field an error entry points at', async ({ page }) => {
			await page.setContent(`
				<kol-form>
					<kol-input-color id="color-field" _label="Farbe"></kol-input-color>
				</kol-form>
			`);
			const kolForm = page.locator('kol-form');
			await kolForm.evaluate((element: HTMLKolFormElement) => {
				element._errorList = [{ message: 'Die Farbe ist ein Pflichtfeld.', selector: '#color-field' }];
			});
			await page.waitForChanges();

			await kolForm.locator('.kol-form__link a').first().click();

			await expect(page.locator('#color-field input.kol-input')).toBeFocused();
		});
	});
});
