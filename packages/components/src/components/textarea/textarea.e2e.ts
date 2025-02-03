import { test } from '@stencil/playwright';
import { testInputCallbacksAndEvents, testInputValueReflection } from '../../e2e';

const COMPONENT_NAME = 'kol-textarea';
const TEST_VALUE = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

test.describe(COMPONENT_NAME, () => {
	testInputValueReflection<HTMLKolTextareaElement>(COMPONENT_NAME, TEST_VALUE);
	testInputCallbacksAndEvents<HTMLKolTextareaElement>(COMPONENT_NAME);
});
