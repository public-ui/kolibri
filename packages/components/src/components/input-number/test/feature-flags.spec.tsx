import type * as AdoptedStyleSheets from 'adopted-style-sheets';

// The component reads the flag via adopted-style-sheets' getFeatureFlag; mock only that export.
jest.mock('adopted-style-sheets', () => {
	const actual: typeof AdoptedStyleSheets = jest.requireActual('adopted-style-sheets');
	return { ...actual, getFeatureFlag: jest.fn() };
});

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { getFeatureFlag } from 'adopted-style-sheets';
import { KolInputNumber } from '../shadow';

const getFeatureFlagMock = getFeatureFlag as jest.Mock;

const render = () =>
	newSpecPage({
		components: [KolInputNumber],
		template: () => <kol-input-number _label="Number" />,
	});

describe('KolInputNumber – inputNumberButtons feature flag', () => {
	afterEach(() => {
		getFeatureFlagMock.mockReset();
	});

	it('renders step buttons when flag is not set (default)', async () => {
		getFeatureFlagMock.mockReturnValue(undefined);
		const page = await render();
		await page.waitForChanges();

		expect(page.root?.shadowRoot?.querySelector('[data-testid="kol-input-number-step-up"]')).not.toBeNull();
		expect(page.root?.shadowRoot?.querySelector('[data-testid="kol-input-number-step-down"]')).not.toBeNull();
	});

	it('renders step buttons when flag is "show"', async () => {
		getFeatureFlagMock.mockReturnValue('show');
		const page = await render();
		await page.waitForChanges();

		expect(page.root?.shadowRoot?.querySelector('[data-testid="kol-input-number-step-up"]')).not.toBeNull();
		expect(page.root?.shadowRoot?.querySelector('[data-testid="kol-input-number-step-down"]')).not.toBeNull();
	});

	it('hides step buttons when flag is "hide"', async () => {
		getFeatureFlagMock.mockReturnValue('hide');
		const page = await render();
		await page.waitForChanges();

		expect(page.root?.shadowRoot?.querySelector('[data-testid="kol-input-number-step-up"]')).toBeNull();
		expect(page.root?.shadowRoot?.querySelector('[data-testid="kol-input-number-step-down"]')).toBeNull();
	});
});
