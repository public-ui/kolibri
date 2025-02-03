import { h } from '@stencil/core';
import InputFc from '../Input';
import { renderFunctionalComponentToSpecPage } from '../../../../utils/testing';

describe('InputFc', () => {
	it('should render and match snapshot', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <InputFc id="test" value="test" />);
		expect(page.root).toMatchSnapshot();
	});

	it('should contain a input tag', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <InputFc id="test" value="test" />);
		expect(page.root?.tagName).toBe('INPUT');
	});
});
