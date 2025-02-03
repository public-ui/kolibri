import { test } from '@stencil/playwright';
import { testInputCallbacksAndEvents, testInputValueReflection } from '../../e2e';
import type { FillAction } from '../../e2e/utils/FillAction';

const COMPONENT_NAME = 'kol-input-number';
const TEST_VALUE = '10.23';
const fillAction: FillAction = async (page) => {
	await page.locator('input').fill(TEST_VALUE);
};

test.describe(COMPONENT_NAME, () => {
	testInputValueReflection<HTMLKolInputNumberElement>(COMPONENT_NAME, Number(TEST_VALUE), fillAction); // need to use a custom fillAction because the standard one only works with strings;
	testInputCallbacksAndEvents<HTMLKolInputNumberElement>(COMPONENT_NAME, TEST_VALUE);
});
