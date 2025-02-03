import { h } from '@stencil/core';
import NativeSelectFc from '../NativeSelect';
import { renderFunctionalComponentToSpecPage } from '../../../../utils/testing';

describe('NativeSelectFc', () => {
	it('should render and match snapshot', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <NativeSelectFc id="test" value="test" />);
		expect(page.root).toMatchSnapshot();
	});

	it('should contain a select tag', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <NativeSelectFc id="test" value="test" />);
		expect(page.root?.tagName).toBe('SELECT');
	});
});
