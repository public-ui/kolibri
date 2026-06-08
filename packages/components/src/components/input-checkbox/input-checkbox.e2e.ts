import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { testInputCallbacksAndEvents } from '../../e2e';
import { testInputMessage } from '../../e2e/input-msg';
import type { FillAction } from '../../e2e/utils/FillAction';

type WithAriaInternals = { internals?: { ariaDetailsElements?: Element[] }; getInternals?: () => { ariaDetailsElements?: Element[] } | undefined };

const COMPONENT_NAME = 'kol-input-checkbox';
const TEST_VALUE = true;
const fillAction: FillAction = async (page) => {
	await page.locator('input').check();
};
const OMITTED_EVENTS = ['click'];

test.describe(COMPONENT_NAME, () => {
	testInputCallbacksAndEvents<HTMLKolInputCheckboxElement>({
		componentName: COMPONENT_NAME,
		fillAction,
		omittedEvents: OMITTED_EVENTS,
		testValue: TEST_VALUE,
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
		test('resolves external element reference', async ({ page }) => {
			await page.setContent(`
				<kol-input-checkbox _label="Accept" _ariaDetails="terms-details"></kol-input-checkbox>
				<div id="terms-details">Terms and conditions apply</div>
			`);
			await page.waitForChanges();

			const input = page.locator('input[type="checkbox"]');
			const hasAriaDetailsSet = await input.evaluate((el) => {
				const internalsRef = (el as unknown as WithAriaInternals).internals ?? (el as unknown as WithAriaInternals).getInternals?.();
				return internalsRef?.ariaDetailsElements?.length > 0;
			});

			expect(hasAriaDetailsSet).toBe(true);
		});

		test('updates when prop changes', async ({ page }) => {
			await page.setContent(`
				<kol-input-checkbox _label="Test" _ariaDetails="details-1"></kol-input-checkbox>
				<div id="details-1">Details 1</div>
				<div id="details-2">Details 2</div>
			`);
			await page.waitForChanges();

			const component = page.locator(COMPONENT_NAME);
			const input = page.locator('input[type="checkbox"]');

			let ariaDetailsLength = await input.evaluate((el) => {
				const internalsRef = (el as unknown as WithAriaInternals).internals ?? (el as unknown as WithAriaInternals).getInternals?.();
				return internalsRef?.ariaDetailsElements?.length || 0;
			});
			expect(ariaDetailsLength).toBeGreaterThan(0);

			await component.evaluate((el: HTMLKolInputCheckboxElement) => {
				el._ariaDetails = 'details-2';
			});
			await page.waitForChanges();

			ariaDetailsLength = await input.evaluate((el) => {
				const internals = (el as unknown as WithAriaInternals).internals ?? (el as unknown as WithAriaInternals).getInternals?.();
				return internals?.ariaDetailsElements?.length || 0;
			});
			expect(ariaDetailsLength).toBeGreaterThan(0);
		});

		test('handles missing ID gracefully', async ({ page }) => {
			await page.setContent(`
				<kol-input-checkbox _label="Test" _ariaDetails="non-existent-id"></kol-input-checkbox>
			`);
			await page.waitForChanges();

			const input = page.locator('input[type="checkbox"]');
			const noErrorThrown = await input.evaluate((el) => {
				try {
					const internalsRef = (el as unknown as WithAriaInternals).internals ?? (el as unknown as WithAriaInternals).getInternals?.();
					return internalsRef !== undefined;
				} catch {
					return false;
				}
			});

			expect(noErrorThrown).toBe(true);
		});

		test('resolves multiple IDs (space-separated)', async ({ page }) => {
			await page.setContent(`
				<kol-input-checkbox _label="Test" _ariaDetails="id1 id2"></kol-input-checkbox>
				<div id="id1">Details 1</div>
				<div id="id2">Details 2</div>
			`);
			await page.waitForChanges();

			const input = page.locator('input[type="checkbox"]');
			const ariaDetailsCount = await input.evaluate((el) => {
				const internals = (el as unknown as WithAriaInternals).internals ?? (el as unknown as WithAriaInternals).getInternals?.();
				return internals?.ariaDetailsElements?.length || 0;
			});

			expect(ariaDetailsCount).toBeGreaterThanOrEqual(1);
		});
	});
});
