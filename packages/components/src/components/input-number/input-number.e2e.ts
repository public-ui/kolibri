import { expect } from '@playwright/test';
import type { E2EPage } from '@stencil/playwright';
import { test } from '@stencil/playwright';
import { testInputCallbacksAndEvents, testInputValueReflection } from '../../e2e';
import { testInputMessage } from '../../e2e/input-msg';
import type { FillAction } from '../../e2e/utils/FillAction';
import { setContentWithRetry } from '../../e2e/utils/setContentWithRetry';
import type { NumberString } from '../../schema';

const COMPONENT_NAME = 'kol-input-number';
const TEST_VALUE = '10.23';
const fillAction: FillAction = async (page) => {
	await page.locator('input').fill(TEST_VALUE);
};

// Helper function to set up callbacks
const setupCallbacks = async (page: E2EPage) => {
	const inputCallbackPromise = page.locator('kol-input-number').evaluate((element: HTMLKolInputNumberElement) => {
		return new Promise<unknown>((resolve) => {
			element._on = {
				...element._on,
				onInput: (_event: Event, value?: unknown) => {
					resolve(value);
				},
			};
		});
	});
	const changeCallbackPromise = page.locator('kol-input-number').evaluate((element: HTMLKolInputNumberElement) => {
		return new Promise<unknown>((resolve) => {
			element._on = {
				...element._on,
				onChange: (_event: Event, value?: unknown) => {
					resolve(value);
				},
			};
		});
	});
	await page.waitForChanges();
	return { inputCallbackPromise, changeCallbackPromise };
};

// Helper function to set initial value
const setInitialValue = async (page: E2EPage, value: number | NumberString | null | undefined) => {
	await page.locator('kol-input-number').evaluate((element: HTMLKolInputNumberElement, val) => {
		element._value = val;
	}, value);
};

// Helper function to get current value
const getCurrentValue = async (page: E2EPage) => {
	return await page.locator('kol-input-number').evaluate(async (element: HTMLKolInputNumberElement) => {
		return await element.getValue();
	});
};

/* Fill the input with the given value and test getValue and the payloads for onInput and onChange */
const fillAndTest = async (page: E2EPage, input: string, expectedValue: unknown) => {
	const { inputCallbackPromise, changeCallbackPromise } = await setupCallbacks(page);

	await page.locator('input').fill(input);
	await page.locator('input').evaluate((element) => element.blur());
	const getValueResult = await getCurrentValue(page);

	expect(getValueResult).toBe(expectedValue);
	await expect(inputCallbackPromise).resolves.toBe(expectedValue);
	await expect(changeCallbackPromise).resolves.toBe(expectedValue);
};

