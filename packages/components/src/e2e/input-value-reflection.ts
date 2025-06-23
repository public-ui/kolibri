import { test } from '@stencil/playwright';
import { expect } from '@playwright/test';
import type { FillAction } from './utils/FillAction';
import { INPUTS_SELECTOR } from './utils/inputsSelector';

type TestInputValueReflectionOptions = {
	additionalProperties?: string;
	componentName: string;
	equalityCheck?: 'toBe' | 'toEqual';
	fillAction?: FillAction;
	testValue?: unknown;
};

const testInputValueReflection = <ElementType extends { _value?: unknown } & (HTMLElement | SVGElement)>({
	additionalProperties = '',
	componentName,
	equalityCheck = 'toBe',
	fillAction,
	testValue,
}: TestInputValueReflectionOptions) => {
	test(`should reflect the _value property on the web component`, async ({ page }) => {
		await page.setContent(`<${componentName} _label="Input" ${additionalProperties}></${componentName}>`);
		if (fillAction) {
			await fillAction(page);
		} else if (typeof testValue === 'string') {
			await page.locator(INPUTS_SELECTOR).fill(testValue);
		}

		const valueDomProperty = await page.locator(componentName).evaluate((element: ElementType) => element._value);

		expect(valueDomProperty)[equalityCheck](testValue);
	});
};

export { testInputValueReflection };
