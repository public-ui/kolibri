import { test } from '@stencil/playwright';
import { testInputCallbacksAndEvents, testInputValueReflection } from '../../e2e';
import { testInputMessage } from '../../e2e/input-msg';

const COMPONENT_NAME = 'kol-input-email';
const TEST_VALUE = 'example@example.com';

test.describe(COMPONENT_NAME, () => {
	testInputValueReflection<HTMLKolInputEmailElement>({
		componentName: COMPONENT_NAME,
		testValue: TEST_VALUE,
	});
	testInputCallbacksAndEvents<HTMLKolInputEmailElement>({
		componentName: COMPONENT_NAME,
	});
	testInputMessage<HTMLKolInputEmailElement>(COMPONENT_NAME);
});
