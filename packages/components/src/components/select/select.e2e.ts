import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { testInputValueReflection } from '../../e2e';
import { callback, kolEvent, nativeEvent, testInputBehaviorContract } from '../../e2e/input-behavior-contract';
import { testInputMessage } from '../../e2e/input-msg';
import type { FillAction } from '../../e2e/utils/FillAction';
import { setContentWithRetry } from '../../e2e/utils/setContentWithRetry';

const COMPONENT_NAME = 'kol-select';
const TEST_VALUE = 'E';
const TEST_LABEL = 'East';
const OPTIONS = [
	{ label: 'North', value: 'N' },
	{ label: 'South', value: 'S' },
	{ label: 'West', value: 'W' },
	{ label: 'East', value: 'E' },
];
const OPTIONS_ATTRIBUTE = `_options='${JSON.stringify(OPTIONS)}'`;
const fillAction: FillAction = async (page) => {
	await page.locator('select').selectOption({ label: TEST_LABEL });
};

test.describe(COMPONENT_NAME, () => {
	testInputValueReflection<HTMLKolSelectElement>({
		additionalProperties: OPTIONS_ATTRIBUTE,
		componentName: COMPONENT_NAME,
		equalityCheck: 'toEqual',
		fillAction,
		testValue: TEST_VALUE,
	});

	test.describe('Callbacks and Events', () => {
		test('should call onFocus callback and emit focus event when select receives focus', async ({ page }) => {
			await setContentWithRetry(page, `<${COMPONENT_NAME} _label="Input" ${OPTIONS_ATTRIBUTE}></${COMPONENT_NAME}>`);
			const component = page.locator(COMPONENT_NAME);
			const input = page.locator('select');

			await component.evaluate((element: HTMLKolSelectElement) => {
				element._on = { onFocus: () => ((window as unknown as Record<string, unknown>).focusCallback = true) };
				element.addEventListener('focus', () => ((window as unknown as Record<string, unknown>).focusEvent = true));
			});

			await input.focus();
			await page.waitForChanges();

			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).focusCallback)).toBe(true);
			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).focusEvent)).toBe(true);
		});

		test('should call onBlur callback and emit blur event when select loses focus', async ({ page }) => {
			await setContentWithRetry(page, `<${COMPONENT_NAME} _label="Input" ${OPTIONS_ATTRIBUTE}></${COMPONENT_NAME}><button id="next">Next</button>`);
			const component = page.locator(COMPONENT_NAME);
			const input = page.locator('select');
			const nextButton = page.locator('#next');

			await component.evaluate((element: HTMLKolSelectElement) => {
				element._on = { onBlur: () => ((window as unknown as Record<string, unknown>).blurCallback = true) };
				element.addEventListener('blur', () => ((window as unknown as Record<string, unknown>).blurEvent = true));
			});

			await input.focus();
			await page.waitForChanges();
			await nextButton.focus();
			await page.waitForChanges();

			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).blurCallback)).toBe(true);
			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).blurEvent)).toBe(true);
		});

		test('should call onClick callback and emit click event when select is clicked', async ({ page }) => {
			await setContentWithRetry(page, `<${COMPONENT_NAME} _label="Input" ${OPTIONS_ATTRIBUTE}></${COMPONENT_NAME}>`);
			const component = page.locator(COMPONENT_NAME);
			const input = page.locator('select');

			await component.evaluate((element: HTMLKolSelectElement) => {
				element._on = { onClick: () => ((window as unknown as Record<string, unknown>).clickCallback = true) };
				element.addEventListener('click', () => ((window as unknown as Record<string, unknown>).clickEvent = true));
			});

			await input.click();
			await page.waitForChanges();

			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).clickCallback)).toBe(true);
			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).clickEvent)).toBe(true);
		});

		test('should call onInput callback and emit input event with value when an option is selected', async ({ page }) => {
			await setContentWithRetry(page, `<${COMPONENT_NAME} _label="Input" ${OPTIONS_ATTRIBUTE}></${COMPONENT_NAME}>`);
			const component = page.locator(COMPONENT_NAME);
			const input = page.locator('select');

			await component.evaluate((element: HTMLKolSelectElement) => {
				element._on = { onInput: (_event: Event, value?: unknown) => ((window as unknown as Record<string, unknown>).inputValue = value) };
				element.addEventListener('input', (event: Event) => ((window as unknown as Record<string, unknown>).inputDetail = (event as CustomEvent).detail));
			});

			await input.selectOption({ label: TEST_LABEL });
			await page.waitForChanges();

			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).inputValue)).toEqual(TEST_VALUE);
			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).inputDetail)).toEqual(TEST_VALUE);
		});

		test('should call onChange callback and emit change event with value when an option is selected', async ({ page }) => {
			await setContentWithRetry(page, `<${COMPONENT_NAME} _label="Input" ${OPTIONS_ATTRIBUTE}></${COMPONENT_NAME}>`);
			const component = page.locator(COMPONENT_NAME);
			const input = page.locator('select');

			await component.evaluate((element: HTMLKolSelectElement) => {
				element._on = { onChange: (_event: Event, value?: unknown) => ((window as unknown as Record<string, unknown>).changeValue = value) };
				element.addEventListener('change', (event: Event) => ((window as unknown as Record<string, unknown>).changeDetail = (event as CustomEvent).detail));
			});

			await input.selectOption({ label: TEST_LABEL });
			await page.waitForChanges();

			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).changeValue)).toEqual(TEST_VALUE);
			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).changeDetail)).toEqual(TEST_VALUE);
		});
	});

	testInputMessage<HTMLKolSelectElement>(COMPONENT_NAME);

	testInputBehaviorContract<HTMLKolSelectElement>({
		additionalProperties: OPTIONS_ATTRIBUTE,
		componentName: COMPONENT_NAME,
		fillAction: async (input) => {
			await input.selectOption({ label: TEST_LABEL });
		},
		inputSelector: 'select.kol-select',
		pinned: {
			edit: [
				kolEvent('focus'),
				callback('focus'),
				nativeEvent('focus'),
				kolEvent('input', TEST_VALUE),
				callback('input', TEST_VALUE),
				kolEvent('change', TEST_VALUE),
				callback('change', TEST_VALUE),
				kolEvent('blur'),
				callback('blur'),
				nativeEvent('blur'),
			],
			click: [kolEvent('focus'), callback('focus'), nativeEvent('focus'), kolEvent('click'), callback('click'), nativeEvent('click')],
			keydown: [kolEvent('focus'), callback('focus'), nativeEvent('focus'), kolEvent('keydown'), callback('keydown'), nativeEvent('keydown')],
			touchedAfterBlur: false,
			initialValue: undefined,
			formData: [],
			experimentalFormData: [],
			syncedValue: '',
		},
	});

	testInputBehaviorContract<HTMLKolSelectElement>({
		additionalProperties: `${OPTIONS_ATTRIBUTE} _multiple`,
		componentName: COMPONENT_NAME,
		fillAction: async (input) => {
			await input.selectOption([{ label: 'East' }, { label: 'West' }]);
		},
		inputSelector: 'select.kol-select',
		pinned: {
			edit: [
				kolEvent('focus'),
				callback('focus'),
				nativeEvent('focus'),
				kolEvent('input', ['W', 'E']),
				callback('input', ['W', 'E']),
				kolEvent('change', ['W', 'E']),
				callback('change', ['W', 'E']),
				kolEvent('blur'),
				callback('blur'),
				nativeEvent('blur'),
			],
			click: [
				kolEvent('focus'),
				callback('focus'),
				nativeEvent('focus'),
				kolEvent('input', ['W']),
				callback('input', ['W']),
				kolEvent('change', ['W']),
				callback('change', ['W']),
				kolEvent('click'),
				callback('click'),
				nativeEvent('click'),
			],
			keydown: [kolEvent('focus'), callback('focus'), nativeEvent('focus'), kolEvent('keydown'), callback('keydown'), nativeEvent('keydown')],
			touchedAfterBlur: false,
			initialValue: undefined,
			formData: [],
			experimentalFormData: [
				['field', 'W'],
				['field', 'E'],
			],
			syncedValue: '',
		},
		variant: '_multiple',
	});
});
