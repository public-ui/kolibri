import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { type E2EPage, test } from '@stencil/playwright';
import { testInputValueReflection } from '../../e2e';
import { testInputMessage } from '../../e2e/input-msg';
import type { FillAction } from '../../e2e/utils/FillAction';
import { setContentWithRetry } from '../../e2e/utils/setContentWithRetry';

const COMPONENT_NAME = 'kol-input-color';
const TEST_VALUE = '#cc006e';
const fillAction: FillAction = async (page) => {
	const colorInput = page.locator('input[type="color"]');
	await colorInput.fill(TEST_VALUE);
	await colorInput.dispatchEvent('input');
};
const selectcolorInput = (page: Page & E2EPage) => page.locator('input[type="color"]');

test.describe(COMPONENT_NAME, () => {
	testInputValueReflection<HTMLKolInputColorElement>({
		componentName: COMPONENT_NAME,
		fillAction,
		testValue: TEST_VALUE,
	});

	test.describe('Callbacks and Events', () => {
		test('should call onFocus callback and emit focus event when input receives focus', async ({ page }) => {
			await setContentWithRetry(page, `<${COMPONENT_NAME} _label="Color Picker"></${COMPONENT_NAME}>`);
			const component = page.locator(COMPONENT_NAME);
			const colorInput = selectcolorInput(page);

			await component.evaluate((element: HTMLKolInputColorElement) => {
				element._on = { onFocus: () => ((window as unknown as Record<string, unknown>).focusCallback = true) };
				element.addEventListener('focus', () => ((window as unknown as Record<string, unknown>).focusEvent = true));
			});

			await colorInput.focus();
			await page.waitForChanges();

			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).focusCallback)).toBe(true);
			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).focusEvent)).toBe(true);
		});

		test('should call onBlur callback and emit blur event when input loses focus', async ({ page }) => {
			await setContentWithRetry(page, `<${COMPONENT_NAME} _label="Color Picker"></${COMPONENT_NAME}><button id="next">Next</button>`);
			const component = page.locator(COMPONENT_NAME);
			const colorInput = selectcolorInput(page);
			const nextButton = page.locator('#next');

			await component.evaluate((element: HTMLKolInputColorElement) => {
				element._on = { onBlur: () => ((window as unknown as Record<string, unknown>).blurCallback = true) };
				element.addEventListener('blur', () => ((window as unknown as Record<string, unknown>).blurEvent = true));
			});

			await colorInput.focus();
			await page.waitForChanges();
			await nextButton.focus();
			await page.waitForChanges();

			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).blurCallback)).toBe(true);
			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).blurEvent)).toBe(true);
		});

		test('should call onClick callback and emit click event when input is clicked', async ({ page, browserName }) => {
			/* See https://github.com/microsoft/playwright/issues/33864 */
			test.skip(browserName === 'firefox', 'Clicking on an input[type=color] in Firefox currently makes the page close itself.');

			await setContentWithRetry(page, `<${COMPONENT_NAME} _label="Color Picker"></${COMPONENT_NAME}>`);
			const component = page.locator(COMPONENT_NAME);
			const colorInput = selectcolorInput(page);

			await component.evaluate((element: HTMLKolInputColorElement) => {
				element._on = { onClick: () => ((window as unknown as Record<string, unknown>).clickCallback = true) };
				element.addEventListener('click', () => ((window as unknown as Record<string, unknown>).clickEvent = true));
			});

			await colorInput.click();
			await page.waitForChanges();

			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).clickCallback)).toBe(true);
			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).clickEvent)).toBe(true);
		});

		test('should call onChange callback and emit change event with value when the value is committed', async ({ page }) => {
			await setContentWithRetry(page, `<${COMPONENT_NAME} _label="Color Picker"></${COMPONENT_NAME}>`);
			const component = page.locator(COMPONENT_NAME);
			const colorInput = selectcolorInput(page);

			await component.evaluate((element: HTMLKolInputColorElement) => {
				element._on = { onChange: (_event: Event, value?: unknown) => ((window as unknown as Record<string, unknown>).changeValue = value) };
				element.addEventListener('change', (event: Event) => ((window as unknown as Record<string, unknown>).changeDetail = (event as CustomEvent).detail));
			});

			await fillAction(page);
			await page.waitForChanges();
			await colorInput.dispatchEvent('change');
			await page.waitForChanges();

			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).changeValue)).toBe(TEST_VALUE);
			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).changeDetail)).toBe(TEST_VALUE);
		});
	});

	testInputMessage<HTMLKolInputColorElement>(COMPONENT_NAME);
});
