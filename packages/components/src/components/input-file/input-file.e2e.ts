import { Buffer } from 'buffer';

import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { testInputMessage } from '../../e2e/input-msg';
import type { FillAction } from '../../e2e/utils/FillAction';
import { setContentWithRetry } from '../../e2e/utils/setContentWithRetry';
import { translate } from '../../i18n';
import { Callback } from '../../schema/enums';

const COMPONENT_NAME = 'kol-input-file';
const fillAction: FillAction = async (page) => {
	await page.locator('input').setInputFiles({
		name: 'file.txt',
		mimeType: 'text/plain',
		buffer: Buffer.from('this is test', 'utf8'),
	});
};

test.describe(COMPONENT_NAME, () => {
	testInputMessage<HTMLKolInputFileElement>(COMPONENT_NAME);

	test.describe('Callbacks and Events', () => {
		test('should call onFocus callback and emit focus event when input receives focus', async ({ page }) => {
			await setContentWithRetry(page, `<${COMPONENT_NAME} _label="Input"></${COMPONENT_NAME}>`);
			const component = page.locator(COMPONENT_NAME);
			const input = page.locator('input');

			await component.evaluate((element: HTMLKolInputFileElement) => {
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

			await component.evaluate((element: HTMLKolInputFileElement) => {
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
			await setContentWithRetry(page, `<${COMPONENT_NAME} _label="Input"></${COMPONENT_NAME}>`);
			const component = page.locator(COMPONENT_NAME);
			const input = page.locator('input');

			await component.evaluate((element: HTMLKolInputFileElement) => {
				element._on = { onClick: () => ((window as unknown as Record<string, unknown>).clickCallback = true) };
				element.addEventListener('click', () => ((window as unknown as Record<string, unknown>).clickEvent = true));
			});

			// Use a synthetic click to avoid opening the native file dialog, which would block the test.
			await input.dispatchEvent('click');
			await page.waitForChanges();

			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).clickCallback)).toBe(true);
			expect(await page.evaluate(() => (window as unknown as Record<string, unknown>).clickEvent)).toBe(true);
		});
	});

	test.describe('File selection callbacks', () => {
		[Callback.onInput, Callback.onChange].forEach((callbackName) => {
			test(`should call ${callbackName} callback when internal input receives file selection`, async ({ page }) => {
				await setContentWithRetry(page, `<kol-input-file _label="Input"></kol-input-file>`);
				const component = page.locator(COMPONENT_NAME);

				const fileList = component.evaluate((element: HTMLKolInputFileElement, callbackName) => {
					return new Promise<FileList>((resolve) => {
						element._on = {
							[callbackName]: (_event: Event, value: FileList) => {
								resolve(value);
							},
						};
					});
				}, callbackName);
				await page.waitForChanges();

				await fillAction(page);
				await page.waitForChanges();

				expect(Object.keys(await fileList)).toHaveLength(1); // no great way to test this, because Playwright has no FileList implementation.
			});
		});
	});

	test.describe('File selection DOM events', () => {
		['input', 'change'].forEach((eventName) => {
			test(`should emit ${eventName} when internal input receives file selection`, async ({ page }) => {
				await setContentWithRetry(page, `<kol-input-file _label="Input"></kol-input-file>`);
				const component = page.locator(COMPONENT_NAME);

				const fileList = component.evaluate((element: HTMLKolInputFileElement, eventName) => {
					return new Promise<FileList>((resolve) => {
						element.addEventListener(eventName, (event: Event) => {
							resolve((event as CustomEvent).detail as FileList);
						});
					});
				}, eventName);
				await page.waitForChanges();

				await fillAction(page);
				await page.waitForChanges();

				expect(Object.keys(await fileList)).toHaveLength(1); // no great way to test this, because Playwright has no FileList implementation.
			});
		});
	});

	test.describe('reset()', () => {
		test('should clear the selected files and filename text', async ({ page }) => {
			await setContentWithRetry(page, `<kol-input-file _label="Input"></kol-input-file>`);

			await fillAction(page);
			await page.waitForChanges();

			const component = page.locator(COMPONENT_NAME);
			const filledFileList = await component.evaluate((element: HTMLKolInputFileElement) => element.getValue());
			expect(filledFileList).not.toEqual({});

			await component.evaluate((element: HTMLKolInputFileElement) => element.reset());
			await page.waitForChanges();

			const fileList = await component.evaluate((element: HTMLKolInputFileElement) => element.getValue());
			expect(fileList).toEqual({});
			await expect(page.locator('input')).toHaveValue('');
			await expect(page.locator('.kol-input-container__filename')).toHaveText(translate('kol-filename-text'));
		});
	});
});
