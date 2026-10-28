import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import type { Option, StencilUnknown } from '../../../schema';
import { KolSingleSelect } from '../component';

const options: Option<StencilUnknown>[] = [
	{ label: 'North', value: 'N' },
	{ label: 'South', value: 'S' },
];

describe('kol-single-select clear selection (#10841)', () => {
	it('sends null as value of onInput and onChange, like a selection sends the option value', async () => {
		const onInput = jest.fn();
		const onChange = jest.fn();
		const page = await newSpecPage({
			components: [KolSingleSelect],
			template: () => <kol-single-select _hasClearButton _label="Test" _on={{ onChange, onInput }} _options={options} _value="N" />,
		});

		const instance = page.rootInstance as KolSingleSelect;
		instance['clearSelection']();
		await page.waitForChanges();

		expect(instance._value).toBeNull();
		expect(onInput).toHaveBeenCalledTimes(1);
		expect(onInput.mock.calls[0][1]).toBeNull();
		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange.mock.calls[0][1]).toBeNull();
	});
});
