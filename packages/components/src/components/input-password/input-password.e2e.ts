import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { testInputCallbacksAndEvents, testInputCharacterLimit, testInputValueReflection } from '../../e2e';
import { testInputMessage } from '../../e2e/input-msg';

const COMPONENT_NAME = 'kol-input-password';
const TEST_VALUE = 'Hunter2';

test.describe('kol-input-password', () => {
	testInputValueReflection<HTMLKolInputPasswordElement>({
		componentName: COMPONENT_NAME,
		testValue: TEST_VALUE,
	});
	testInputCallbacksAndEvents<HTMLKolInputPasswordElement>({
		componentName: COMPONENT_NAME,
	});
	testInputCharacterLimit(COMPONENT_NAME);
	testInputMessage<HTMLKolInputPasswordElement>(COMPONENT_NAME);

	test.describe('Password Visibility Toggle', () => {
		test('should toggle the password visibility when button is clicked', async ({ page }) => {
			await page.setContent('<kol-input-password _label="Password input" _variant="visibility-toggle"></kol-input-password>');
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
