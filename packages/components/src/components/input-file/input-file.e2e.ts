import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';
import { testInputCallbacksAndEvents } from '../../e2e';
import { testInputMessage } from '../../e2e/input-msg';
import type { FillAction } from '../../e2e/utils/FillAction';
import { translate } from '../../i18n';
import { Callback } from '../../schema/enums';

const COMPONENT_NAME = 'kol-input-file';
const TEST_VALUE: [] = [];
const fillAction: FillAction = async (page) => {
	await page.locator('input').setInputFiles({
		name: 'file.txt',
		mimeType: 'text/plain',
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
		buffer: Buffer.from('this is test'),
	});
};

test.describe(COMPONENT_NAME, () => {
	testInputCallbacksAndEvents<HTMLKolInputFileElement>({
		componentName: COMPONENT_NAME,
		fillAction,
		omittedEvents: ['input', 'change'],
		testValue: TEST_VALUE,
	});
	testInputMessage<HTMLKolInputFileElement>(COMPONENT_NAME);

	test.describe('Callbacks', () => {
		[Callback.onInput, Callback.onChange].forEach((callbackName) => {
			test(`should call ${callbackName} callback when internal input receives file selection`, async ({ page }) => {
				await page.setContent(`<kol-input-file _label="Input"></kol-input-file>`);
				const component = page.locator(COMPONENT_NAME);

				const fileList = component.evaluate((element: HTMLKolInputFileElement, callbackName) => {
					return new Promise<FileList>((resolve) => {
						element._on = {
							[callbackName]: (_event: InputEvent, value: FileList) => {
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

	test.describe('DOM events', () => {
		['input', 'change'].forEach((eventName) => {
			test(`should emit ${eventName} when internal input receives file selection`, async ({ page }) => {
				await page.setContent(`<kol-input-file _label="Input"></kol-input-file>`);
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
			await page.setContent(`<kol-input-file _label="Input"></kol-input-file>`);

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
