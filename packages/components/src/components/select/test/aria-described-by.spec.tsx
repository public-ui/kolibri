import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import type { SelectOption } from '../../../schema';

import { KolSelectWc } from '../component';
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
			components: [KolSelect, KolSelectWc],
			template: () => <kol-select _label="Label" _hint="Hint" _options={options} />,
		});

		const formField = page.root?.shadowRoot?.querySelector('.kol-form-field');
		const selectWc = page.root?.shadowRoot?.querySelector('kol-select-wc');
		const select = selectWc?.querySelector('select');

		expect(formField?.getAttribute('aria-describedby')).toBeNull();
		expect(select?.getAttribute('aria-describedby')).toBe('select-hint--nonce');
	});
});
