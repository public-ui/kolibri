import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { testInputCallbacksAndEvents, testInputCharacterLimit, testInputValueReflection } from '../../e2e';
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
	testInputCallbacksAndEvents<HTMLKolInputTextElement>({
		componentName: COMPONENT_NAME,
	});
	testInputCharacterLimit(COMPONENT_NAME);
	testInputMessage<HTMLKolInputTextElement>(COMPONENT_NAME);

	test.describe('click() method', () => {
		test('should focus input when click() method is called', async ({ page }) => {
			await page.setContent('<kol-input-text _label="Test Input" _type="text"></kol-input-text>');
			const kolInput = page.locator('kol-input-text');

			await page.waitForChanges();
			// Execute click() method - should not timeout or throw
			const clickResult = await kolInput.evaluate((el: HTMLKolInputTextElement) => {
				interface ClickableElement {
					click?: () => void | Promise<void>;
				}
				const element = el as ClickableElement;
				if (typeof element.click === 'function') {
					const result = element.click();
					// Return the result if it's a Promise, otherwise return success
					return result instanceof Promise ? result.then(() => 'success') : 'success';
				}
				return 'error';
			});
			expect(clickResult).toBe('success');

			await page.waitForChanges();

			// Verify input element exists and has received focus
			const { inputExists, inputFocused } = await kolInput.evaluate((element: HTMLKolInputTextElement) => {
				const input = element.shadowRoot?.querySelector('input');
				const exists = input !== null;
				const focused = !!input && element.shadowRoot?.activeElement === input;
				return { inputExists: exists, inputFocused: focused };
			});
			expect(inputExists).toBe(true);
			expect(inputFocused).toBe(true);
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
