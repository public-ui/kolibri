import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { testInputCallbacksAndEvents, testInputValueReflection } from '../../e2e';

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

	testInputValueReflection<HTMLKolInputTextElement>(COMPONENT_NAME, TEST_VALUE);
	testInputCallbacksAndEvents<HTMLKolInputTextElement>(COMPONENT_NAME);
});
