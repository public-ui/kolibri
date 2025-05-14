import { h } from '@stencil/core';
import KolFormFieldCounterFc from '../FormFieldCounter';
import { renderFunctionalComponentToSpecPage } from '../../../utils/testing';

const currentLength = 5;
const currentLengthDebounced = 3;
const maxLength = 10;

describe('KolFormFieldCounterFc', () => {
	it('should render correctly', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => (
			<KolFormFieldCounterFc id="test-id" currentLength={currentLength} currentLengthDebounced={currentLengthDebounced} maxLength={maxLength} />
		));

		expect(page.root).toMatchSnapshot();
	});
});
