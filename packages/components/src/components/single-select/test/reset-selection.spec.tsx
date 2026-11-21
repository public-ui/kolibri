import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import type { Option, StencilUnknown } from '../../../schema';
import { KolSingleSelect } from '../component';

const options: Option<StencilUnknown>[] = [
	{ label: 'North', value: 'N' },
	{ label: 'South', value: 'S' },
];

describe('kol-single-select reset selection (#11654)', () => {
	it('selects the first enabled option and reports its value like a selection does', async () => {
		const onInput = jest.fn();
		const onChange = jest.fn();
		const page = await newSpecPage({
			components: [KolSingleSelect],
			template: () => <kol-single-select _hasClearButton _label="Test" _on={{ onChange, onInput }} _options={options} _value="S" />,
		});

		const instance = page.rootInstance as KolSingleSelect;
		instance['resetSelection']();
		await page.waitForChanges();

		expect(instance._value).toBe('N');
		expect(onInput).toHaveBeenCalledTimes(1);
		expect(onInput.mock.calls[0][1]).toBe('N');
		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange.mock.calls[0][1]).toBe('N');
	});

	it('selects the first enabled option over a disabled one', async () => {
		const disabledOptions: Option<StencilUnknown>[] = [
			{ label: 'North', value: 'N', disabled: true },
			{ label: 'South', value: 'S' },
		];
		const page = await newSpecPage({
			components: [KolSingleSelect],
			template: () => <kol-single-select _hasClearButton _label="Test" _options={disabledOptions} _value="S" />,
		});

		const instance = page.rootInstance as KolSingleSelect;
		instance['resetSelection']();
		await page.waitForChanges();

		expect(instance._value).toBe('S');
	});

	it('sends no events when the first enabled option is already selected', async () => {
		const onInput = jest.fn();
		const onChange = jest.fn();
		const page = await newSpecPage({
			components: [KolSingleSelect],
			template: () => <kol-single-select _hasClearButton _label="Test" _on={{ onChange, onInput }} _options={options} _value="N" />,
		});

		const instance = page.rootInstance as KolSingleSelect;
		instance['resetSelection']();
		await page.waitForChanges();

		expect(instance._value).toBe('N');
		expect(onInput).not.toHaveBeenCalled();
		expect(onChange).not.toHaveBeenCalled();
	});

	it('sends null when no option is enabled', async () => {
		const onInput = jest.fn();
		const onChange = jest.fn();
		const disabledOptions: Option<StencilUnknown>[] = [
			{ label: 'North', value: 'N', disabled: true },
			{ label: 'South', value: 'S', disabled: true },
		];
		const page = await newSpecPage({
			components: [KolSingleSelect],
			template: () => <kol-single-select _hasClearButton _label="Test" _on={{ onChange, onInput }} _options={disabledOptions} _value="S" />,
		});

		const instance = page.rootInstance as KolSingleSelect;
		instance['resetSelection']();
		await page.waitForChanges();

		expect(instance._value).toBeNull();
		expect(onInput).toHaveBeenCalledTimes(1);
		expect(onInput.mock.calls[0][1]).toBeNull();
		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange.mock.calls[0][1]).toBeNull();
	});
});