test.describe(COMPONENT_NAME, () => {
	testInputValueReflection<HTMLKolInputNumberElement>({
		componentName: COMPONENT_NAME,
		fillAction,
		testValue: Number(TEST_VALUE),
	});
	testInputCallbacksAndEvents<HTMLKolInputNumberElement>({
		componentName: COMPONENT_NAME,
		expectedValue: Number(TEST_VALUE),
		testValue: TEST_VALUE,
	});
	testInputMessage<HTMLKolInputNumberElement>(COMPONENT_NAME);

	test.describe('type handling', () => {
		// HTML attribute test cases - values preserve their type as passed
		const htmlTestCases = [{ name: 'string attribute', initialValue: '1' as NumberString, expectedInitial: '1', expectedAfterFill: '0' }];

		for (const testCase of htmlTestCases) {
			test(`HTML: should handle ${testCase.name} type correctly`, async ({ page }) => {
				await page.setContent('<kol-input-number _label="Number input"></kol-input-number>');
				await setInitialValue(page, testCase.initialValue);

				const getValueResult = await getCurrentValue(page);
				expect(getValueResult).toBe(testCase.expectedInitial);

				// Test different input values - component returns strings when set via attributes
				await fillAndTest(page, '0', '0');
				await fillAndTest(page, '', null);
				await fillAndTest(page, '2', '2');
			});
		}

		test('HTML: should handle null type correctly', async ({ page }) => {
			await page.setContent('<kol-input-number _label="Number input"></kol-input-number>');
			await setInitialValue(page, null);

			const getValueResult = await getCurrentValue(page);
			expect(getValueResult).toBe(null);

			// When no initial value is set, user input gets converted to numbers
			await fillAndTest(page, '0', 0);
			await fillAndTest(page, '', null);
			await fillAndTest(page, '2', 2);
		});

		test('HTML: should handle undefined type correctly', async ({ page }) => {
			await setContentWithRetry(page, '<kol-input-number _label="Number input"></kol-input-number>');
			await setInitialValue(page, undefined);

			const getValueResult = await getCurrentValue(page);
			expect(getValueResult).toBe(null);

			// When no initial value is set, user input gets converted to numbers
			await fillAndTest(page, '0', 0);
			await fillAndTest(page, '', null);
			await fillAndTest(page, '2', 2);
		});

		// React component test - numbers are passed as actual numbers
		test('React: should handle number type correctly', async ({ page }) => {
			await page.setContent(`
				<div id="root"></div>
				<script type="module">
					import React from 'https://esm.sh/react';
					import { createRoot } from 'https://esm.sh/react-dom/client';

					// Create a simple wrapper that renders a kol-input-number
					const root = createRoot(document.getElementById('root'));
					const element = React.createElement('kol-input-number', {
						_label: 'Number input',
						_value: 1
					});
					root.render(element);
				</script>
			`);
			await page.waitForChanges();

			const getValueResult = await page.locator('kol-input-number').evaluate(async (element: HTMLKolInputNumberElement) => {
				return await element.getValue();
			});
			expect(getValueResult).toBe(1);

			// Test different input values - React with number value returns numbers
			const { inputCallbackPromise, changeCallbackPromise } = await setupCallbacks(page);
			await page.locator('input').fill('5');
			await page.locator('input').evaluate((element) => element.blur());

			await expect(inputCallbackPromise).resolves.toBe(5);
			await expect(changeCallbackPromise).resolves.toBe(5);
		});
	});

	test.describe('step buttons', () => {
		test('should fire onInput when clicking step up button', async ({ page }) => {
			await page.setContent('<kol-input-number _label="Number input" _value="5"></kol-input-number>');
			await page.waitForChanges();

			// Set up onInput callback to track if it's called
			const inputCallbackPromise = page.locator('kol-input-number').evaluate((element: HTMLKolInputNumberElement) => {
				return new Promise<unknown>((resolve) => {
					element._on = {
						...element._on,
						onInput: (_event: Event, value?: unknown) => {
							resolve(value);
						},
					};
				});
			});
			await page.waitForChanges();

			// Click the step up button
			const stepUpButton = page.locator('[data-testid="kol-input-number-step-up"]');
			await stepUpButton.click();
			await page.waitForChanges();

			// Verify onInput was called with the incremented value as string (HTML attribute is string)
			await expect(inputCallbackPromise).resolves.toBe('6');

			// Also verify the value was actually updated
			const currentValue = await getCurrentValue(page);
			expect(currentValue).toBe('6');
		});

		test('should fire onInput when clicking step down button', async ({ page }) => {
			await page.setContent('<kol-input-number _label="Number input" _value="5"></kol-input-number>');
			await page.waitForChanges();

			// Set up onInput callback to track if it's called
			const inputCallbackPromise = page.locator('kol-input-number').evaluate((element: HTMLKolInputNumberElement) => {
				return new Promise<unknown>((resolve) => {
					element._on = {
						...element._on,
						onInput: (_event: Event, value?: unknown) => {
							resolve(value);
						},
					};
				});
			});
			await page.waitForChanges();

			// Click the step down button
			const stepDownButton = page.locator('[data-testid="kol-input-number-step-down"]');
			await stepDownButton.click();
			await page.waitForChanges();

			// Verify onInput was called with the decremented value as string (HTML attribute is string)
			await expect(inputCallbackPromise).resolves.toBe('4');

			// Also verify the value was actually updated
			const currentValue = await getCurrentValue(page);
			expect(currentValue).toBe('4');
		});

		test('should respect step size when using buttons', async ({ page }) => {
			await page.setContent('<kol-input-number _label="Number input" _value="10" _step="5"></kol-input-number>');
			await page.waitForChanges();

			// Set up onInput callback
			const inputCallbackPromise = page.locator('kol-input-number').evaluate((element: HTMLKolInputNumberElement) => {
				return new Promise<unknown>((resolve) => {
					element._on = {
						...element._on,
						onInput: (_event: Event, value?: unknown) => {
							resolve(value);
						},
					};
				});
			});
			await page.waitForChanges();

			// Click the step up button
			const stepUpButton = page.locator('[data-testid="kol-input-number-step-up"]');
			await stepUpButton.click();
			await page.waitForChanges();

			// Verify onInput was called with value incremented by step size as string
			await expect(inputCallbackPromise).resolves.toBe('15');
		});

		test('HTML: should return number type when initial value was string', async ({ page }) => {
			await page.setContent('<kol-input-number _label="Number input" _value="5"></kol-input-number>');
			await page.waitForChanges();

			// Set up onInput callback
			const inputCallbackPromise = page.locator('kol-input-number').evaluate((element: HTMLKolInputNumberElement) => {
				return new Promise<unknown>((resolve) => {
					element._on = {
						...element._on,
						onInput: (_event: Event, value?: unknown) => {
							resolve(value);
						},
					};
				});
			});
			await page.waitForChanges();

			// Click the step up button
			const stepUpButton = page.locator('[data-testid="kol-input-number-step-up"]');
			await stepUpButton.click();
			await page.waitForChanges();

			// Verify onInput was called with string type (since initial value was string in HTML)
			const result = await inputCallbackPromise;
			expect(result).toBe('6');
			expect(typeof result).toBe('string');
		});

		test('React: should return number type when initial value was number', async ({ page }) => {
			await page.setContent(`
				<div id="root"></div>
				<script type="module">
					import React from 'https://esm.sh/react';
					import { createRoot } from 'https://esm.sh/react-dom/client';

					const root = createRoot(document.getElementById('root'));
					const element = React.createElement('kol-input-number', {
						_label: 'Number input',
						_value: 5
					});
					root.render(element);
				</script>
			`);
			await page.waitForChanges();

			// Set up onInput callback
			const inputCallbackPromise = page.locator('kol-input-number').evaluate((element: HTMLKolInputNumberElement) => {
				return new Promise<unknown>((resolve) => {
					element._on = {
						...element._on,
						onInput: (_event: Event, value?: unknown) => {
							resolve(value);
						},
					};
				});
			});
			await page.waitForChanges();

			// Click the step up button
			const stepUpButton = page.locator('[data-testid="kol-input-number-step-up"]');
			await stepUpButton.click();
			await page.waitForChanges();

			// Verify onInput was called with number type (since initial value was number in React)
			const result = await inputCallbackPromise;
			expect(result).toBe(6);
			expect(typeof result).toBe('number');
		});
	});
});
