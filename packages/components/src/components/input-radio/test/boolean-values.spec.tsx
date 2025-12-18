import { newSpecPage } from '@stencil/core/testing';

import { KolInputRadio } from '../shadow';

describe('KolInputRadio boolean values', () => {
	it('accepts boolean option values without errors', async () => {
		const page = await newSpecPage({
			components: [KolInputRadio],
			html: `<kol-input-radio _label="Choose"></kol-input-radio>`,
		});
		const component = page.rootInstance as KolInputRadio;

		component.validateOptions([
			{
				label: 'Yes',
				value: true,
			},
			{
				label: 'No',
				value: false,
			},
		]);
		component.validateValue(false);
		await page.waitForChanges();

		expect(component.state._value).toBe(false);
	});
});
