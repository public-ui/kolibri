import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

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

	test.describe('click() method', () => {
		test('should activate button when click() method is called', async ({ page }) => {
			await page.setContent('<kol-button _label="Click me"></kol-button>');
			const kolButton = page.locator('kol-button');

			const callbackPromise = kolButton.evaluate((element) => {
				return new Promise<number>((resolve) => {
					let clickCount = 0;
					element._on = {
						onClick: () => {
							clickCount++;
							resolve(clickCount);
						},
					};
				});
			});
			await page.waitForChanges();

			await kolButton.evaluate((el) => el.click());
			await expect(callbackPromise).resolves.toBe(1);
		});

		test('should not double-execute when host is clicked directly', async ({ page }) => {
			await page.setContent('<kol-button _label="Click me"></kol-button>');
			const kolButton = page.locator('kol-button');

			const clickCountPromise = kolButton.evaluate((element) => {
				return new Promise<number>((resolve) => {
					let clickCount = 0;
					element._on = {
						onClick: () => {
							clickCount++;
						},
					};
					(window as any).clickCount = 0;
					element._on.onClick = () => {
						(window as any).clickCount++;
					};
					resolve(0);
				});
			});
			await page.waitForChanges();

			await kolButton.click();
			const finalCount = await page.evaluate(() => (window as any).clickCount);
			expect(finalCount).toBe(1);
		});
	});
});
