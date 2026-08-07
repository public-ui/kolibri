import type * as AdoptedStyleSheets from 'adopted-style-sheets';

// The component reads the flag via adopted-style-sheets' getFeatureFlag; mock only that export.
jest.mock('adopted-style-sheets', () => {
	const actual: typeof AdoptedStyleSheets = jest.requireActual('adopted-style-sheets');
	return { ...actual, getFeatureFlag: jest.fn() };
});

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { getFeatureFlag } from 'adopted-style-sheets';
import { KolBreadcrumb } from '../shadow';

const getFeatureFlagMock = getFeatureFlag as jest.Mock;

const render = () =>
	newSpecPage({
		components: [KolBreadcrumb],
		template: () => (
			<kol-breadcrumb
				_label="Number"
				_links={[
					{ _label: 'Homepage', _href: '#/back-page' },
					{ _label: 'Bottom of the homepage', _href: '#/back-page' },
					{
						_label: 'Underside of the underside',
						_href: '#/back-page',
					},
				]}
			/>
		),
	});

describe('KolBreadcrumb – breadcrumb feature flag', () => {
	afterEach(() => {
		getFeatureFlagMock.mockReset();
	});

	it('renders current page when flag is not set (default)', async () => {
		getFeatureFlagMock.mockReturnValue(undefined);
		const page = await render();
		await page.waitForChanges();

		expect(page.root?.shadowRoot?.querySelector('.kol-breadcrumb__list-element-span')).not.toBeNull();
	});

	it('renders current page when flag is "show"', async () => {
		getFeatureFlagMock.mockReturnValue('show');
		const page = await render();
		await page.waitForChanges();

		expect(page.root?.shadowRoot?.querySelector('.kol-breadcrumb__list-element-span')).not.toBeNull();
	});

	it('hides current page when flag is "hide"', async () => {
		getFeatureFlagMock.mockReturnValue('hide');
		const page = await render();
		await page.waitForChanges();

		expect(page.root?.shadowRoot?.querySelector('.kol-breadcrumb__list-element-span')).toBeNull();
	});
});
