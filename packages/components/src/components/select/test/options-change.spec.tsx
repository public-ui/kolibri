import { newSpecPage } from '@stencil/core/testing';

import { KolSelectWc } from '../component';

describe('KolSelectWc options', () => {
	it('removes values that no longer exist after options change', async () => {
		const page = await newSpecPage({
			components: [KolSelectWc],
			html: `<kol-select-wc _multiple="true"></kol-select-wc>`,
		});
		const component = page.rootInstance as KolSelectWc;

		component.validateMultiple(true);
		component.validateOptions([
			{
				label: 'One',
				value: 1,
			},
			{
				label: 'Two',
				value: 2,
			},
		]);
		component.validateValue([1, 2]);
		await page.waitForChanges();

		expect(component.state._value).toEqual([1, 2]);

		component.validateOptions([
			{
				label: 'Two',
				value: 2,
			},
		]);
		await page.waitForChanges();

		expect(component.state._value).toEqual([2]);
	});

	it('keeps boolean option values intact when options persist', async () => {
		const page = await newSpecPage({
			components: [KolSelectWc],
			html: `<kol-select-wc _multiple="true"></kol-select-wc>`,
		});
		const component = page.rootInstance as KolSelectWc;

		component.validateMultiple(true);
		component.validateOptions([
			{
				label: 'True',
				value: true,
			},
			{
				label: 'False',
				value: false,
			},
		]);
		component.validateValue([false]);
		await page.waitForChanges();

		component.validateOptions([
			{
				label: 'False',
				value: false,
			},
			{
				label: 'True',
				value: true,
			},
		]);
		await page.waitForChanges();

		expect(component.state._value).toEqual([false]);
	});
});
