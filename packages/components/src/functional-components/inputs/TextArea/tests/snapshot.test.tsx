import { h } from '@stencil/core';
import TextAreaFc from '../TextArea';
import { renderFunctionalComponentToSpecPage } from '../../../../utils/testing';

describe('TextAreaFc', () => {
	it('should render and match snapshot', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <TextAreaFc id="test" value="test" />);
		expect(page.root).toMatchSnapshot();
	});

	it('should contain a textarea tag', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <TextAreaFc id="test" value="test" />);
		expect(page.root?.tagName).toBe('TEXTAREA');
	});
});
