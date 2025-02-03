import { test } from '@stencil/playwright';
import { testInputCallbacksAndEvents, testInputValueReflection } from '../../e2e';

const COMPONENT_NAME = 'kol-combobox';
const TEST_VALUE = 'Hello World';

test.describe(COMPONENT_NAME, () => {
	testInputValueReflection<HTMLKolComboboxElement>(COMPONENT_NAME, TEST_VALUE);
	testInputCallbacksAndEvents<HTMLKolComboboxElement>(COMPONENT_NAME, TEST_VALUE);
});
