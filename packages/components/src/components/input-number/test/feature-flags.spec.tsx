import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { getFeatureFlag } from '../../../core/bootstrap';
import { KolInputNumber } from '../shadow';

jest.mock('../../../core/bootstrap', () => ({
	getFeatureFlag: jest.fn(),
}));

const mockGetFeatureFlag = getFeatureFlag as jest.MockedFunction<typeof getFeatureFlag>;

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
		mockGetFeatureFlag.mockReturnValue(undefined);
		const page = await render();
		await page.waitForChanges();

		expect(page.root?.shadowRoot?.querySelector('[data-testid="kol-input-number-step-up"]')).not.toBeNull();
		expect(page.root?.shadowRoot?.querySelector('[data-testid="kol-input-number-step-down"]')).not.toBeNull();
	});

	it('renders step buttons when flag is "show"', async () => {
		mockGetFeatureFlag.mockReturnValue('show');
		const page = await render();
		await page.waitForChanges();

		expect(page.root?.shadowRoot?.querySelector('[data-testid="kol-input-number-step-up"]')).not.toBeNull();
		expect(page.root?.shadowRoot?.querySelector('[data-testid="kol-input-number-step-down"]')).not.toBeNull();
	});

	it('hides step buttons when flag is "hide"', async () => {
		mockGetFeatureFlag.mockReturnValue('hide');
		const page = await render();
		await page.waitForChanges();

		expect(page.root?.shadowRoot?.querySelector('[data-testid="kol-input-number-step-up"]')).toBeNull();
		expect(page.root?.shadowRoot?.querySelector('[data-testid="kol-input-number-step-down"]')).toBeNull();
	});
});
