import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import type { Option, StencilUnknown } from '../../schema';
import { KolSingleSelect } from './component';

const options: Option<StencilUnknown>[] = [
	{ label: 'North', value: 'N' },
	{ label: 'South', value: 'S' },
];

describe('kol-single-select clear filter (#11654)', () => {
	it('clears the input text, keeps the selected value and sends no events', async () => {
		const onInput = jest.fn();
		const onChange = jest.fn();
		const page = await newSpecPage({
			components: [KolSingleSelect],
			template: () => <kol-single-select _hasClearButton _label="Test" _on={{ onChange, onInput }} _options={options} _value="S" />,
		});

		const instance = page.rootInstance as KolSingleSelect;
		instance.inputValue = 'Sou';
		instance.filteredOptions = [options[1]];
		instance['clearFilter']();
		await page.waitForChanges();

		expect(instance._value).toBe('S');
		expect(instance.inputValue).toBe('');
		expect(instance.filteredOptions).toEqual(options);
		expect(onInput).not.toHaveBeenCalled();
		expect(onChange).not.toHaveBeenCalled();
	});

	it('clears the input text without a selection and keeps the empty value', async () => {
		const onInput = jest.fn();
		const onChange = jest.fn();
		const page = await newSpecPage({
			components: [KolSingleSelect],
			template: () => <kol-single-select _hasClearButton _label="Test" _on={{ onChange, onInput }} _options={options} />,
		});

		const instance = page.rootInstance as KolSingleSelect;
		instance.inputValue = 'Sou';
		instance.filteredOptions = [options[1]];
		instance['clearFilter']();
		await page.waitForChanges();

		expect(instance._value).toBeNull();
		expect(instance.inputValue).toBe('');
		expect(instance.filteredOptions).toEqual(options);
		expect(onInput).not.toHaveBeenCalled();
		expect(onChange).not.toHaveBeenCalled();
	});
});
