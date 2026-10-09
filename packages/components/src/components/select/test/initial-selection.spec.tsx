import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import type { SelectOption, StencilUnknown } from '../../../schema';
import { KolSelect } from '../component';

describe('kol-select initial selection', () => {
	it('skips disabled optgroups when selecting the initial option in single mode without value', async () => {
		const options: SelectOption<StencilUnknown>[] = [
			{
				disabled: true,
				label: 'G',
				options: [{ label: 'A', value: 'a' }],
			},
			{ label: 'B', value: 'b' },
		];

		const page = await newSpecPage({
			components: [KolSelect],
			template: () => <kol-select _label="Select" _options={options} />,
		});

		const optionA = page.root?.shadowRoot?.querySelector('option[value="-0-0"]');
		const optionB = page.root?.shadowRoot?.querySelector('option[value="-1"]');

		expect(optionA?.hasAttribute('selected')).toBe(false);
		expect(optionA?.hasAttribute('disabled')).toBe(true);
		expect(optionB?.hasAttribute('selected')).toBe(true);
		expect(optionB?.hasAttribute('disabled')).toBe(false);
	});
});
