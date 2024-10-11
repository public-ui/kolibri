import { h } from '@stencil/core';

import { renderFunctionalComponentToSpecPage } from '../../@utils';
import { KolAlertFc } from '.';

describe('KolAlertFc', () => {
	it('should render', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <KolAlertFc _label="Test" />);

		expect(page.root).toMatchSnapshot();
	});
});
