import { newSpecPage } from '@stencil/core/testing';

import { KolSingleSelect } from '../shadow';

describe('KolSingleSelect boolean values', () => {
	it('accepts boolean option values without errors', async () => {
		const page = await newSpecPage({
			components: [KolSingleSelect],
			html: `<kol-single-select _label="Test"></kol-single-select>`,
		});
		const component = page.rootInstance as KolSingleSelect;

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
		component._value = false;
		component.validateValue(false);
		await page.waitForChanges();

		expect(component._value).toBe(false);
		expect(component.state._value).toBe(false);
	});
});
