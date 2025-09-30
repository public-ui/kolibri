import { h } from '@stencil/core';
import KolAlertFc from './..';
import { renderFunctionalComponentToSpecPage } from '../../../utils/testing';

describe('KolAlertFc', () => {
	it('should render', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <KolAlertFc />);

		expect(page.root).toMatchSnapshot();
	});

	it('should treat string "true" as an active alert', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <KolAlertFc alert={true} />);

		expect(page.root?.getAttribute('role')).toBe('alert');
		expect(page.root?.getAttribute('aria-live')).toBe('assertive');
	});

	it('should treat string "false" as an inactive alert', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <KolAlertFc alert={false} />);

		expect(page.root?.getAttribute('role')).toBe('status');
		expect(page.root?.getAttribute('aria-live')).toBe('polite');
	});
});
