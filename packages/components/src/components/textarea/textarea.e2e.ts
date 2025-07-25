import { test } from '@stencil/playwright';
import { testInputCallbacksAndEvents, testInputCharacterLimit, testInputValueReflection } from '../../e2e';
import { testInputMessage } from '../../e2e/input-msg';

const COMPONENT_NAME = 'kol-textarea';
const TEST_VALUE = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

test.describe(COMPONENT_NAME, () => {
	testInputValueReflection<HTMLKolTextareaElement>({
		componentName: COMPONENT_NAME,
		testValue: TEST_VALUE,
	});
	testInputCallbacksAndEvents<HTMLKolTextareaElement>({
		componentName: COMPONENT_NAME,
	});
	testInputCharacterLimit(COMPONENT_NAME);
	testInputMessage<HTMLKolTextareaElement>(COMPONENT_NAME);
});
