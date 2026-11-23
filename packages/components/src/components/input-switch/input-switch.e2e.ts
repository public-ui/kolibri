import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { callback, kolEvent, nativeEvent, testInputBehaviorContract } from '../../e2e/input-behavior-contract';
import { testInputMessage } from '../../e2e/input-msg';
import type { FillAction } from '../../e2e/utils/FillAction';
import { setContentWithRetry } from '../../e2e/utils/setContentWithRetry';

const COMPONENT_NAME = 'kol-input-switch';
const TEST_VALUE = true;
const fillAction: FillAction = async (page) => {
	await page.locator('input').check();
};

test.describe(COMPONENT_NAME, () => {
	test.describe('Callbacks and Events', () => {
		test('should call onFocus callback and emit focus event when input receives focus', async ({ page }) => {
			await setContentWithRetry(page, `<${COMPONENT_NAME} _label="Input"></${COMPONENT_NAME}>`);
			const component = page.locator(COMPONENT_NAME);
			const input = page.locator('input');

			await component.evaluate((element: HTMLKolInputSwitchElement) => {
				element._on = { onFocus: () => ((window as unknown as Record<string, unknown>).focusCallback = true) };
				element.addEventListener('focus', () => ((window as unknown as Record<string, unknown>).focusEvent = true));
			});

			await input.focus();
			await page.waitForChanges();

			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).focusCallback)).toBe(true);
			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).focusEvent)).toBe(true);
		});

		test('should call onBlur callback and emit blur event when input loses focus', async ({ page }) => {
			await setContentWithRetry(page, `<${COMPONENT_NAME} _label="Input"></${COMPONENT_NAME}><button id="next">Next</button>`);
			const component = page.locator(COMPONENT_NAME);
			const input = page.locator('input');
			const nextButton = page.locator('#next');

			await component.evaluate((element: HTMLKolInputSwitchElement) => {
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

		test('should call onInput callback and emit input event with value when switch is switched on', async ({ page }) => {
			await setContentWithRetry(page, `<${COMPONENT_NAME} _label="Input"></${COMPONENT_NAME}>`);
			const component = page.locator(COMPONENT_NAME);

			await component.evaluate((element: HTMLKolInputSwitchElement) => {
				element._on = { onInput: (_event: Event, value?: unknown) => ((window as unknown as Record<string, unknown>).inputValue = value) };
				element.addEventListener('input', (event: Event) => ((window as unknown as Record<string, unknown>).inputDetail = (event as CustomEvent).detail));
			});

			await fillAction(page);
			await page.waitForChanges();

			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).inputValue)).toBe(TEST_VALUE);
			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).inputDetail)).toBe(TEST_VALUE);
		});

		test('should call onChange callback and emit change event with value when switch is switched on', async ({ page }) => {
			await setContentWithRetry(page, `<${COMPONENT_NAME} _label="Input"></${COMPONENT_NAME}>`);
			const component = page.locator(COMPONENT_NAME);

			await component.evaluate((element: HTMLKolInputSwitchElement) => {
				element._on = { onChange: (_event: Event, value?: unknown) => ((window as unknown as Record<string, unknown>).changeValue = value) };
				element.addEventListener('change', (event: Event) => ((window as unknown as Record<string, unknown>).changeDetail = (event as CustomEvent).detail));
			});

			await fillAction(page);
			await page.waitForChanges();

			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).changeValue)).toBe(TEST_VALUE);
			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).changeDetail)).toBe(TEST_VALUE);
		});
	});

	testInputMessage<HTMLKolInputSwitchElement>(COMPONENT_NAME);

	test.describe('Value', () => {
		test('getValue() returns the value when switched on and null when switched off', async ({ page }) => {
			await setContentWithRetry(page, `<${COMPONENT_NAME} _label="Input" _value="yes" _checked></${COMPONENT_NAME}>`);
			const component = page.locator(COMPONENT_NAME);
			expect(await component.evaluate((element: HTMLKolInputSwitchElement) => element.getValue())).toBe('yes');

			await page.locator('input').click();
			await page.waitForChanges();

			expect(await component.evaluate((element: HTMLKolInputSwitchElement) => element.getValue())).toBeNull();
		});

		test('clears _checked on click', async ({ page }) => {
			await setContentWithRetry(page, `<${COMPONENT_NAME} _label="Input" _checked></${COMPONENT_NAME}>`);
			const component = page.locator(COMPONENT_NAME);

			await page.locator('input').click();
			await page.waitForChanges();

			expect(await component.evaluate((element: HTMLKolInputSwitchElement) => element._checked)).toBe(false);
		});
	});

	test('should render the native input with the ARIA role switch', async ({ page }) => {
		await page.setContent(`<${COMPONENT_NAME} _label="Input"></${COMPONENT_NAME}>`);

		expect(await page.locator('input').getAttribute('role')).toBe('switch');
	});

	test(`should reflect the _checked property on the web component`, async ({ page }) => {
		const getCheckedProperty = () => page.locator(COMPONENT_NAME).evaluate((element: HTMLKolInputSwitchElement) => element._checked);
		await page.setContent(`<${COMPONENT_NAME} _label="Input"></${COMPONENT_NAME}>`);

		expect(await getCheckedProperty()).toBe(false);
		await fillAction(page);
		expect(await getCheckedProperty()).toBe(true);
	});

	test(`should set focus on the internal input element via focus() method`, async ({ page }) => {
		await page.setContent(`<${COMPONENT_NAME} _label="Switch"></${COMPONENT_NAME}>`);

		const component = page.locator(COMPONENT_NAME);
		const input = page.locator('input');

		// Call the focus() method on the component
		await component.evaluate((element: HTMLKolInputSwitchElement) => element.focus());

		// Verify the input element has focus
		const isFocused = await input.evaluate((el) => el === document.activeElement || (el.getRootNode() as ShadowRoot | Document).activeElement === el);
		expect(isFocused).toBe(true);
	});

	test(`should allow Tab navigation to reach internal input`, async ({ page }) => {
		await page.setContent(`<button>Before</button><${COMPONENT_NAME} _label="Switch"></${COMPONENT_NAME}><button>After</button>`);

		const beforeButton = page.locator('button').first();
		const input = page.locator('input');

		// Focus on the "Before" button
		await beforeButton.focus();
		await page.waitForChanges();

		// Press Tab to move to switch
		await page.keyboard.press('Tab');
		await page.waitForChanges();

		// Verify the internal input has focus
		const isFocused = await input.evaluate((el) => el === document.activeElement || (el.getRootNode() as ShadowRoot | Document).activeElement === el);
		expect(isFocused).toBe(true);
	});

	test(`should not fire blur when clicking label text while switch is already focused`, async ({ page }) => {
		await page.setContent(`<${COMPONENT_NAME} _label="Switch"></${COMPONENT_NAME}>`);

		const component = page.locator(COMPONENT_NAME);

		// Focus the switch
		await component.evaluate((el: HTMLKolInputSwitchElement) => el.focus());
		await page.waitForChanges();

		// Dispatch mousedown directly on the shadow-DOM text label and verify that
		// preventDefault() is called. This prevents the browser from triggering the
		// blur→focus cycle that would occur when the label's htmlFor target is already focused.
		const defaultPrevented = await page.evaluate(() => {
			const host = document.querySelector('kol-input-switch');
			const label = host?.shadowRoot?.querySelector('label.kol-field-control__label');
			if (!label) return null;
			const event = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
			label.dispatchEvent(event);
			return event.defaultPrevented;
		});

		expect(defaultPrevented).toBe(true);
	});

	test.describe('_ariaDetails', () => {
		test('accepts valid element reference', async ({ page }) => {
			await page.setContent(`
				<${COMPONENT_NAME} _label="Accept" _aria-details="terms-details"></${COMPONENT_NAME}>
				<div id="terms-details">Terms and conditions apply</div>
			`);
			await page.waitForChanges();

			const value = await page.locator(COMPONENT_NAME).evaluate((el: HTMLKolInputSwitchElement) => el._ariaDetails);
			expect(value).toBe('terms-details');
		});

		test('updates when prop changes', async ({ page }) => {
			await page.setContent(`
				<${COMPONENT_NAME} _label="Test" _aria-details="details-1"></${COMPONENT_NAME}>
				<div id="details-1">Details 1</div>
				<div id="details-2">Details 2</div>
			`);
			await page.waitForChanges();

			const host = page.locator(COMPONENT_NAME);
			expect(await host.evaluate((el: HTMLKolInputSwitchElement) => el._ariaDetails)).toBe('details-1');

			await host.evaluate((el: HTMLKolInputSwitchElement) => {
				el._ariaDetails = 'details-2';
			});
			await page.waitForChanges();

			expect(await host.evaluate((el: HTMLKolInputSwitchElement) => el._ariaDetails)).toBe('details-2');
		});
	});

	testInputBehaviorContract<HTMLKolInputSwitchElement>({
		componentName: COMPONENT_NAME,
		fillAction: async (input) => {
			await input.check();
		},
		inputSelector: 'input.kol-checkbox__input',
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
			initialValue: true,
			formData: [],
			experimentalFormData: [['field', 'true']],
			syncedValue: 'true',
		},
	});
});
