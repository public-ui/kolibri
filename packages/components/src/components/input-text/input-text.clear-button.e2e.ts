import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

type RecordedEvent = { detail: unknown; type: string };
type TestWindow = Window & {
	changeCallbackValue?: unknown;
	changeEventValue?: unknown;
	inputCallbackValue?: unknown;
	inputEventValue?: unknown;
	recordedEvents?: RecordedEvent[];
};

test.describe('kol-input-text clear button', () => {
	test('should render clear button when type is search and input has value', async ({ page }) => {
		await page.setContent('<kol-input-text _label="Search" _type="search" _value="test"></kol-input-text>');
		const clearButton = page.getByTestId('kol-input-text-clear-button');
		await expect(clearButton).toBeVisible();
	});

	test('should not render clear button when type is not search', async ({ page }) => {
		await page.setContent('<kol-input-text _label="Text" _type="text" _value="test"></kol-input-text>');
		const clearButton = page.getByTestId('kol-input-text-clear-button');
		await expect(clearButton).not.toBeVisible();
	});

	test('should not render clear button when input is empty', async ({ page }) => {
		await page.setContent('<kol-input-text _label="Search" _type="search"></kol-input-text>');
		const clearButton = page.getByTestId('kol-input-text-clear-button');
		await expect(clearButton).not.toBeVisible();
	});

	test('should clear input value when clear button is clicked', async ({ page }) => {
		await page.setContent('<kol-input-text _label="Search" _type="search" _value="test"></kol-input-text>');
		const input = page.locator('kol-input-text input');
		const clearButton = page.getByTestId('kol-input-text-clear-button');

		await expect(input).toHaveValue('test');
		await clearButton.click();
		await expect(input).toHaveValue('');
		await expect(clearButton).not.toBeVisible();
	});

	test('should show clear button while typing and hide it when field is emptied', async ({ page }) => {
		await page.setContent('<kol-input-text _label="Search" _type="search"></kol-input-text>');
		const input = page.locator('kol-input-text input');
		const clearButton = page.getByTestId('kol-input-text-clear-button');

		await expect(clearButton).not.toBeVisible();

		await input.fill('test');
		await expect(clearButton).toBeVisible();

		await input.fill('');
		await expect(clearButton).not.toBeVisible();
	});

	test('should not render clear button when disabled', async ({ page }) => {
		await page.setContent('<kol-input-text _label="Search" _type="search" _disabled _value="test"></kol-input-text>');
		const clearButton = page.getByTestId('kol-input-text-clear-button');
		await expect(clearButton).not.toBeVisible();
	});

	test('should have correct accessible name', async ({ page }) => {
		await page.setContent('<kol-input-text _label="Search" _type="search" _value="test"></kol-input-text>');
		const clearButton = page.getByTestId('kol-input-text-clear-button').locator('button');
		await expect(clearButton).toHaveAccessibleName('Suche löschen');
	});

	test.describe('Callbacks and Events', () => {
		const SEARCH_WITH_VALUE = '<kol-input-text _label="Search" _type="search" _name="query" _value="test"></kol-input-text>';

		test('should fire input and change events and call the callbacks when clear button is clicked', async ({ page }) => {
			await page.setContent(SEARCH_WITH_VALUE);
			const component = page.locator('kol-input-text');
			const clearButton = page.getByTestId('kol-input-text-clear-button');

			await component.evaluate((element: HTMLKolInputTextElement) => {
				const testWindow = window as TestWindow;
				testWindow.inputCallbackValue = '__unset__';
				testWindow.changeCallbackValue = '__unset__';
				testWindow.inputEventValue = '__unset__';
				testWindow.changeEventValue = '__unset__';

				element._on = {
					onInput: (_event: Event, value?: unknown) => {
						testWindow.inputCallbackValue = value;
					},
					onChange: (_event: Event, value?: unknown) => {
						testWindow.changeCallbackValue = value;
					},
				};
				element.addEventListener('input', (event: Event) => {
					testWindow.inputEventValue = (event as CustomEvent).detail;
				});
				element.addEventListener('change', (event: Event) => {
					testWindow.changeEventValue = (event as CustomEvent).detail;
				});
			});

			await clearButton.click();
			await page.waitForChanges();

			await expect(await page.evaluate(() => (window as TestWindow).inputCallbackValue)).toBe('');
			await expect(await page.evaluate(() => (window as TestWindow).changeCallbackValue)).toBe('');
			await expect(await page.evaluate(() => (window as TestWindow).inputEventValue)).toBe('');
			await expect(await page.evaluate(() => (window as TestWindow).changeEventValue)).toBe('');
		});

		test('should fire input and change exactly once when clear button is clicked', async ({ page }) => {
			await page.setContent(SEARCH_WITH_VALUE);
			const component = page.locator('kol-input-text');
			const clearButton = page.getByTestId('kol-input-text-clear-button');

			await component.evaluate((element: HTMLKolInputTextElement) => {
				const recordedEvents: RecordedEvent[] = [];
				(window as TestWindow).recordedEvents = recordedEvents;

				const record = (event: Event) => {
					recordedEvents.push({ detail: (event as CustomEvent).detail, type: event.type });
				};
				element.addEventListener('input', record);
				element.addEventListener('change', record);
			});

			await clearButton.click();
			await page.waitForChanges();

			await expect(await page.evaluate(() => (window as TestWindow).recordedEvents)).toEqual([
				{ detail: '', type: 'input' },
				{ detail: '', type: 'change' },
			]);
		});

		test('should report the cleared value via getValue()', async ({ page }) => {
			await page.setContent(SEARCH_WITH_VALUE);
			const component = page.locator('kol-input-text');
			const clearButton = page.getByTestId('kol-input-text-clear-button');

			await clearButton.click();
			await page.waitForChanges();

			await expect(await component.evaluate((element: HTMLKolInputTextElement) => element.getValue())).toBe('');
		});

		test('should fire input and change with the cleared value after the user typed', async ({ page }) => {
			await page.setContent('<kol-input-text _label="Search" _type="search" _name="query"></kol-input-text>');
			const component = page.locator('kol-input-text');
			const input = page.locator('kol-input-text input');
			const clearButton = page.getByTestId('kol-input-text-clear-button');

			await component.evaluate((element: HTMLKolInputTextElement) => {
				const recordedEvents: RecordedEvent[] = [];
				(window as TestWindow).recordedEvents = recordedEvents;

				const record = (event: Event) => {
					recordedEvents.push({ detail: (event as CustomEvent).detail, type: event.type });
				};
				element.addEventListener('input', record);
				element.addEventListener('change', record);
			});

			await input.fill('test');
			await clearButton.click();
			await page.waitForChanges();

			/**
			 * Clicking the button moves focus out of the input, so the browser fires a native change with the old
			 * value beforehand. Only the final state matters here, hence the assertion on the last event of each type.
			 */
			const recordedEvents = (await page.evaluate(() => (window as TestWindow).recordedEvents)) ?? [];
			await expect(recordedEvents.filter(({ type }) => type === 'input').pop()).toEqual({ detail: '', type: 'input' });
			await expect(recordedEvents.filter(({ type }) => type === 'change').pop()).toEqual({ detail: '', type: 'change' });
		});

		test('should keep focus on the input after clearing', async ({ page }) => {
			await page.setContent(SEARCH_WITH_VALUE);
			const component = page.locator('kol-input-text');
			const clearButton = page.getByTestId('kol-input-text-clear-button');

			await clearButton.click();
			await page.waitForChanges();

			await expect(await component.evaluate((element: HTMLKolInputTextElement) => element.shadowRoot?.activeElement?.tagName)).toBe('INPUT');
		});
	});
});
