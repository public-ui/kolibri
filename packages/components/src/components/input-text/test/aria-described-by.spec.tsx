import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { KolInputText } from '../shadow';

describe('kol-input-text aria-describedby', () => {
	it('keeps aria-describedby on the input element', async () => {
		const page = await newSpecPage({
			components: [KolInputText],
			template: () => <kol-input-text _label="Label" _hint="Hint" />,
		});

		const formField = page.root?.shadowRoot?.querySelector('.kol-form-field');
		const input = page.root?.shadowRoot?.querySelector('input');

		expect(formField?.getAttribute('aria-describedby')).toBeNull();
		expect(input?.getAttribute('aria-describedby')).toBe('input-text-hint--nonce');
	});
});
