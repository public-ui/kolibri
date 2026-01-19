import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { KolTextarea } from '../shadow';

describe('kol-textarea aria-describedby', () => {
	it('keeps aria-describedby on the textarea element', async () => {
		const page = await newSpecPage({
			components: [KolTextarea],
			template: () => <kol-textarea _label="Label" _hint="Hint" />,
		});

		const formField = page.root?.shadowRoot?.querySelector('.kol-form-field');
		const textarea = page.root?.shadowRoot?.querySelector('textarea');

		expect(formField?.getAttribute('aria-describedby')).toBeNull();
		expect(textarea?.getAttribute('aria-describedby')).toBe('id-nonce-hint');
	});
});
