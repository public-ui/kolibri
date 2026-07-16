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
		expect(input?.getAttribute('aria-describedby')).toBe('input-text-hint-nonce');
	});

	it('msg IDs in aria-describedby when _msg is set ', async () => {
		const page = await newSpecPage({
			components: [KolInputText],
			template: () => <kol-input-text _label="Label" _msg={{ _description: 'Warnung', _type: 'warning' }} _hasCounter={true} _maxLength={10} _touched={true} />,
		});

		const formField = page.root?.shadowRoot?.querySelector('.kol-form-field');
		const input = page.root?.shadowRoot?.querySelector('input');

		expect(formField?.getAttribute('aria-describedby')).toBeNull();
		const ids = (input?.getAttribute('aria-describedby') ?? '').split(' ');
		expect(ids).toContain('input-text-msg-nonce');
		expect(page.root?.shadowRoot?.querySelector('#input-text-msg-nonce')).not.toBeNull();
	});

	it('references the character-limit hint when a max length is set without a counter', async () => {
		const page = await newSpecPage({
			components: [KolInputText],
			template: () => <kol-input-text _label="Label" _maxLength={10} />,
		});

		const input = page.root?.shadowRoot?.querySelector('input');
		const ids = (input?.getAttribute('aria-describedby') ?? '').split(' ');
		expect(ids).toContain('input-text-character-limit-hint-nonce');
		expect(page.root?.shadowRoot?.querySelector('#input-text-character-limit-hint-nonce')).not.toBeNull();
	});
});
