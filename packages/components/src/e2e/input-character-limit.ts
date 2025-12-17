import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

const testInputCharacterLimit = (componentName: string) => {
	test.describe('character limit', () => {
		test.describe('With _has-counter', () => {
			test('Should show current value length when no limits are applied', async ({ page }) => {
				await page.setContent(`<${componentName} _label="Input" _value="abc" _has-counter></${componentName}>`);

				await expect(page.getByTestId('input-counter')).toHaveText('3 Zeichen');
				await expect(page.getByTestId('input-counter-aria')).toHaveText('3 Zeichen');
			});

			test('Should show current value and max length when theres a max length and _max-length-behavior hard', async ({ page }) => {
				await page.setContent(`<${componentName} _label="Input" _value="abc" _max-length="10" _has-counter></${componentName}>`);

				await expect(page.getByTestId('input-counter')).toHaveText('3/10 Zeichen');
				await expect(page.getByTestId('input-counter-aria')).toHaveText('3 von 10 Zeichen');
			});

			test.describe('With _maxLengthBehaviour="soft"', () => {
				test(`should show the initial remaining characters`, async ({ page }) => {
					await page.setContent(`<${componentName} _label="Input" _max-length="10" _has-counter _max-length-behavior="soft" _value="abc"></${componentName}>`);
					await expect(page.getByTestId('input-counter')).toHaveText('Es sind noch 7 Zeichen verfügbar.');
					await expect(page.getByTestId('input-counter-aria')).toHaveText('Es sind noch 7 Zeichen verfügbar.');
				});

				test(`should update the remaining characters when typing`, async ({ page }) => {
					await page.setContent(`<${componentName} _label="Input" _max-length="10" _has-counter _max-length-behavior="soft" _value="abc"></${componentName}>`);
					await page.locator('input,textarea').fill('abcdef');
					await page.waitForTimeout(500);
					await expect(page.getByTestId('input-counter')).toHaveText('Es sind noch 4 Zeichen verfügbar.');
					await expect(page.getByTestId('input-counter-aria')).toHaveText('Es sind noch 4 Zeichen verfügbar.');
				});

				test('should render an alternative text and modifier class when the limit has been exceeded', async ({ page }) => {
					await page.setContent(`<${componentName} _label="Input" _max-length="10" _has-counter _max-length-behavior="soft" _value="abc"></${componentName}>`);
					await page.locator('input,textarea').fill('a'.repeat(12));
					await expect(page.getByTestId('input-counter')).toHaveText('Es sind 2 Zeichen zu viel.');
					await expect(page.getByTestId('input-counter')).toHaveClass('kol-form-field__counter kol-form-field__counter--exceeded');
					await expect(page.getByTestId('input-counter-aria')).toHaveText('Es sind 2 Zeichen zu viel.');
				});

				test(`should update the remaining characters in the aria-live region with a delay`, async ({ page }) => {
					await page.setContent(`<${componentName} _label="Input" _max-length="10" _has-counter _max-length-behavior="soft" _value="abc"></${componentName}>`);
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
		});

		test.describe('FormFieldCharacterLimitHint', () => {
			test('Should render character limit hint when maxLength is set with soft behavior', async ({ page }) => {
				await page.setContent(`<${componentName} _label="Input"  _max-length="10" _max-length-behavior="soft" _value="abc"></${componentName}>`);

				const inputElement = page.locator('input,textarea');
				const hintElement = page.locator('#id-nonce-character-limit-hint');

				await expect(hintElement).toBeVisible();
				await expect(hintElement).toHaveText('Es können bis zu 10 Zeichen eingegeben werden.');
				await expect(inputElement).toHaveAttribute('aria-describedby', 'id-nonce-character-limit-hint');
			});

			test('Should render character limit hint when maxLength is set with hard behavior', async ({ page }) => {
				await page.setContent(`<${componentName} _label="Input"  _max-length="10" _value="abc"></${componentName}>`);

				const inputElement = page.locator('input,textarea');
				const hintElement = page.locator('#id-nonce-character-limit-hint');

				await expect(hintElement).toBeVisible();
				await expect(hintElement).toHaveText('Es können bis zu 10 Zeichen eingegeben werden.');
				await expect(inputElement).toHaveAttribute('aria-describedby', 'id-nonce-character-limit-hint');
			});

			test('Should not render character limit hint when no maxLength is set', async ({ page }) => {
				await page.setContent(`<${componentName} _label="Input"  _has-counter _value="abc"></${componentName}>`);

				const inputElement = page.locator('input,textarea');
				const hintElement = page.locator('#id-nonce-character-limit-hint');

				await expect(hintElement).not.toBeVisible();
				await expect(inputElement).toHaveAttribute('aria-describedby');
			});
		});
	});
};

export { testInputCharacterLimit };
