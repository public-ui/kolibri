import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-button-link', () => {
	test('it renders label', async ({ page }) => {
		await page.setContent('<kol-button-link _label="Test ButtonLink Element" _variant="primary"></kol-button-link>');
		const kolButton = page.locator('kol-button-link');
		await expect(kolButton).toContainText('Test ButtonLink Element');
	});

	test('it supports inline rendering via _inline', async ({ page }) => {
		await page.setContent('<kol-button-link _label="Inline ButtonLink" _inline></kol-button-link>');
		const kolButtonLink = page.locator('kol-button-link');
		const button = kolButtonLink.locator('button');
		await expect(button).toHaveClass(/kol-button--inline/);
	});

	test('it maps legacy _variant to inline handling', async ({ page }) => {
		await page.setContent('<kol-button-link _label="Legacy Variant" _variant="standalone" _inline="false"></kol-button-link>');
		const kolButtonLink = page.locator('kol-button-link');
		const button = kolButtonLink.locator('button');
		await expect(button).toHaveClass(/kol-button--standalone/);
	});

	test.describe('Callbacks', () => {
		['onClick', 'onMouseDown', 'onFocus', 'onBlur'].forEach((callbackName) => {
			test(`should call ${callbackName} callback when internal button emits`, async ({ page }) => {
				await page.setContent('<kol-button-link _label="Button"></kol-button-link>');
				const kolButton = page.locator('kol-button-link');

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

				const button = page.locator('button');
				if (callbackName === 'onBlur') {
					await button.focus();
					await button.blur();
				} else if (callbackName === 'onFocus') {
					await button.focus();
				} else {
					await button.click();
				}
				await expect(callbackPromise).resolves.toBeUndefined();
			});
		});
	});

	test('should not call onClick callback or emit click when disabled', async ({ page }) => {
		await page.setContent('<kol-button-link _label="Button" _disabled="true"></kol-button-link>');
		const kolButtonLink = page.locator('kol-button-link');

		await kolButtonLink.evaluate((element: HTMLKolButtonLinkElement) => {
			window.sessionStorage.setItem('kol-button-link-callback-count', '0');
			window.sessionStorage.setItem('kol-button-link-event-count', '0');
			element._on = {
				onClick: () => {
					window.sessionStorage.setItem('kol-button-link-callback-count', '1');
				},
			};
			element.addEventListener('click', (event) => {
				if (event instanceof CustomEvent) {
					window.sessionStorage.setItem('kol-button-link-event-count', '1');
				}
			});
		});
		await page.waitForChanges();

		await page.locator('button').dispatchEvent('click');

		await expect
			.poll(async () => {
				return await page.evaluate(() => ({
					callbackCount: window.sessionStorage.getItem('kol-button-link-callback-count'),
					eventCount: window.sessionStorage.getItem('kol-button-link-event-count'),
				}));
			})
			.toEqual({ callbackCount: '0', eventCount: '0' });
	});

	test('should emit click CustomEvent with _value as detail', async ({ page }) => {
		await page.setContent('<kol-button-link _label="Button" _value="my-value"></kol-button-link>');
		const detailPromise = page.locator('kol-button-link').evaluate((element: HTMLKolButtonLinkElement) => {
			return new Promise<unknown>((resolve) => {
				element.addEventListener('click', (event) => {
					if (event instanceof CustomEvent) {
						resolve(event.detail);
					}
				});
			});
		});
		await page.waitForChanges();

		await page.locator('button').click();
		await expect(detailPromise).resolves.toBe('my-value');
	});

	test('should submit the surrounding form with _type="submit"', async ({ page }) => {
		await page.setContent('<form><kol-button-link _label="Submit" _type="submit"></kol-button-link></form>');
		const submitPromise = page.locator('form').evaluate((form: HTMLFormElement) => {
			return new Promise<void>((resolve) => {
				form.addEventListener('submit', (event) => {
					event.preventDefault();
					resolve();
				});
			});
		});
		await page.waitForChanges();

		await page.locator('button').click();
		await expect(submitPromise).resolves.toBeUndefined();
	});

	test('should focus the internal button via focus() method', async ({ page }) => {
		await page.setContent('<kol-button-link _label="Focus me"></kol-button-link>');
		const kolButtonLink = page.locator('kol-button-link');
		await kolButtonLink.evaluate(async (element: HTMLKolButtonLinkElement) => await element.focus());
		await expect(page.locator('button')).toBeFocused();
	});

	test.describe('DOM events', () => {
		['click', 'mousedown'].forEach((event) => {
			test(`should emit ${event} when internal button emits ${event}`, async ({ page }) => {
				await page.setContent('<kol-button-link _label="Button"></kol-button-link>');
				const eventPromise = page.locator('kol-button-link').evaluate(async (element, event) => {
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
});
