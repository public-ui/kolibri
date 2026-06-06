import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { testInputCharacterLimit, testInputValueReflection } from '../../e2e';
import { testInputMessage } from '../../e2e/input-msg';

const COMPONENT_NAME = 'kol-input-text';
const TEST_VALUE = 'Hello World';

test.describe('kol-input-text', () => {
	test.describe('smart-button', () => {
		test('should have smart-button', async ({ page }) => {
			const smartButton = JSON.stringify({
				_icons: 'codicon-info',
				_label: 'Smart-Button',
			});

			await page.setContent(`<kol-input-text _label="With Smart Button" _type="text" _smart-button='${smartButton}'></kol-input-text>`);
			const kolButton = page.locator('kol-button-wc');
			await expect(kolButton).toHaveCount(1);

			await kolButton.click();
		});
	});

	testInputValueReflection<HTMLKolInputTextElement>({
		componentName: COMPONENT_NAME,
		testValue: TEST_VALUE,
	});

	test.describe('Callbacks and Events', () => {
		test('should call onFocus callback when input receives focus', async ({ page }) => {
			await page.setContent(`<${COMPONENT_NAME} _label="Input"></${COMPONENT_NAME}>`);
			const component = page.locator(COMPONENT_NAME);
			const input = page.locator('input');

			let focusCallbackFired = false;
			let focusEventFired = false;

			await component.evaluate((element: HTMLKolInputTextElement) => {
				element._on = {
					onFocus: () => {
						(window as any).focusCallbackFired = true;
					},
				};
				element.addEventListener('focus', () => {
					(window as any).focusEventFired = true;
				});
			});

			await input.focus();
			await page.waitForChanges();

			focusCallbackFired = await page.evaluate(() => (window as any).focusCallbackFired);
			focusEventFired = await page.evaluate(() => (window as any).focusEventFired);

			await expect(focusCallbackFired).toBe(true);
			await expect(focusEventFired).toBe(true);
		});

		test('should call onBlur callback when input loses focus', async ({ page }) => {
			await page.setContent(`<${COMPONENT_NAME} _label="Input"></${COMPONENT_NAME}><button id="next">Next</button>`);
			const component = page.locator(COMPONENT_NAME);
			const input = page.locator('input');
			const nextButton = page.locator('#next');

			let blurCallbackFired = false;
			let blurEventFired = false;

			await component.evaluate((element: HTMLKolInputTextElement) => {
				element._on = {
					onBlur: () => {
						(window as any).blurCallbackFired = true;
					},
				};
				element.addEventListener('blur', () => {
					(window as any).blurEventFired = true;
				});
			});

			await input.focus();
			await page.waitForChanges();
			await nextButton.focus();
			await page.waitForChanges();

			blurCallbackFired = await page.evaluate(() => (window as any).blurCallbackFired);
			blurEventFired = await page.evaluate(() => (window as any).blurEventFired);

			await expect(blurCallbackFired).toBe(true);
			await expect(blurEventFired).toBe(true);
		});

		test('should call onClick callback when input is clicked', async ({ page }) => {
			await page.setContent(`<${COMPONENT_NAME} _label="Input"></${COMPONENT_NAME}>`);
			const component = page.locator(COMPONENT_NAME);
			const input = page.locator('input');

			let clickCallbackFired = false;
			let clickEventFired = false;

			await component.evaluate((element: HTMLKolInputTextElement) => {
				element._on = {
					onClick: () => {
						(window as any).clickCallbackFired = true;
					},
				};
				element.addEventListener('click', () => {
					(window as any).clickEventFired = true;
				});
			});

			await input.click();
			await page.waitForChanges();

			clickCallbackFired = await page.evaluate(() => (window as any).clickCallbackFired);
			clickEventFired = await page.evaluate(() => (window as any).clickEventFired);

			await expect(clickCallbackFired).toBe(true);
			await expect(clickEventFired).toBe(true);
		});

		test('should call onInput callback when input value changes', async ({ page }) => {
			await page.setContent(`<${COMPONENT_NAME} _label="Input"></${COMPONENT_NAME}>`);
			const component = page.locator(COMPONENT_NAME);
			const input = page.locator('input');

			let inputCallbackValue: unknown;
			let inputEventValue: unknown;

			await component.evaluate((element: HTMLKolInputTextElement) => {
				element._on = {
					onInput: (_event: Event, value?: unknown) => {
						(window as any).inputCallbackValue = value;
					},
				};
				element.addEventListener('input', (event: Event) => {
					(window as any).inputEventValue = (event as CustomEvent).detail;
				});
			});

			await input.fill(TEST_VALUE);
			await page.waitForChanges();

			inputCallbackValue = await page.evaluate(() => (window as any).inputCallbackValue);
			inputEventValue = await page.evaluate(() => (window as any).inputEventValue);

			await expect(inputCallbackValue).toBe(TEST_VALUE);
			await expect(inputEventValue).toBe(TEST_VALUE);
		});

		test('should call onChange callback when input is blurred after value change', async ({ page }) => {
			await page.setContent(`<${COMPONENT_NAME} _label="Input"></${COMPONENT_NAME}><button id="next">Next</button>`);
			const component = page.locator(COMPONENT_NAME);
			const input = page.locator('input');
			const nextButton = page.locator('#next');

			let changeCallbackValue: unknown;
			let changeEventValue: unknown;

			await component.evaluate((element: HTMLKolInputTextElement) => {
				element._on = {
					onChange: (_event: Event, value?: unknown) => {
						(window as any).changeCallbackValue = value;
					},
				};
				element.addEventListener('change', (event: Event) => {
					(window as any).changeEventValue = (event as CustomEvent).detail;
				});
			});

			await input.fill(TEST_VALUE);
			await page.waitForChanges();
			await nextButton.focus();
			await page.waitForChanges();

			changeCallbackValue = await page.evaluate(() => (window as any).changeCallbackValue);
			changeEventValue = await page.evaluate(() => (window as any).changeEventValue);

			await expect(changeCallbackValue).toBe(TEST_VALUE);
			await expect(changeEventValue).toBe(TEST_VALUE);
		});
	});

	testInputCharacterLimit(COMPONENT_NAME);
	testInputMessage<HTMLKolInputTextElement>(COMPONENT_NAME);

	test.describe('click() method', () => {
		test('should focus input when click() method is called', async ({ page }) => {
			await page.setContent('<kol-input-text _label="Test Input" _type="text"></kol-input-text>');
			const kolInput = page.locator('kol-input-text');

			await page.waitForChanges();

			// Register focus listener before calling click() to avoid race condition
			const focusPromise = kolInput.evaluate((el: HTMLKolInputTextElement) => {
				return new Promise<boolean>((resolve) => {
					const input = el.shadowRoot?.querySelector('input');
					if (input) {
						input.addEventListener('focus', () => resolve(true), { once: true });
					} else {
						resolve(false);
					}
				});
			});

			// Execute click() method via component API
			await kolInput.evaluate((el: HTMLKolInputTextElement) => {
				interface ClickableElement {
					click?: () => void | Promise<void>;
				}
				const element = el as ClickableElement;
				if (typeof element.click === 'function') {
					return element.click();
				}
			});

			await expect(focusPromise).resolves.toBe(true);
		});

		test('should focus input when host is clicked directly', async ({ page }) => {
			await page.setContent('<kol-input-text _label="Test Input" _type="text"></kol-input-text>');
			const kolInput = page.locator('kol-input-text');

			const focusPromise = kolInput.evaluate((element) => {
				return new Promise<boolean>((resolve) => {
					const input = element.shadowRoot?.querySelector('input');
					if (input) {
						input.addEventListener('focus', () => {
							resolve(true);
						});
					} else {
						resolve(false);
					}
				});
			});
			await page.waitForChanges();

			await kolInput.click();
			await expect(focusPromise).resolves.toBe(true);
		});
	});
});
