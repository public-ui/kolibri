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

			test('Should refresh the counter when _max-length changes programmatically', async ({ page }) => {
				await page.setContent(`<${componentName} _label="Input" _value="abc" _max-length="10" _has-counter></${componentName}>`);
				await page.waitForChanges();
				await expect(page.getByTestId('input-counter')).toHaveText('3/10 Zeichen');

				// Shortening the max length must be reflected by the counter even though the value stays unchanged.
				await page.locator(componentName).evaluate((el) => {
					el.setAttribute('_max-length', '5');
				});
				await page.waitForChanges();
				await expect(page.getByTestId('input-counter')).toHaveText('3/5 Zeichen');
				await expect(page.getByTestId('input-counter-aria')).toHaveText('3 von 5 Zeichen');
			});

			test('Should re-announce the character limit message on blocked input attempts (hard)', async ({ page }) => {
				await page.setContent(`<${componentName} _label="Input" _value="abc" _max-length="3" _has-counter></${componentName}>`);
				await page.waitForChanges();
				const ariaCounter = page.getByTestId('input-counter-aria');
				await expect(ariaCounter).toHaveText('3 von 3 Zeichen Zeichenlimit erreicht!');
				const initialContent = await ariaCounter.textContent();

				// The native maxlength blocks the input, so no input event fires; the keydown listener must
				// re-trigger the live region. To force a re-announcement of the identical message, an invisible
				// NBSP is toggled so the raw text content actually changes after the 1 s debounce.
				await page.locator('input,textarea').press('a');
				await page.waitForTimeout(1300);
				expect(await ariaCounter.textContent()).not.toBe(initialContent);
				// The visible message itself is unchanged (whitespace, incl. the NBSP, is normalized away).
				await expect(ariaCounter).toHaveText('3 von 3 Zeichen Zeichenlimit erreicht!');
			});

			test('Should re-trigger the live region on focus', async ({ page }) => {
				await page.setContent(`<${componentName} _label="Input" _value="abc" _max-length="3" _has-counter></${componentName}>`);
				await page.waitForChanges();
				const ariaCounter = page.getByTestId('input-counter-aria');
				await expect(ariaCounter).toHaveText('3 von 3 Zeichen Zeichenlimit erreicht! ');
			});

			test('Should not re-trigger the live region for control keys at the limit (hard)', async ({ page }) => {
				await page.setContent(`<${componentName} _label="Input" _value="abc" _max-length="3" _has-counter></${componentName}>`);
				await page.waitForChanges();
				const ariaCounter = page.getByTestId('input-counter-aria');
				const expectedText = '3 von 3 Zeichen Zeichenlimit erreicht! ';
				await expect(ariaCounter).toHaveText(expectedText);

				// Control keys are no input attempts and must not re-trigger the live region. Wait past the
				// debounce window and assert the raw content did not change (no toggled NBSP).
				await page.locator('input,textarea').press('ArrowLeft');
				await page.waitForTimeout(1300);
				await expect(ariaCounter).toHaveText(expectedText);
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

			test('Should not render character limit hint when a counter is shown (info is conveyed by the counter)', async ({ page }) => {
				await page.setContent(`<${componentName} _label="Input" _max-length="10" _has-counter _value="abc"></${componentName}>`);
				await page.waitForChanges();
				const inputElement = page.locator('input,textarea');
				const hintElement = page.locator('[id*="character-limit-hint"]');

				// The redundant hint is not rendered, and the input must not reference its (non-existent) id.
				await expect(hintElement).not.toBeAttached();
				const describedBy = (await inputElement.getAttribute('aria-describedby')) ?? '';
				expect(describedBy).not.toContain('character-limit-hint');
			});
		});
	});
};

export { testInputCharacterLimit };
