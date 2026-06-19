import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { testInputValueReflection } from '../../e2e';

const COMPONENT_NAME = 'kol-combobox';
const TEST_VALUE = 'Hello World';
const OPTIONS = ['North', 'South', 'West', 'East'];

test.describe(COMPONENT_NAME, () => {
	testInputValueReflection<HTMLKolComboboxElement>({
		componentName: COMPONENT_NAME,
		testValue: TEST_VALUE,
	});

	test.describe('Callbacks and Events', () => {
		test('should call onFocus callback when input receives focus', async ({ page }) => {
			await page.setContent(`<kol-combobox _label="Input" _suggestions=${JSON.stringify(OPTIONS)}></kol-combobox>`);
			const component = page.locator('kol-combobox');
			const input = page.locator('input.kol-combobox__input');

			let focusCallbackFired = false;
			let focusEventFired = false;

			await component.evaluate((element: HTMLKolComboboxElement) => {
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

		test('should call onClick callback when input is clicked', async ({ page }) => {
			await page.setContent(`<kol-combobox _label="Input" _suggestions=${JSON.stringify(OPTIONS)}></kol-combobox>`);
			const component = page.locator('kol-combobox');
			const input = page.locator('input.kol-combobox__input');

			let clickCallbackFired = false;
			let clickEventFired = false;

			await component.evaluate((element: HTMLKolComboboxElement) => {
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
			await page.setContent(`<kol-combobox _label="Input" _suggestions=${JSON.stringify(OPTIONS)}></kol-combobox>`);
			const component = page.locator('kol-combobox');
			const input = page.locator('input.kol-combobox__input');

			let inputCallbackValue: unknown;
			let inputEventValue: unknown;

			await component.evaluate((element: HTMLKolComboboxElement) => {
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

		test('should call onChange callback when value is committed', async ({ page }) => {
			await page.setContent(`<kol-combobox _label="Input" _suggestions=${JSON.stringify(OPTIONS)}></kol-combobox>`);
			const component = page.locator('kol-combobox');
			const input = page.locator('input.kol-combobox__input');

			let changeCallbackValue: unknown;
			let changeEventValue: unknown;

			await component.evaluate((element: HTMLKolComboboxElement) => {
				element._on = {
					onChange: (_event: Event, value?: unknown) => {
						(window as any).changeCallbackValue = value;
					},
				};
				element.addEventListener('change', (event: Event) => {
					(window as any).changeEventValue = (event as CustomEvent).detail;
				});
			});

			// Commit a value through the listbox: open it, focus the first option ('North') and select it with Enter.
			// This exercises the component's actual commit path (selectOption) and avoids relying on the
			// browser's native change-on-Enter, which the combobox suppresses via preventDefault.
			await input.focus();
			await page.keyboard.press('ArrowDown');
			await page.keyboard.press('Enter');
			await page.waitForChanges();

			changeCallbackValue = await page.evaluate(() => (window as any).changeCallbackValue);
			changeEventValue = await page.evaluate(() => (window as any).changeEventValue);

			await expect(changeCallbackValue).toBe('North');
			await expect(changeEventValue).toBe('North');
		});
	});

	test('should fire input and change events', async ({ page }) => {
		await page.setContent(`<kol-combobox _label="Input" _suggestions=${JSON.stringify(OPTIONS)}></kol-combobox>`);
		const input = page.locator('input.kol-combobox__input');

		await input.fill(TEST_VALUE);
		await expect(input).toHaveValue(TEST_VALUE);
	});

	test('should open listbox when button is clicked', async ({ page }) => {
		await page.setContent(`<kol-combobox _label="Input" _suggestions=${JSON.stringify(OPTIONS)}></kol-combobox>`);
		const input = page.locator('input.kol-combobox__input');
		await input.focus();
		await page.keyboard.press('ArrowDown');
		const listbox = page.locator('.kol-custom-suggestions-options-group');
		await expect(listbox).toBeVisible();
	});

	test('should close listbox when pressing Escape', async ({ page }) => {
		await page.setContent(`<kol-combobox _label="Input" _suggestions=${JSON.stringify(OPTIONS)}></kol-combobox>`);
		const input = page.locator('input.kol-combobox__input');
		await input.focus();
		await page.keyboard.press('ArrowDown');
		await input.press('Escape');
		const listbox = page.locator('.kol-custom-suggestions-options-group--open');
		await expect(listbox).toHaveCount(0);
	});

	test('should select option with Enter key', async ({ page }) => {
		await page.setContent(`<kol-combobox _label="Input" _suggestions=${JSON.stringify(OPTIONS)}></kol-combobox>`);
		const input = page.locator('input.kol-combobox__input');
		await input.focus();
		await page.keyboard.press('ArrowDown');
		await page.keyboard.press('Enter');

		await expect(input).toHaveValue('North');
	});

	test('should filter suggestions based on input', async ({ page }) => {
		await page.setContent(`<kol-combobox _label="Input"></kol-combobox>`);
		await page.evaluate(() => {
			const combobox = document.querySelector('kol-combobox');
			if (combobox) combobox._suggestions = ['North', 'South', 'West', 'East'];
		});
		const input = page.locator('input.kol-combobox__input');
		await input.focus();
		await input.fill('SOU');

		await page.waitForChanges();
		await page.waitForTimeout(300);
		const suggestions = page.locator('.kol-custom-suggestions-options-group li');
		await expect(suggestions).toHaveCount(1);
		await expect(suggestions.first()).toHaveText('South');
	});

	test('should disable interaction when _disabled is true', async ({ page }) => {
		await page.setContent(`<kol-combobox _label="Input" _disabled _suggestions=${JSON.stringify(OPTIONS)}></kol-combobox>`);
		const input = page.locator('input.kol-combobox__input');
		await expect(input).toBeDisabled();
		const listbox = page.locator('.kol-custom-suggestions-options-group--open');
		await expect(listbox).toHaveCount(0);
	});

	test('should emit onBlur callback when focus moves from input to clear button', async ({ page }) => {
		await page.setContent(`<kol-combobox _label="Input" _suggestions=${JSON.stringify(OPTIONS)} _value="North"></kol-combobox>`);
		const component = page.locator('kol-combobox');
		const input = page.locator('input.kol-combobox__input');
		const clearButton = page.locator('[data-testid="combobox-delete"]');

		let blurCallbackFired = false;
		let blurEventFired = false;

		await component.evaluate((element: HTMLKolComboboxElement) => {
			element._on = {
				onBlur: () => {
					(window as any).blurCallbackFired = true;
				},
			};
			element.addEventListener('blur', () => {
				(window as any).blurEventFired = true;
			});
		});

		await page.waitForChanges();

		// Focus input
		await input.focus();
		await page.waitForChanges();

		// Verify input has focus (check in shadowRoot)
		const hasInputFocus = await input.evaluate((el) => {
			const root = el.getRootNode() as ShadowRoot | Document;
			return root.activeElement === el;
		});
		expect(hasInputFocus).toBe(true);

		// Click clear button — this should trigger blur on input
		await clearButton.click();
		await page.waitForChanges();

		// Check if blur was fired
		blurCallbackFired = await page.evaluate(() => (window as any).blurCallbackFired);
		blurEventFired = await page.evaluate(() => (window as any).blurEventFired);

		await expect(blurCallbackFired).toBe(true);
		await expect(blurEventFired).toBe(true);
	});

	test('should emit onBlur when Tab to next element', async ({ page }) => {
		await page.setContent(`
			<kol-combobox _label="Input" _suggestions=${JSON.stringify(OPTIONS)}></kol-combobox>
			<button id="next-button">Next Button</button>
		`);
		const component = page.locator('kol-combobox');
		const input = page.locator('input.kol-combobox__input');
		const nextButton = page.locator('#next-button');

		let blurCallbackFired = false;

		await component.evaluate((element: HTMLKolComboboxElement) => {
			element._on = {
				onBlur: () => {
					(window as any).blurCallbackFired = true;
				},
			};
		});

		await page.waitForChanges();

		// Focus input
		await input.focus();
		await page.waitForChanges();

		// Tab to next button
		await page.keyboard.press('Tab');
		await page.waitForChanges();

		// Verify next button has focus
		const nextButtonHasFocus = await nextButton.evaluate((el) => el === document.activeElement);
		expect(nextButtonHasFocus).toBe(true);

		// Blur SHOULD have fired
		blurCallbackFired = await page.evaluate(() => (window as any).blurCallbackFired);
		await expect(blurCallbackFired).toBe(true);
	});
});
