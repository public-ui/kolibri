import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import type { RadioOption, StencilUnknown } from '../../../schema';

import { KolInputRadio } from '../shadow';

const options: RadioOption<StencilUnknown>[] = [
	{
		label: 'First',
		value: 'first',
	},
];

describe('kol-input-radio aria-describedby', () => {
	it('renders aria-describedby on the fieldset', async () => {
		const page = await newSpecPage({
			components: [KolInputRadio],
			template: () => <kol-input-radio _label="Label" _hint="Hint" _options={options} />,
		});

		const fieldset = page.root?.shadowRoot?.querySelector('fieldset');

		expect(fieldset?.getAttribute('aria-describedby')).toBe('input-radio-nonce-hint');
	});
});
