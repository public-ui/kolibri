import { test } from '@stencil/playwright';
import { testInputCallbacksAndEvents, testInputValueReflection } from '../../e2e';
import type { FillAction } from '../../e2e/utils/FillAction';

const COMPONENT_NAME = 'kol-single-select';
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
	await page.getByRole('button').click();
	await page.getByRole('listbox').getByLabel(TEST_LABEL).click({ force: true });
};

test.describe(COMPONENT_NAME, () => {
	testInputValueReflection<HTMLKolSingleSelectElement>(COMPONENT_NAME, TEST_VALUE, fillAction, OPTIONS_ATTRIBUTE);
	testInputCallbacksAndEvents<HTMLKolSingleSelectElement>(COMPONENT_NAME, TEST_VALUE, fillAction, undefined, OPTIONS_ATTRIBUTE);
});
