import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import type { SelectOption } from '../../../schema';

import { KolSelect } from '../shadow';

describe('kol-select aria-describedby', () => {
	it('keeps aria-describedby on the select element', async () => {
		const options: SelectOption<string>[] = [
			{
				label: 'First',
				value: 'first',
			},
		];

		const page = await newSpecPage({
			components: [KolSelect],
			template: () => <kol-select _id="select" _label="Label" _hint="Hint" _options={options} />,
		});

		const formField = page.root?.shadowRoot?.querySelector('.kol-form-field');
		const select = page.root?.shadowRoot?.querySelector('select');

		expect(formField?.getAttribute('aria-describedby')).toBeUndefined();
		expect(select?.getAttribute('aria-describedby')).toBe('select-hint');
	});
});
