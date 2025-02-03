import { h } from '@stencil/core';
import { renderFunctionalComponentToSpecPage } from '../../../utils/testing';
import KolInputAdornmentFc from '../InputAdornment';
import KolIconButtonFc from '../../IconButton';

describe('KolInputContainerFc', () => {
	it('should render correctly', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <KolInputAdornmentFc />);
		expect(page.root).toMatchSnapshot();
	});

	it('should render with children', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => (
			<KolInputAdornmentFc>
				<KolIconButtonFc componentName="icon" icon="start-icon" />
			</KolInputAdornmentFc>
		));
		expect(page.root).toMatchSnapshot();
	});
});
