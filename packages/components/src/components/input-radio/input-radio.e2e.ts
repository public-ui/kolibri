import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { testInputValueReflection } from '../../e2e';
import { callback, kolEvent, nativeEvent, testInputBehaviorContract } from '../../e2e/input-behavior-contract';
import { testInputMessage } from '../../e2e/input-msg';
import type { FillAction } from '../../e2e/utils/FillAction';
import { setContentWithRetry } from '../../e2e/utils/setContentWithRetry';

const COMPONENT_NAME = 'kol-input-radio';
const TEST_VALUE = 'test-value';
const OPTIONS = [
	{ label: 'Option 1', value: TEST_VALUE },
	{ label: 'Option 2', value: 'option-2' },
];
const OPTIONS_ATTRIBUTE = `_options='${JSON.stringify(OPTIONS)}'`;
const OBJECT_OPTIONS = [
	{ label: 'Option 1', value: { id: 1 } },
	{ label: 'Option 2', value: { id: 2 } },
];
const OBJECT_OPTIONS_ATTRIBUTE = `_options='${JSON.stringify(OBJECT_OPTIONS)}'`;
/** Index of the focused radio input inside the shadow root, or -1 when none has the focus. */
const focusedIndex = (page: Parameters<FillAction>[0]) =>
	page.locator(COMPONENT_NAME).evaluate((element: HTMLKolInputRadioElement) => {
		const active = element.shadowRoot?.activeElement;
		return active ? Array.from(element.shadowRoot.querySelectorAll('input')).indexOf(active as HTMLInputElement) : -1;
	});
const fillAction: FillAction = async (page) => {
	await page.locator('input').first().check();
};

