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

	test.describe('Focus and blur callbacks', () => {
		test('should call onFocus and onBlur callbacks', async ({ page }) => {
			await page.setContent('<kol-button _label="Button"></kol-button>');
			const kolButton = page.locator('kol-button');

			const callbackPromise = kolButton.evaluate((element: HTMLKolButtonElement) => {
				return new Promise<string[]>((resolve) => {
					const seen: string[] = [];
					element._on = {
						onFocus: () => {
							seen.push('focus');
						},
						onBlur: () => {
							seen.push('blur');
							resolve(seen);
						},
					};
				});
			});
			await page.waitForChanges();

			await page.locator('button').focus();
			await page.locator('button').blur();
			await expect(callbackPromise).resolves.toEqual(['focus', 'blur']);
		});
	});

	test('should not call onClick callback or emit click when disabled', async ({ page }) => {
		await page.setContent('<kol-button _label="Button" _disabled="true" _value="my-value"></kol-button>');
		const kolButton = page.locator('kol-button');

		await kolButton.evaluate((element: HTMLKolButtonElement) => {
			window.sessionStorage.setItem('kol-button-callback-count', '0');
			window.sessionStorage.setItem('kol-button-event-count', '0');
			element._on = {
				onClick: () => {
					window.sessionStorage.setItem('kol-button-callback-count', '1');
				},
			};
			element.addEventListener('click', (event) => {
				if (event instanceof CustomEvent) {
					window.sessionStorage.setItem('kol-button-event-count', '1');
				}
			});
		});
		await page.waitForChanges();

		await page.locator('button').dispatchEvent('click');

		await expect
			.poll(async () => {
				return await page.evaluate(() => ({
					callbackCount: window.sessionStorage.getItem('kol-button-callback-count'),
					eventCount: window.sessionStorage.getItem('kol-button-event-count'),
				}));
			})
			.toEqual({ callbackCount: '0', eventCount: '0' });
	});

	test('should emit click CustomEvent with _value as detail', async ({ page }) => {
		await page.setContent('<kol-button _label="Button" _value="my-value"></kol-button>');
		const detailPromise = page.locator('kol-button').evaluate((element: HTMLKolButtonElement) => {
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

	test('should render the tooltip as sibling of the button when _hide-label is set', async ({ page }) => {
		await page.setContent('<kol-button _label="Tooltip Button" _hide-label="true"></kol-button>');
		const tooltip = page.locator('.kol-button > .kol-button__tooltip .kol-tooltip__floating');
		await expect(tooltip).toBeAttached();
		await expect(page.locator('.kol-button > .kol-button__button + .kol-button__tooltip')).toBeAttached();

		await page.locator('button').focus();
		await expect.poll(async () => await tooltip.evaluate((el) => el.classList.contains('show')), { timeout: 3000 }).toBe(true);
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
