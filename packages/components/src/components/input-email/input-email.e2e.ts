import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { testInputCharacterLimit, testInputValueReflection } from '../../e2e';
import { testInputMessage } from '../../e2e/input-msg';
import { setContentWithRetry } from '../../e2e/utils/setContentWithRetry';

const COMPONENT_NAME = 'kol-input-email';
const TEST_VALUE = 'example@example.com';

test.describe(COMPONENT_NAME, () => {
	testInputValueReflection<HTMLKolInputEmailElement>({
		componentName: COMPONENT_NAME,
		testValue: TEST_VALUE,
	});

	test.describe('Callbacks and Events', () => {
		test('should call onFocus callback and emit focus event when input receives focus', async ({ page }) => {
			await setContentWithRetry(page, `<${COMPONENT_NAME} _label="Email"></${COMPONENT_NAME}>`);
			const component = page.locator(COMPONENT_NAME);
			const input = page.locator('input');

			await component.evaluate((element: HTMLKolInputEmailElement) => {
				element._on = { onFocus: () => ((window as unknown as Record<string, unknown>).focusCallback = true) };
				element.addEventListener('focus', () => ((window as unknown as Record<string, unknown>).focusEvent = true));
			});

			await input.focus();
			await page.waitForChanges();

			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).focusCallback)).toBe(true);
			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).focusEvent)).toBe(true);
		});

		test('should call onBlur callback and emit blur event when input loses focus', async ({ page }) => {
			await setContentWithRetry(page, `<${COMPONENT_NAME} _label="Email"></${COMPONENT_NAME}><button id="next">Next</button>`);
			const component = page.locator(COMPONENT_NAME);
			const input = page.locator('input');
			const nextButton = page.locator('#next');

			await component.evaluate((element: HTMLKolInputEmailElement) => {
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

		test('should call onClick callback and emit click event when input is clicked', async ({ page }) => {
			await setContentWithRetry(page, `<${COMPONENT_NAME} _label="Email"></${COMPONENT_NAME}>`);
			const component = page.locator(COMPONENT_NAME);
			const input = page.locator('input');

			await component.evaluate((element: HTMLKolInputEmailElement) => {
				element._on = { onClick: () => ((window as unknown as Record<string, unknown>).clickCallback = true) };
				element.addEventListener('click', () => ((window as unknown as Record<string, unknown>).clickEvent = true));
			});

			await input.click();
			await page.waitForChanges();

			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).clickCallback)).toBe(true);
			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).clickEvent)).toBe(true);
		});

		test('should call onInput callback and emit input event with value when value changes', async ({ page }) => {
			await setContentWithRetry(page, `<${COMPONENT_NAME} _label="Email"></${COMPONENT_NAME}>`);
			const component = page.locator(COMPONENT_NAME);
			const input = page.locator('input');

			await component.evaluate((element: HTMLKolInputEmailElement) => {
				element._on = { onInput: (_event: Event, value?: unknown) => ((window as unknown as Record<string, unknown>).inputValue = value) };
				element.addEventListener('input', (event: Event) => ((window as unknown as Record<string, unknown>).inputDetail = (event as CustomEvent).detail));
			});

			await input.fill(TEST_VALUE);
			await page.waitForChanges();

			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).inputValue)).toBe(TEST_VALUE);
			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).inputDetail)).toBe(TEST_VALUE);
		});

		test('should call onChange callback and emit change event with value when input is blurred', async ({ page }) => {
			await setContentWithRetry(page, `<${COMPONENT_NAME} _label="Email"></${COMPONENT_NAME}><button id="next">Next</button>`);
			const component = page.locator(COMPONENT_NAME);
			const input = page.locator('input');
			const nextButton = page.locator('#next');

			await component.evaluate((element: HTMLKolInputEmailElement) => {
				element._on = { onChange: (_event: Event, value?: unknown) => ((window as unknown as Record<string, unknown>).changeValue = value) };
				element.addEventListener('change', (event: Event) => ((window as unknown as Record<string, unknown>).changeDetail = (event as CustomEvent).detail));
			});

			await input.fill(TEST_VALUE);
			await page.waitForChanges();
			await nextButton.focus();
			await page.waitForChanges();

			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).changeValue)).toBe(TEST_VALUE);
			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).changeDetail)).toBe(TEST_VALUE);
		});
	});

	testInputCharacterLimit(COMPONENT_NAME);
	testInputMessage<HTMLKolInputEmailElement>(COMPONENT_NAME);
});
