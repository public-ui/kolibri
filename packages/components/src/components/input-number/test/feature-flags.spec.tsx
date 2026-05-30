import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import * as bootstrapModule from '../../../core/bootstrap';
import { KolInputNumber } from '../shadow';

const render = () =>
	newSpecPage({
		components: [KolInputNumber],
		template: () => <kol-input-number _label="Number" />,
	});

describe('KolInputNumber – inputNumberButtons feature flag', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('renders step buttons when flag is not set (default)', async () => {
		jest.spyOn(bootstrapModule, 'getFeatureFlag').mockReturnValue(undefined);
		const page = await render();
		await page.waitForChanges();

		expect(page.root?.shadowRoot?.querySelector('[data-testid="kol-input-number-step-up"]')).not.toBeNull();
		expect(page.root?.shadowRoot?.querySelector('[data-testid="kol-input-number-step-down"]')).not.toBeNull();
	});

	it('renders step buttons when flag is "show"', async () => {
		jest.spyOn(bootstrapModule, 'getFeatureFlag').mockReturnValue('show');
		const page = await render();
		await page.waitForChanges();

		expect(page.root?.shadowRoot?.querySelector('[data-testid="kol-input-number-step-up"]')).not.toBeNull();
		expect(page.root?.shadowRoot?.querySelector('[data-testid="kol-input-number-step-down"]')).not.toBeNull();
	});

	it('hides step buttons when flag is "hide"', async () => {
		jest.spyOn(bootstrapModule, 'getFeatureFlag').mockReturnValue('hide');
		const page = await render();
		await page.waitForChanges();

		expect(page.root?.shadowRoot?.querySelector('[data-testid="kol-input-number-step-up"]')).toBeNull();
		expect(page.root?.shadowRoot?.querySelector('[data-testid="kol-input-number-step-down"]')).toBeNull();
	});
});
