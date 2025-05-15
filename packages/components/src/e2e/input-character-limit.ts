import { test } from '@stencil/playwright';
import { expect } from '@playwright/test';

const testInputCharacterLimit = (componentName: string) => {
	test.describe('character limit', () => {
		test(`should show the initial remaining characters`, async ({ page }) => {
			await page.setContent(`<${componentName} _label="Input" _character-limit="10" _value="abc"></${componentName}>`);
			await expect(page.getByTestId('input-counter')).toHaveText('Es sind noch 7 Zeichen verfügbar.');
			await expect(page.getByTestId('input-counter-aria')).toHaveText('Es sind noch 7 Zeichen verfügbar.');
		});

		test(`should update the remaining characters when typing`, async ({ page }) => {
			await page.setContent(`<${componentName} _label="Input" _character-limit="10" _value="abc"></${componentName}>`);
			await page.locator('input,textarea').fill('abcdef');
			await page.waitForTimeout(500);
			await expect(page.getByTestId('input-counter')).toHaveText('Es sind noch 4 Zeichen verfügbar.');
			await expect(page.getByTestId('input-counter-aria')).toHaveText('Es sind noch 4 Zeichen verfügbar.');
		});

		test('should render an alternative text and modifier class when the limit has been exceeded', async ({ page }) => {
			await page.setContent(`<${componentName} _label="Input" _character-limit="10" _value="abc"></${componentName}>`);
			await page.locator('input,textarea').fill('a'.repeat(12));
			await expect(page.getByTestId('input-counter')).toHaveText('Es sind 2 Zeichen zu viel.');
			await expect(page.getByTestId('input-counter')).toHaveClass('kol-form-field__counter kol-form-field__counter--exceeded');
			await expect(page.getByTestId('input-counter-aria')).toHaveText('Es sind 2 Zeichen zu viel.');
		});

		test(`should update the remaining characters in the aria-live region with a delay`, async ({ page }) => {
			await page.setContent(`<${componentName} _label="Input" _character-limit="10" _value="abc"></${componentName}>`);
			await page.locator('input,textarea').fill('abc');

			const ariaCounter = page.getByTestId('input-counter-aria');

			let phase = 0;

			await expect
				.poll(
					async () => {
						const text = await ariaCounter.textContent();
						if (phase === 0) {
							if (text === 'Es sind noch 10 Zeichen verfügbar.') {
								phase = 1; // advance to next phase
								return false; // still “not done” so we keep polling
							}
							return false; // haven’t seen first value yet
						} else {
							return text === 'Es sind noch 7 Zeichen verfügbar.'; // succeed when we see the second
						}
					},
					{
						timeout: 1000, // total time to wait
						intervals: [250], // poll interval
					},
				)
				.toBe(true);
		});
	});
};

export { testInputCharacterLimit };
