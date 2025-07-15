import type { E2EPage } from '@stencil/playwright';
import { test } from '@stencil/playwright';
import { testInputCallbacksAndEvents, testInputValueReflection } from '../../e2e';
import type { FillAction } from '../../e2e/utils/FillAction';
import type { Page } from '@playwright/test';

const COMPONENT_NAME = 'kol-select';
const TEST_VALUE = 'E';
const TEST_LABEL = 'East';
const OPTIONS = [
	{ label: 'North', value: 'N' },
	{ label: 'South', value: 'S' },
	{ label: 'West', value: 'W' },
	{ label: 'East', value: 'E' },
];
const OPTIONS_ATTRIBUTE = `_options='${JSON.stringify(OPTIONS)}'`;
const fillAction: FillAction = async (page) => {
	await page.locator('select').selectOption({ label: TEST_LABEL });
};
const selectInput = (page: Page & E2EPage) => page.locator('select');

test.describe(COMPONENT_NAME, () => {
	testInputValueReflection<HTMLKolSelectElement>({
		additionalProperties: OPTIONS_ATTRIBUTE,
		componentName: COMPONENT_NAME,
		equalityCheck: 'toEqual',
		fillAction,
		testValue: TEST_VALUE,
	});
	testInputCallbacksAndEvents<HTMLKolSelectElement>({
		additionalProperties: OPTIONS_ATTRIBUTE,
		componentName: COMPONENT_NAME,
		fillAction,
		selectInput,
		testValue: TEST_VALUE,
		equalityCheck: 'toEqual',
	});
});
