import { h } from '@stencil/core';
import KolAlertFc from './..';
import { renderFunctionalComponentToSpecPage } from '../../../utils/testing';

describe('KolAlertFc', () => {
	it('should render', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <KolAlertFc />);

		expect(page.root).toMatchSnapshot();
	});
});
