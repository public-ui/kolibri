import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { KolInputText } from '../shadow';

describe('kol-input-text aria-invalid', () => {
	it('sets aria-invalid="true" when msg type is error and field is touched', async () => {
		const page = await newSpecPage({
			components: [KolInputText],
			template: () => <kol-input-text _label="Label" _msg={{ _description: 'Es ist ein Fehler aufgetreten', _type: 'error' }} _touched={true} />,
		});

		const input = page.root?.shadowRoot?.querySelector('input');

		expect(input?.getAttribute('aria-invalid')).toBe('true');
	});

	it('does not set aria-invalid when msg type is not error', async () => {
		const page = await newSpecPage({
			components: [KolInputText],
			template: () => <kol-input-text _label="Label" _msg={{ _description: 'Eine Info', _type: 'info' }} _touched={true} />,
		});

		const input = page.root?.shadowRoot?.querySelector('input');

		expect(input?.getAttribute('aria-invalid')).toBeNull();
	});

	it('does not set aria-invalid when field is not touched', async () => {
		const page = await newSpecPage({
			components: [KolInputText],
			template: () => <kol-input-text _label="Label" _msg={{ _description: 'Es ist ein Fehler aufgetreten', _type: 'error' }} />,
		});

		const input = page.root?.shadowRoot?.querySelector('input');

		expect(input?.getAttribute('aria-invalid')).toBeNull();
	});

	it('does not set aria-invalid when no msg is set', async () => {
		const page = await newSpecPage({
			components: [KolInputText],
			template: () => <kol-input-text _label="Label" _touched={true} />,
		});

		const input = page.root?.shadowRoot?.querySelector('input');

		expect(input?.getAttribute('aria-invalid')).toBeNull();
	});

	it('sets aria-invalid="true" when msg is a plain string (defaults to error type)', async () => {
		const page = await newSpecPage({
			components: [KolInputText],
			template: () => <kol-input-text _label="Label" _msg="Ein Fehler ist aufgetreten" _touched={true} />,
		});

		const input = page.root?.shadowRoot?.querySelector('input');

		expect(input?.getAttribute('aria-invalid')).toBe('true');
	});
});
