import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { testInputCharacterLimit, testInputValueReflection } from '../../e2e';
import { testInputMessage } from '../../e2e/input-msg';

const COMPONENT_NAME = 'kol-input-password';
const TEST_VALUE = 'Hunter2';

test.describe('kol-input-password', () => {
	testInputValueReflection<HTMLKolInputPasswordElement>({
		componentName: COMPONENT_NAME,
		testValue: TEST_VALUE,
	});

	test.describe('Callbacks and Events', () => {
		test('should call onFocus callback when input receives focus', async ({ page }) => {
			await page.setContent(`<${COMPONENT_NAME} _label="Password"></${COMPONENT_NAME}>`);
			const component = page.locator(COMPONENT_NAME);
			const input = page.locator('input');
			let focusCallbackFired = false;
			await component.evaluate((element: HTMLKolInputPasswordElement) => {
				element._on = {
					onFocus: () => {
						(window as any).focusCallbackFired = true;
					},
				};
			});
			await input.focus();
			await page.waitForChanges();
			focusCallbackFired = await page.evaluate(() => (window as any).focusCallbackFired);
			await expect(focusCallbackFired).toBe(true);
		});

		test('should call onBlur callback when input loses focus', async ({ page }) => {
			await page.setContent(`<${COMPONENT_NAME} _label="Password"></${COMPONENT_NAME}><button id="next">Next</button>`);
			const component = page.locator(COMPONENT_NAME);
			const input = page.locator('input');
			const nextButton = page.locator('#next');
			let blurCallbackFired = false;
			await component.evaluate((element: HTMLKolInputPasswordElement) => {
				element._on = {
					onBlur: () => {
						(window as any).blurCallbackFired = true;
					},
				};
			});
			await input.focus();
			await page.waitForChanges();
			await nextButton.focus();
			await page.waitForChanges();
			blurCallbackFired = await page.evaluate(() => (window as any).blurCallbackFired);
			await expect(blurCallbackFired).toBe(true);
		});

		test('should call onClick callback when input is clicked', async ({ page }) => {
			await page.setContent(`<${COMPONENT_NAME} _label="Password"></${COMPONENT_NAME}>`);
			const component = page.locator(COMPONENT_NAME);
			const input = page.locator('input');
			let clickCallbackFired = false;
			await component.evaluate((element: HTMLKolInputPasswordElement) => {
				element._on = {
					onClick: () => {
						(window as any).clickCallbackFired = true;
					},
				};
			});
			await input.click();
			await page.waitForChanges();
			clickCallbackFired = await page.evaluate(() => (window as any).clickCallbackFired);
			await expect(clickCallbackFired).toBe(true);
		});

		test('should call onInput callback when value changes', async ({ page }) => {
			await page.setContent(`<${COMPONENT_NAME} _label="Password"></${COMPONENT_NAME}>`);
			const component = page.locator(COMPONENT_NAME);
			const input = page.locator('input');
			let inputCallbackValue: unknown;
			await component.evaluate((element: HTMLKolInputPasswordElement) => {
				element._on = {
					onInput: (_event, value) => {
						(window as any).inputCallbackValue = value;
					},
				};
			});
			await input.fill(TEST_VALUE);
			await page.waitForChanges();
			inputCallbackValue = await page.evaluate(() => (window as any).inputCallbackValue);
			await expect(inputCallbackValue).toBe(TEST_VALUE);
		});

		test('should call onChange callback when input is blurred', async ({ page }) => {
			await page.setContent(`<${COMPONENT_NAME} _label="Password"></${COMPONENT_NAME}><button id="next">Next</button>`);
			const component = page.locator(COMPONENT_NAME);
			const input = page.locator('input');
			const nextButton = page.locator('#next');
			let changeCallbackValue: unknown;
			await component.evaluate((element: HTMLKolInputPasswordElement) => {
				element._on = {
					onChange: (_event, value) => {
						(window as any).changeCallbackValue = value;
					},
				};
			});
			await input.fill(TEST_VALUE);
			await page.waitForChanges();
			await nextButton.focus();
			await page.waitForChanges();
			changeCallbackValue = await page.evaluate(() => (window as any).changeCallbackValue);
			await expect(changeCallbackValue).toBe(TEST_VALUE);
		});
	});

	testInputCharacterLimit(COMPONENT_NAME);
	testInputMessage<HTMLKolInputPasswordElement>(COMPONENT_NAME);

	test.describe('Password Visibility Toggle', () => {
		test('should toggle the password visibility when button is clicked', async ({ page }) => {
			await page.setContent('<kol-input-password _label="Password input" _visibility-toggle="true"></kol-input-password>');
			const input = page.locator('kol-input-password input');
			const toggleButton = page.getByTestId('kol-input-password-toggle-button');
			await expect(input).toHaveAttribute('type', 'password');
			await toggleButton.click();
			await expect(input).toHaveAttribute('type', 'text');
			await toggleButton.click();
			await expect(input).toHaveAttribute('type', 'password');
		});
	});
});
