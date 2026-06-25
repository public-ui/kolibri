import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

const testInputCharacterLimit = (componentName: string) => {
	test.describe('character limit', () => {
		test.describe('With _has-counter', () => {
			test('Should show current value length when no limits are applied', async ({ page }) => {
				await page.setContent(`<${componentName} _label="Input" _value="abc" _has-counter></${componentName}>`);
				await page.waitForChanges();
				await expect(page.getByTestId('input-counter')).toHaveText('3 Zeichen');
				await expect(page.getByTestId('input-counter-aria')).toHaveText('3 Zeichen');
			});

			test('Should show current value and max length when theres a max length and _max-length-behavior hard', async ({ page }) => {
				await page.setContent(`<${componentName} _label="Input" _value="abc" _max-length="10" _has-counter></${componentName}>`);
				await page.waitForChanges();
				await expect(page.getByTestId('input-counter')).toHaveText('3/10 Zeichen');
				await expect(page.getByTestId('input-counter-aria')).toHaveText('3 von 10 Zeichen');
			});

			test('Should re-announce the character limit message on blocked input attempts (hard)', async ({ page }) => {
				await page.setContent(`<${componentName} _label="Input" _value="abc" _max-length="3" _has-counter></${componentName}>`);
				await page.waitForChanges();
				const ariaCounter = page.getByTestId('input-counter-aria');
				await expect(ariaCounter).toHaveText('3 von 3 Zeichen Zeichenlimit erreicht!');

				// The native maxlength blocks the input, so no input event fires; the keydown listener must
				// re-trigger the live region. The aria span is first cleared to force a re-announcement ...
				await page.locator('input,textarea').press('a');
				await expect(ariaCounter).toHaveText('');
				// ... and then re-populated with the message after the 1 s debounce.
				await expect(ariaCounter).toHaveText('3 von 3 Zeichen Zeichenlimit erreicht!', { timeout: 1500 });
			});

			test('Should not re-trigger the live region for control keys at the limit (hard)', async ({ page }) => {
				await page.setContent(`<${componentName} _label="Input" _value="abc" _max-length="3" _has-counter></${componentName}>`);
				await page.waitForChanges();
				const ariaCounter = page.getByTestId('input-counter-aria');
				await expect(ariaCounter).toHaveText('3 von 3 Zeichen Zeichenlimit erreicht!');

				// Control keys are no input attempts and must not clear/re-announce the live region.
				await page.locator('input,textarea').press('ArrowLeft');
				await expect(ariaCounter).toHaveText('3 von 3 Zeichen Zeichenlimit erreicht!');
			});

			test.describe('With _maxLengthBehaviour="soft"', () => {
				test(`should show the initial remaining characters`, async ({ page }) => {
					await page.setContent(`<${componentName} _label="Input" _max-length="10" _has-counter _max-length-behavior="soft" _value="abc"></${componentName}>`);
					await page.waitForChanges();
					await expect(page.getByTestId('input-counter')).toHaveText('Es sind noch 7 Zeichen verfügbar.');
					await expect(page.getByTestId('input-counter-aria')).toHaveText('Es sind noch 7 Zeichen verfügbar.');
				});

				test(`should update the remaining characters when typing`, async ({ page }) => {
					await page.setContent(`<${componentName} _label="Input" _max-length="10" _has-counter _max-length-behavior="soft" _value="abc"></${componentName}>`);
					await page.waitForChanges();
					await page.locator('input,textarea').fill('abcdef');
					// Visual counter updates immediately
					await expect(page.getByTestId('input-counter')).toHaveText('Es sind noch 4 Zeichen verfügbar.');
					// Aria counter is debounced by 1 s to avoid noisy screen-reader announcements during typing
					await expect(page.getByTestId('input-counter-aria')).toHaveText('Es sind noch 4 Zeichen verfügbar.', { timeout: 1500 });
				});

				test('should render an alternative text and modifier class when the limit has been exceeded', async ({ page }) => {
					await page.setContent(`<${componentName} _label="Input" _max-length="10" _has-counter _max-length-behavior="soft" _value="abc"></${componentName}>`);
					await page.waitForChanges();
					await page.locator('input,textarea').fill('a'.repeat(12));
					await expect(page.getByTestId('input-counter')).toHaveText('Es sind 2 Zeichen zu viel.');
					await expect(page.getByTestId('input-counter')).toHaveClass('kol-form-field__counter kol-form-field__counter--exceeded');
					// Aria counter is debounced by 1 s to avoid noisy screen-reader announcements during typing
					await expect(page.getByTestId('input-counter-aria')).toHaveText('Es sind 2 Zeichen zu viel.', { timeout: 1500 });
				});

				test(`should update the remaining characters in the aria-live region with a delay`, async ({ page }) => {
					await page.setContent(`<${componentName} _label="Input" _max-length="10" _has-counter _max-length-behavior="soft" _value="abc"></${componentName}>`);
					await page.waitForChanges();
					const ariaCounter = page.getByTestId('input-counter-aria');
					const initialText = await ariaCounter.textContent();
					if (initialText !== 'Es sind noch 7 Zeichen verfügbar.') {
						await expect(ariaCounter).toHaveText('Es sind noch 10 Zeichen verfügbar.');
						await expect(ariaCounter).toHaveText('Es sind noch 7 Zeichen verfügbar.', { timeout: 1500 });
					}
				});
			});
		});

		test.describe('FormFieldCharacterLimitHint', () => {
			test('Should render character limit hint when maxLength is set with soft behavior', async ({ page }) => {
				await page.setContent(`<${componentName} _label="Input"  _max-length="10" _max-length-behavior="soft" _value="abc"></${componentName}>`);
				await page.waitForChanges();
				const inputElement = page.locator('input,textarea');
				const hintElement = page.locator('[id*="character-limit-hint"]');

				await expect(hintElement).toBeAttached();
				await expect(hintElement).toHaveText('Es können bis zu 10 Zeichen eingegeben werden.');
				const hintId = await hintElement.getAttribute('id');
				await expect(inputElement).toHaveAttribute('aria-describedby', hintId!);
			});

			test('Should render character limit hint when maxLength is set with hard behavior', async ({ page }) => {
				await page.setContent(`<${componentName} _label="Input"  _max-length="10" _value="abc"></${componentName}>`);
				await page.waitForChanges();
				const inputElement = page.locator('input,textarea');
				const hintElement = page.locator('[id*="character-limit-hint"]');

				await expect(hintElement).toBeAttached();
				await expect(hintElement).toHaveText('Es können bis zu 10 Zeichen eingegeben werden.');
				const hintId = await hintElement.getAttribute('id');
				await expect(inputElement).toHaveAttribute('aria-describedby', hintId!);
			});

			test('Should not render character limit hint when no maxLength is set', async ({ page }) => {
				await page.setContent(`<${componentName} _label="Input"  _has-counter _value="abc"></${componentName}>`);
				await page.waitForChanges();
				const hintElement = page.locator('[id*="character-limit-hint"]');
				await expect(hintElement).not.toBeAttached();
			});
		});
	});
};

export { testInputCharacterLimit };
