import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { KolInputNumber } from '../shadow';

jest.mock('../../../core/bootstrap', () => ({
	...jest.requireActual('../../../core/bootstrap'),
	getFeatureFlag: jest.fn(),
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { getFeatureFlag } = require('../../../core/bootstrap') as { getFeatureFlag: jest.Mock };

const render = () =>
	newSpecPage({
		components: [KolInputNumber],
		template: () => <kol-input-number _label="Number" />,
	});

describe('KolInputNumber – inputNumberButtons feature flag', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders step buttons when flag is not set (default)', async () => {
		getFeatureFlag.mockReturnValue(undefined);
		const page = await render();
		await page.waitForChanges();

		expect(page.root?.shadowRoot?.querySelector('[data-testid="kol-input-number-step-up"]')).not.toBeNull();
		expect(page.root?.shadowRoot?.querySelector('[data-testid="kol-input-number-step-down"]')).not.toBeNull();
	});

	it('renders step buttons when flag is "show"', async () => {
		getFeatureFlag.mockReturnValue('show');
		const page = await render();
		await page.waitForChanges();

		expect(page.root?.shadowRoot?.querySelector('[data-testid="kol-input-number-step-up"]')).not.toBeNull();
		expect(page.root?.shadowRoot?.querySelector('[data-testid="kol-input-number-step-down"]')).not.toBeNull();
	});

	it('hides step buttons when flag is "hide"', async () => {
		getFeatureFlag.mockReturnValue('hide');
		const page = await render();
		await page.waitForChanges();

		expect(page.root?.shadowRoot?.querySelector('[data-testid="kol-input-number-step-up"]')).toBeNull();
		expect(page.root?.shadowRoot?.querySelector('[data-testid="kol-input-number-step-down"]')).toBeNull();
	});
});
