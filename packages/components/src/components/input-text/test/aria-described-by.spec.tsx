import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { KolInputText } from '../component';

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

	it('does not include msg ID in aria-describedby before touched', async () => {
		const page = await newSpecPage({
			components: [KolInputText],
			template: () => <kol-input-text _label="Label" _msg={{ _description: 'Fehler', _type: 'error' }} />,
		});

		const input = page.root?.shadowRoot?.querySelector('input');
		expect(input?.getAttribute('aria-describedby')).toBeNull();
		expect(page.root?.shadowRoot?.querySelector('#input-text-msg-nonce')).toBeNull();
	});

	it('includes msg ID in aria-describedby and renders visually hidden msg when _hideMsg is set and touched', async () => {
		const page = await newSpecPage({
			components: [KolInputText],
			template: () => <kol-input-text _label="Label" _msg={{ _description: 'Fehler', _type: 'error' }} _hideMsg={true} _touched={true} />,
		});

		const input = page.root?.shadowRoot?.querySelector('input');
		expect(input?.getAttribute('aria-describedby')).toBe('input-text-msg-nonce');
		expect(input?.getAttribute('aria-invalid')).toBe('true');
		const msgEl = page.root?.shadowRoot?.querySelector('#input-text-msg-nonce');
		expect(msgEl).not.toBeNull();
		expect(msgEl?.classList.contains('visually-hidden')).toBe(true);
		expect(msgEl?.getAttribute('role')).toBeNull();
	});

	it('suppresses alert role on visually hidden msg even when _alert is true', async () => {
		const page = await newSpecPage({
			components: [KolInputText],
			template: () => <kol-input-text _label="Label" _msg={{ _description: 'Fehler', _type: 'error', _alert: true }} _hideMsg={true} _touched={true} />,
		});

		const msgEl = page.root?.shadowRoot?.querySelector('#input-text-msg-nonce');
		expect(msgEl).not.toBeNull();
		expect(msgEl?.classList.contains('visually-hidden')).toBe(true);
		expect(msgEl?.getAttribute('role')).toBeNull();
	});
});
