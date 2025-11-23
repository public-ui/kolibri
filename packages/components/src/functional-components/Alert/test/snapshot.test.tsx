import { h } from '@stencil/core';
import { renderFunctionalComponentToSpecPage } from '../../../utils/testing';
import KolAlertFc from './..';

describe('KolAlertFc', () => {
	it('should render', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <KolAlertFc />);

		expect(page.root).toMatchSnapshot();
	});
});
