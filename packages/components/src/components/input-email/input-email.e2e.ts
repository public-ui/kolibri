import { test } from '@stencil/playwright';
import { testInputCallbacksAndEvents, testInputValueReflection } from '../../e2e';

const COMPONENT_NAME = 'kol-input-email';
const TEST_VALUE = 'example@example.com';

test.describe(COMPONENT_NAME, () => {
	testInputValueReflection<HTMLKolInputEmailElement>(COMPONENT_NAME, TEST_VALUE);
	testInputCallbacksAndEvents<HTMLKolInputEmailElement>(COMPONENT_NAME);
});
