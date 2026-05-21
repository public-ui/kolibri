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
		expect(input?.getAttribute('aria-describedby')).toBe('id-nonce-hint');
	});

	it('includes both msg and counter IDs in aria-describedby when _msg and _hasCounter are both set (#9073)', async () => {
		const page = await newSpecPage({
			components: [KolInputText],
			template: () => <kol-input-text _label="Label" _msg={{ _description: 'Warnung', _type: 'warning' }} _hasCounter={true} _maxLength={10} />,
		});

		const formField = page.root?.shadowRoot?.querySelector('.kol-form-field');
		const input = page.root?.shadowRoot?.querySelector('input');

		expect(formField?.getAttribute('aria-describedby')).toBeNull();
		const ids = (input?.getAttribute('aria-describedby') ?? '').split(' ');
		expect(ids).toContain('id-nonce-msg');
		expect(ids).toContain('id-nonce-counter');
		expect(ids).toContain('id-nonce-character-limit-hint');
	});
});