test.describe(COMPONENT_NAME, () => {
	testInputValueReflection<HTMLKolInputRadioElement>({
		additionalProperties: OPTIONS_ATTRIBUTE,
		componentName: COMPONENT_NAME,
		fillAction,
		testValue: TEST_VALUE,
	});

	test.describe('Callbacks and Events', () => {
		test('should call onFocus callback and emit focus event when input receives focus', async ({ page }) => {
			await setContentWithRetry(page, `<${COMPONENT_NAME} _label="Input" ${OPTIONS_ATTRIBUTE}></${COMPONENT_NAME}>`);
			const component = page.locator(COMPONENT_NAME);
			const input = page.locator('input').first();

			await component.evaluate((element: HTMLKolInputRadioElement) => {
				element._on = { onFocus: () => ((window as unknown as Record<string, unknown>).focusCallback = true) };
				element.addEventListener('focus', () => ((window as unknown as Record<string, unknown>).focusEvent = true));
			});

			await input.focus();
			await page.waitForChanges();

			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).focusCallback)).toBe(true);
			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).focusEvent)).toBe(true);
		});

		test('should call onBlur callback and emit blur event when input loses focus', async ({ page }) => {
			await setContentWithRetry(page, `<${COMPONENT_NAME} _label="Input" ${OPTIONS_ATTRIBUTE}></${COMPONENT_NAME}><button id="next">Next</button>`);
			const component = page.locator(COMPONENT_NAME);
			const input = page.locator('input').first();
			const nextButton = page.locator('#next');

			await component.evaluate((element: HTMLKolInputRadioElement) => {
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

		test('should call onInput callback and emit input event with value when a radio is checked', async ({ page }) => {
			await setContentWithRetry(page, `<${COMPONENT_NAME} _label="Input" ${OPTIONS_ATTRIBUTE}></${COMPONENT_NAME}>`);
			const component = page.locator(COMPONENT_NAME);

			await component.evaluate((element: HTMLKolInputRadioElement) => {
				element._on = { onInput: (_event: Event, value?: unknown) => ((window as unknown as Record<string, unknown>).inputValue = value) };
				element.addEventListener('input', (event: Event) => ((window as unknown as Record<string, unknown>).inputDetail = (event as CustomEvent).detail));
			});

			await fillAction(page);
			await page.waitForChanges();

			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).inputValue)).toBe(TEST_VALUE);
			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).inputDetail)).toBe(TEST_VALUE);
		});

		test('should call onChange callback and emit change event with value when a radio is checked', async ({ page }) => {
			await setContentWithRetry(page, `<${COMPONENT_NAME} _label="Input" ${OPTIONS_ATTRIBUTE}></${COMPONENT_NAME}>`);
			const component = page.locator(COMPONENT_NAME);

			await component.evaluate((element: HTMLKolInputRadioElement) => {
				element._on = { onChange: (_event: Event, value?: unknown) => ((window as unknown as Record<string, unknown>).changeValue = value) };
				element.addEventListener('change', (event: Event) => ((window as unknown as Record<string, unknown>).changeDetail = (event as CustomEvent).detail));
			});

			await fillAction(page);
			await page.waitForChanges();

			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).changeValue)).toBe(TEST_VALUE);
			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).changeDetail)).toBe(TEST_VALUE);
		});
	});

	testInputMessage<HTMLKolInputRadioElement>(COMPONENT_NAME);

	test.describe('Keyboard navigation', () => {
		const ABC = `_options='${JSON.stringify([
			{ label: 'A', value: 'a' },
			{ label: 'B', value: 'b' },
			{ label: 'C', value: 'c' },
		])}'`;

		const logEvents = async (page: Parameters<FillAction>[0]) => {
			await page.locator(COMPONENT_NAME).evaluate((element: HTMLKolInputRadioElement) => {
				const log: string[] = [];
				(window as unknown as Record<string, unknown>).radioEvents = log;
				['input', 'change'].forEach((type) => element.addEventListener(type, (event) => log.push(`${type}:${String((event as CustomEvent).detail)}`)));
			});
		};

		test('selects the next option with ArrowDown and emits input and change', async ({ page }) => {
			await setContentWithRetry(page, `<${COMPONENT_NAME} _label="Input" _value="a" ${ABC}></${COMPONENT_NAME}>`);
			await logEvents(page);
			await page.locator('input').first().focus();

			await page.keyboard.press('ArrowDown');
			await page.waitForChanges();

			expect(await page.locator(COMPONENT_NAME).evaluate((element: HTMLKolInputRadioElement) => element._value)).toBe('b');
			expect(await focusedIndex(page)).toBe(1);
			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).radioEvents)).toEqual(['input:b', 'change:b']);
		});

		test('wraps to the last option with ArrowUp', async ({ page }) => {
			await setContentWithRetry(page, `<${COMPONENT_NAME} _label="Input" _value="a" ${ABC}></${COMPONENT_NAME}>`);
			await page.locator('input').first().focus();

			await page.keyboard.press('ArrowUp');
			await page.waitForChanges();

			expect(await page.locator(COMPONENT_NAME).evaluate((element: HTMLKolInputRadioElement) => element._value)).toBe('c');
			expect(await focusedIndex(page)).toBe(2);
		});

		test('skips a disabled option', async ({ page }) => {
			const options = `_options='${JSON.stringify([
				{ label: 'A', value: 'a' },
				{ disabled: true, label: 'B', value: 'b' },
				{ label: 'C', value: 'c' },
			])}'`;
			await setContentWithRetry(page, `<${COMPONENT_NAME} _label="Input" _value="a" ${options}></${COMPONENT_NAME}>`);
			await page.locator('input').first().focus();

			await page.keyboard.press('ArrowDown');
			await page.waitForChanges();

			expect(await page.locator(COMPONENT_NAME).evaluate((element: HTMLKolInputRadioElement) => element._value)).toBe('c');
		});
	});

	test.describe('focus() and click()', () => {
		test('focus() focuses the selected option', async ({ page }) => {
			await setContentWithRetry(page, `<${COMPONENT_NAME} _label="Input" _value="option-2" ${OPTIONS_ATTRIBUTE}></${COMPONENT_NAME}>`);

			await page.locator(COMPONENT_NAME).evaluate((element: HTMLKolInputRadioElement) => element.focus());
			await page.waitForChanges();

			expect(await focusedIndex(page)).toBe(1);
		});

		test('focus() focuses the first enabled option without a selection', async ({ page }) => {
			const options = `_options='${JSON.stringify([
				{ disabled: true, label: 'A', value: 'a' },
				{ label: 'B', value: 'b' },
			])}'`;
			await setContentWithRetry(page, `<${COMPONENT_NAME} _label="Input" ${options}></${COMPONENT_NAME}>`);

			await page.locator(COMPONENT_NAME).evaluate((element: HTMLKolInputRadioElement) => element.focus());
			await page.waitForChanges();

			expect(await focusedIndex(page)).toBe(1);
		});

		test('click() without a selection selects nothing', async ({ page }) => {
			await setContentWithRetry(page, `<${COMPONENT_NAME} _label="Input" ${OPTIONS_ATTRIBUTE}></${COMPONENT_NAME}>`);

			await page.locator(COMPONENT_NAME).evaluate((element: HTMLKolInputRadioElement) => element.click());
			await page.waitForChanges();

			expect(await page.locator(COMPONENT_NAME).evaluate((element: HTMLKolInputRadioElement) => element._value)).toBeNull();
		});
	});

	test.describe('value to option matching', () => {
		const OBJECT_FIRST = { id: 1, text: 'first' };
		const OBJECT_SECOND = { id: 2, text: 'second' };

		const TEST_CASES = [
			{
				name: 'string value',
				options: [
					{ label: 'Option 1', value: 'string1' },
					{ label: 'Option 2', value: 'string2' },
				],
				value: 'string1',
			},
			{
				name: 'number value',
				options: [
					{ label: 'Option 1', value: 1 },
					{ label: 'Option 2', value: 2 },
				],
				value: 1,
			},
			{
				name: 'object value',
				options: [
					{ label: 'Option 1', value: OBJECT_FIRST },
					{ label: 'Option 2', value: OBJECT_SECOND },
				],
				value: OBJECT_FIRST,
			},
		];

		TEST_CASES.forEach(({ name, options, value }) => {
			test(`should match option with ${name}`, async ({ page }) => {
				await page.setContent(`<kol-input-radio	_label="Radio Group"></kol-input-radio>`);
				const kolInputRadio = page.locator('kol-input-radio');

				await kolInputRadio.evaluate(
					(kolInputRadio: HTMLKolInputRadioElement, { options, value }) => {
						if (kolInputRadio) {
							kolInputRadio._options = options;
							kolInputRadio._value = value;
						}
					},
					{ options, value },
				);

				const firstOption = kolInputRadio.locator('input[type="radio"]').first();
				await expect(firstOption).toBeChecked();
			});
		});
	});

	testInputBehaviorContract<HTMLKolInputRadioElement>({
		additionalProperties: OPTIONS_ATTRIBUTE,
		componentName: COMPONENT_NAME,
		fillAction: async (input) => {
			await input.check();
		},
		inputSelector: 'input.kol-input-radio__input >> nth=0',
		pinned: {
			edit: [
				kolEvent('focus'),
				callback('focus'),
				nativeEvent('focus'),
				nativeEvent('click'),
				kolEvent('input', TEST_VALUE),
				callback('input', TEST_VALUE),
				kolEvent('change', TEST_VALUE),
				callback('change', TEST_VALUE),
				kolEvent('blur'),
				callback('blur'),
				nativeEvent('blur'),
			],
			click: [
				kolEvent('focus'),
				callback('focus'),
				nativeEvent('focus'),
				nativeEvent('click'),
				kolEvent('input', TEST_VALUE),
				callback('input', TEST_VALUE),
				kolEvent('change', TEST_VALUE),
				callback('change', TEST_VALUE),
			],
			keydown: [kolEvent('focus'), callback('focus'), nativeEvent('focus'), kolEvent('keydown'), callback('keydown'), nativeEvent('keydown')],
			touchedAfterBlur: true,
			initialValue: null,
			formData: [],
			experimentalFormData: [['field', TEST_VALUE]],
			syncedValue: TEST_VALUE,
		},
	});

	testInputBehaviorContract<HTMLKolInputRadioElement>({
		additionalProperties: OBJECT_OPTIONS_ATTRIBUTE,
		componentName: COMPONENT_NAME,
		fillAction: async (input) => {
			await input.check();
		},
		inputSelector: 'input.kol-input-radio__input >> nth=0',
		pinned: {
			edit: [
				kolEvent('focus'),
				callback('focus'),
				nativeEvent('focus'),
				nativeEvent('click'),
				kolEvent('input', OBJECT_OPTIONS[0].value),
				callback('input', OBJECT_OPTIONS[0].value),
				kolEvent('change', OBJECT_OPTIONS[0].value),
				callback('change', OBJECT_OPTIONS[0].value),
				kolEvent('blur'),
				callback('blur'),
				nativeEvent('blur'),
			],
			click: [
				kolEvent('focus'),
				callback('focus'),
				nativeEvent('focus'),
				nativeEvent('click'),
				kolEvent('input', OBJECT_OPTIONS[0].value),
				callback('input', OBJECT_OPTIONS[0].value),
				kolEvent('change', OBJECT_OPTIONS[0].value),
				callback('change', OBJECT_OPTIONS[0].value),
			],
			keydown: [kolEvent('focus'), callback('focus'), nativeEvent('focus'), kolEvent('keydown'), callback('keydown'), nativeEvent('keydown')],
			touchedAfterBlur: true,
			initialValue: null,
			formData: [],
			experimentalFormData: [['field', '{"id":1}']],
			syncedValue: '{"id":1}',
		},
		variant: 'object values',
	});
});
