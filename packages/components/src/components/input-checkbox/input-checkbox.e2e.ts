import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { testInputMessage } from '../../e2e/input-msg';
import type { FillAction } from '../../e2e/utils/FillAction';
import { setContentWithRetry } from '../../e2e/utils/setContentWithRetry';

const COMPONENT_NAME = 'kol-input-checkbox';
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

			await component.evaluate((element: HTMLKolInputCheckboxElement) => {
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

			await component.evaluate((element: HTMLKolInputCheckboxElement) => {
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

		test('should call onInput callback and emit input event with value when checkbox is checked', async ({ page }) => {
			await setContentWithRetry(page, `<${COMPONENT_NAME} _label="Input"></${COMPONENT_NAME}>`);
			const component = page.locator(COMPONENT_NAME);

			await component.evaluate((element: HTMLKolInputCheckboxElement) => {
				element._on = { onInput: (_event: Event, value?: unknown) => ((window as unknown as Record<string, unknown>).inputValue = value) };
				element.addEventListener('input', (event: Event) => ((window as unknown as Record<string, unknown>).inputDetail = (event as CustomEvent).detail));
			});

			await fillAction(page);
			await page.waitForChanges();

			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).inputValue)).toBe(TEST_VALUE);
			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).inputDetail)).toBe(TEST_VALUE);
		});

		test('should call onChange callback and emit change event with value when checkbox is checked', async ({ page }) => {
			await setContentWithRetry(page, `<${COMPONENT_NAME} _label="Input"></${COMPONENT_NAME}>`);
			const component = page.locator(COMPONENT_NAME);

			await component.evaluate((element: HTMLKolInputCheckboxElement) => {
				element._on = { onChange: (_event: Event, value?: unknown) => ((window as unknown as Record<string, unknown>).changeValue = value) };
				element.addEventListener('change', (event: Event) => ((window as unknown as Record<string, unknown>).changeDetail = (event as CustomEvent).detail));
			});

			await fillAction(page);
			await page.waitForChanges();

			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).changeValue)).toBe(TEST_VALUE);
			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).changeDetail)).toBe(TEST_VALUE);
		});
	});

	testInputMessage<HTMLKolInputCheckboxElement>(COMPONENT_NAME);

	test(`should reflect the _checked property on the web component`, async ({ page }) => {
		const getCheckedProperty = () => page.locator(COMPONENT_NAME).evaluate((element: HTMLKolInputCheckboxElement) => element._checked);
		await page.setContent(`<kol-input-checkbox _label="Input"></kol-input-checkbox>`);

		expect(await getCheckedProperty()).toBe(false);
		await fillAction(page);
		expect(await getCheckedProperty()).toBe(true);
	});

	test(`should set focus on the internal input element via focus() method`, async ({ page }) => {
		await page.setContent(`<kol-input-checkbox _label="Checkbox"></kol-input-checkbox>`);

		const component = page.locator(COMPONENT_NAME);
		const input = page.locator('input');

		// Call the focus() method on the component
		await component.evaluate((element: HTMLKolInputCheckboxElement) => element.focus());

		// Verify the input element has focus
		const isFocused = await input.evaluate((el) => el === document.activeElement || (el.getRootNode() as ShadowRoot | Document).activeElement === el);
		expect(isFocused).toBe(true);
	});

	test(`should focus internal input when clicking on host element`, async ({ page }) => {
		await page.setContent(`<button>Before</button><kol-input-checkbox _label="Checkbox"></kol-input-checkbox><button>After</button>`);

		const component = page.locator(COMPONENT_NAME);
		const input = page.locator('input');

		// Click on the component host element
		await component.click();
		await page.waitForChanges();

		// Verify the internal input has focus
		const isFocused = await input.evaluate((el) => el === document.activeElement || (el.getRootNode() as ShadowRoot | Document).activeElement === el);
		expect(isFocused).toBe(true);
	});

	test(`should allow Tab navigation to reach internal input`, async ({ page }) => {
		await page.setContent(`<button>Before</button><kol-input-checkbox _label="Checkbox"></kol-input-checkbox><button>After</button>`);

		const beforeButton = page.locator('button').first();
		const input = page.locator('input');

		// Focus on the "Before" button
		await beforeButton.focus();
		await page.waitForChanges();

		// Press Tab to move to checkbox
		await page.keyboard.press('Tab');
		await page.waitForChanges();

		// Verify the internal input has focus
		const isFocused = await input.evaluate((el) => el === document.activeElement || (el.getRootNode() as ShadowRoot | Document).activeElement === el);
		expect(isFocused).toBe(true);
	});

	test(`should not fire blur when clicking label text while checkbox is already focused`, async ({ page }) => {
		await page.setContent(`<kol-input-checkbox _label="Checkbox"></kol-input-checkbox>`);

		const component = page.locator(COMPONENT_NAME);

		// Focus the checkbox
		await component.evaluate((el: HTMLKolInputCheckboxElement) => el.focus());
		await page.waitForChanges();

		// Dispatch mousedown directly on the shadow-DOM text label and verify that
		// preventDefault() is called. This prevents the browser from triggering the
		// blur→focus cycle that would occur when the label's htmlFor target is already focused.
		const defaultPrevented = await page.evaluate(() => {
			const host = document.querySelector('kol-input-checkbox');
			const label = host?.shadowRoot?.querySelector('label.kol-field-control__label');
			if (!label) return null;
			const event = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
			label.dispatchEvent(event);
			return event.defaultPrevented;
		});

		expect(defaultPrevented).toBe(true);
	});

	test(`should not fire blur when clicking the checkbox icon while already focused`, async ({ page }) => {
		await page.setContent(`<kol-input-checkbox _label="Checkbox"></kol-input-checkbox>`);

		const component = page.locator(COMPONENT_NAME);

		// Focus the checkbox
		await component.evaluate((el: HTMLKolInputCheckboxElement) => el.focus());
		await page.waitForChanges();

		// The icon element has pointer-events: none in CSS, so real pointer events land on the
		// enclosing kol-checkbox label. Dispatch mousedown on that label and verify that
		// preventDefault() is called, preventing a spurious blur→focus cycle.
		const defaultPrevented = await page.evaluate(() => {
			const host = document.querySelector('kol-input-checkbox');
			const checkboxLabel = host?.shadowRoot?.querySelector('label.kol-checkbox');
			if (!checkboxLabel) return null;
			const event = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
			checkboxLabel.dispatchEvent(event);
			return event.defaultPrevented;
		});

		expect(defaultPrevented).toBe(true);
	});

	test.describe('_ariaDetails', () => {
		test('accepts valid element reference', async ({ page }) => {
			await page.setContent(`
				<kol-input-checkbox _label="Accept" _aria-details="terms-details"></kol-input-checkbox>
				<div id="terms-details">Terms and conditions apply</div>
			`);
			await page.waitForChanges();

			const value = await page.locator(COMPONENT_NAME).evaluate((el: HTMLKolInputCheckboxElement) => el._ariaDetails);
			expect(value).toBe('terms-details');
		});

		test('updates when prop changes', async ({ page }) => {
			await page.setContent(`
				<kol-input-checkbox _label="Test" _aria-details="details-1"></kol-input-checkbox>
				<div id="details-1">Details 1</div>
				<div id="details-2">Details 2</div>
			`);
			await page.waitForChanges();

			const host = page.locator(COMPONENT_NAME);
			expect(await host.evaluate((el: HTMLKolInputCheckboxElement) => el._ariaDetails)).toBe('details-1');

			await host.evaluate((el: HTMLKolInputCheckboxElement) => {
				el._ariaDetails = 'details-2';
			});
			await page.waitForChanges();

			expect(await host.evaluate((el: HTMLKolInputCheckboxElement) => el._ariaDetails)).toBe('details-2');
		});

		test('handles missing ID gracefully', async ({ page }) => {
			await page.setContent(`
				<kol-input-checkbox _label="Test" _aria-details="non-existent-id"></kol-input-checkbox>
			`);
			await page.waitForChanges();

			const value = await page.locator(COMPONENT_NAME).evaluate((el: HTMLKolInputCheckboxElement) => el._ariaDetails);
			expect(value).toBe('non-existent-id');
		});

		test('accepts multiple IDs (space-separated)', async ({ page }) => {
			await page.setContent(`
				<kol-input-checkbox _label="Test" _aria-details="id1 id2"></kol-input-checkbox>
				<div id="id1">Details 1</div>
				<div id="id2">Details 2</div>
			`);
			await page.waitForChanges();

			const value = await page.locator(COMPONENT_NAME).evaluate((el: HTMLKolInputCheckboxElement) => el._ariaDetails);
			expect(value).toBe('id1 id2');
		});
	});
});
