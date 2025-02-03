import { test } from '@stencil/playwright';
import { testInputCallbacksAndEvents } from '../../e2e';
import type { FillAction } from '../../e2e/utils/FillAction';
import { expect } from '@playwright/test';
import { Callback } from '../../schema/enums';
import { KolEvent } from '../../utils/events';

const COMPONENT_NAME = 'kol-input-file';
const TEST_VALUE: [] = [];
const fillAction: FillAction = async (page) => {
	await page.locator('input').setInputFiles({
		name: 'file.txt',
		mimeType: 'text/plain',
		buffer: Buffer.from('this is test'),
	});
};

test.describe(COMPONENT_NAME, () => {
	testInputCallbacksAndEvents<HTMLKolInputFileElement>(COMPONENT_NAME, TEST_VALUE, fillAction, ['input', 'change']);

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
		[KolEvent.input, KolEvent.change].forEach((eventName) => {
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
});
