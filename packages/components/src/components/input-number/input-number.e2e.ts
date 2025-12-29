import { expect } from '@playwright/test';
import type { E2EPage } from '@stencil/playwright';
import { test } from '@stencil/playwright';
import { testInputCallbacksAndEvents, testInputValueReflection } from '../../e2e';
import { testInputMessage } from '../../e2e/input-msg';
import type { FillAction } from '../../e2e/utils/FillAction';
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
		// Test cases for different initial values
		const testCases = [
			{ name: 'number', initialValue: 1, expectedType: 'number' },
			{ name: 'string', initialValue: '1' as NumberString, expectedType: 'string' },
			{ name: 'null', initialValue: null, expectedType: 'null' },
			{ name: 'undefined', initialValue: undefined, expectedType: 'null' },
		];

		for (const testCase of testCases) {
			test(`should handle ${testCase.name} type correctly`, async ({ page }) => {
				await page.setContent('<kol-input-number _label="Number input"></kol-input-number>');
				await setInitialValue(page, testCase.initialValue);

				const getValueResult = await getCurrentValue(page);
				expect(getValueResult).toBe(testCase.initialValue === undefined ? null : testCase.initialValue);

				// Test different input values
				await fillAndTest(page, '0', testCase.expectedType === 'string' ? '0' : 0);
				await fillAndTest(page, '', null);
				await fillAndTest(page, '2', testCase.expectedType === 'string' ? '2' : 2);
			});
		}
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

			// Verify onInput was called with the incremented value
			await expect(inputCallbackPromise).resolves.toBe(6);

			// Also verify the value was actually updated
			const currentValue = await getCurrentValue(page);
			expect(currentValue).toBe(6);
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

			// Verify onInput was called with the decremented value
			await expect(inputCallbackPromise).resolves.toBe(4);

			// Also verify the value was actually updated
			const currentValue = await getCurrentValue(page);
			expect(currentValue).toBe(4);
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

			// Verify onInput was called with value incremented by step size
			await expect(inputCallbackPromise).resolves.toBe(15);
		});

		test('should return string type when initial value was string', async ({ page }) => {
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

			// Verify onInput was called with string type (since initial value was string)
			const result = await inputCallbackPromise;
			expect(result).toBe('6');
			expect(typeof result).toBe('string');
		});
	});
});
