import { h } from '@stencil/core';
import { renderFunctionalComponentToSpecPage } from '../../../utils/testing';
import KolAlertFc from './..';

describe('KolAlertFc', () => {
	it('should render', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <KolAlertFc />);

		expect(page.root).toMatchSnapshot();
	});

	it('should treat true as an active alert', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <KolAlertFc alert={true} />);

		expect(page.root?.getAttribute('role')).toBe('alert');
		expect(page.root?.getAttribute('aria-live')).toBeNull();
	});

	it('should treat false or undefined as an inactive alert', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <KolAlertFc alert={false} />);

		expect(page.root?.getAttribute('role')).toBeNull();
		expect(page.root?.getAttribute('aria-live')).toBeNull();
	});
});
