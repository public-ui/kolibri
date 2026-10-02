import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import type { Option, StencilUnknown } from '../../../schema';
import { KolSingleSelect } from '../component';

const booleanOptions: Option<StencilUnknown>[] = [
	{ label: 'False', value: false },
	{ label: 'True', value: true },
];

const stringOptions: Option<StencilUnknown>[] = [
	{ label: 'Option A', value: 'a' },
	{ label: 'Option B', value: 'b' },
];

describe('kol-single-select boolean option values (#9122)', () => {
	it('populates filteredOptions from a JSON string passed as _options on initial render', async () => {
		const page = await newSpecPage({
			components: [KolSingleSelect],
			template: () => <kol-single-select _label="Test" _options={JSON.stringify(stringOptions)} _value="a" />,
		});

		const instance = page.rootInstance as KolSingleSelect;
		expect(Array.isArray(instance.filteredOptions)).toBe(true);
		expect(instance.filteredOptions).toHaveLength(2);
	});

	it('re-populates filteredOptions when _options is updated via JSON string after initial render', async () => {
		const page = await newSpecPage({
			components: [KolSingleSelect],
			template: () => <kol-single-select _label="Test" _options={JSON.stringify(stringOptions)} />,
		});

		const instance = page.rootInstance as KolSingleSelect;
		expect(instance.filteredOptions).toHaveLength(2);

		const extended = [...stringOptions, { label: 'Option C', value: 'c' }];
		page.root!._options = JSON.stringify(extended) as never;
		await page.waitForChanges();

		expect(instance.filteredOptions).toHaveLength(3);
	});

	it('sets inputValue to the matching label when _value is false', async () => {
		const page = await newSpecPage({
			components: [KolSingleSelect],
			template: () => <kol-single-select _label="Test" _options={booleanOptions} _value={false} />,
		});

		const instance = page.rootInstance as KolSingleSelect;
		expect(instance.inputValue).toBe('False');
	});

	it('restores full options list on blur when _value is false', async () => {
		const page = await newSpecPage({
			components: [KolSingleSelect],
			template: () => <kol-single-select _label="Test" _options={booleanOptions} _value={false} />,
		});

		const instance = page.rootInstance as KolSingleSelect;

		// Simulate a partial filter state (as if the user typed something)
		instance.inputValue = 'Tru';
		instance.filteredOptions = [booleanOptions[1]]; // only "True" visible

		// Trigger blur — must restore full list because _value is false (valid selection)
		instance['selectOptionByInputValue']();
		await page.waitForChanges();

		expect(instance.filteredOptions).toHaveLength(booleanOptions.length);
	});
});
