import { h } from '@stencil/core';

import { renderFunctionalComponentToSpecPage } from '../../@utils';
import { KolAlertFc } from '.';

describe('FeedThumbnail', () => {
	it('should render', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <KolAlertFc />);

		expect(page.root).toMatchSnapshot();
	});
});
