import { type E2EPage, test } from '@stencil/playwright';
import { testInputCallbacksAndEvents, testInputValueReflection } from '../../e2e';
import type { FillAction } from '../../e2e/utils/FillAction';
import type { Page } from '@playwright/test';

const COMPONENT_NAME = 'kol-input-range';
const TEST_VALUE = '10';
const fillAction: FillAction = async (page) => {
	const input = page.locator('input[type=number]');
	await input.fill(TEST_VALUE);
	await input.dispatchEvent('change');
};
const selectInput = (page: Page & E2EPage) => page.locator('input[type=number]');

test.describe(COMPONENT_NAME, () => {
	testInputValueReflection<HTMLKolInputRangeElement>({
		componentName: COMPONENT_NAME,
		fillAction,
		testValue: Number(TEST_VALUE),
	});
	testInputCallbacksAndEvents<HTMLKolInputRangeElement>({
		componentName: COMPONENT_NAME,
		fillAction,
		omittedEvents: ['change'],
		selectInput,
		expectedValue: Number(TEST_VALUE),
		testValue: TEST_VALUE,
	});
});
