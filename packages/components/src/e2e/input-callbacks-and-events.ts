import { type E2EPage, test } from '@stencil/playwright';
import type { Locator } from '@playwright/test';
import { expect, type Page } from '@playwright/test';
import type { FillAction } from './utils/FillAction';
import type { InputTypeOnDefault } from '../schema';
import { INPUTS_SELECTOR } from './utils/inputsSelector';
import { Callback } from '../schema/enums';
import { KolEvent } from '../utils/events';

const testInputCallbacksAndEvents = <ElementType extends { _on?: InputTypeOnDefault } & (HTMLElement | SVGElement)>(
	componentName: string,
	testValue: unknown = 'Test Input',
	fillAction?: FillAction,
	omittedEvents: string[] = [],
	additionalProperties: string = '',
	selectInput?: (page: Page & E2EPage) => Locator,
	equalityCheck: 'toBe' | 'toEqual' = 'toBe',
) => {
	test.describe('Callbacks and DOM events', () => {
		const EVENTS: [string, Callback, KolEvent, unknown?][] = [
			['click', Callback.onClick, KolEvent.click],
			['focus', Callback.onFocus, KolEvent.focus],
			['blur', Callback.onBlur, KolEvent.blur],
			['input', Callback.onInput, KolEvent.input, testValue],
			['change', Callback.onChange, KolEvent.change, testValue],
		];

		EVENTS.filter(([eventName]) => !omittedEvents.includes(eventName)).forEach(([nativeEventName, callbackName, kolEventName, testValue]) => {
			test(`should call ${callbackName} callback when internal input emits ${nativeEventName}`, async ({ page, browserName }) => {
				/* See https://github.com/microsoft/playwright/issues/33864 */
				test.skip(
					componentName === 'kol-input-color' && nativeEventName === 'click' && browserName === 'firefox',
					'Clicking on an input[type=color] in Firefox currently makes the page close itself.',
				);

				await page.setContent(`<${componentName} _label="Input" ${additionalProperties}></${componentName}>`);
				const component = page.locator(componentName);
				const input = selectInput ? selectInput(page) : page.locator(INPUTS_SELECTOR);

				const callbackPromise = component.evaluate((element: ElementType, callbackName) => {
					return new Promise<unknown>((resolve) => {
						element._on = {
							[callbackName]: (_event: InputEvent, value?: unknown) => {
								resolve(value);
							},
						};
					});
				}, callbackName);

				const eventPromise = component.evaluate((element: ElementType, kolEventName) => {
					return new Promise<unknown>((resolve) => {
						element.addEventListener(kolEventName, (event: Event) => {
							resolve((event as CustomEvent).detail);
						});
					});
				}, kolEventName);

				await page.waitForChanges();

				if (fillAction) {
					await fillAction(page);
				} else if (typeof testValue === 'string') {
					await page.locator(INPUTS_SELECTOR).fill(testValue);
				}
				await page.waitForChanges();
				await input.dispatchEvent(nativeEventName);

				await expect(callbackPromise).resolves[equalityCheck](testValue);
				await expect(eventPromise).resolves[equalityCheck](testValue ?? null); // For no value, callbacks use `undefined`, the event detail is `null`.
			});
		});
	});
};

export { testInputCallbacksAndEvents };
