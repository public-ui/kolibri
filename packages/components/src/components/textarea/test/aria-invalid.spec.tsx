import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { KolTextarea } from '../shadow';

describe('kol-textarea aria-invalid', () => {
	it('sets aria-invalid="true" when msg type is error and field is touched', async () => {
		const page = await newSpecPage({
			components: [KolTextarea],
			template: () => <kol-textarea _label="Label" _value="Value" _msg={{ _description: 'Es ist ein Fehler aufgetreten', _type: 'error' }} _touched={true} />,
		});

		const textarea = page.root?.shadowRoot?.querySelector('textarea');

		expect(textarea?.getAttribute('aria-invalid')).toBe('true');
	});

	it('does not set aria-invalid when msg type is not error', async () => {
		const page = await newSpecPage({
			components: [KolTextarea],
			template: () => <kol-textarea _label="Label" _value="Value" _msg={{ _description: 'Eine Info', _type: 'info' }} _touched={true} />,
		});

		const textarea = page.root?.shadowRoot?.querySelector('textarea');

		expect(textarea?.getAttribute('aria-invalid')).toBeNull();
	});

	it('does not set aria-invalid when field is not touched', async () => {
		const page = await newSpecPage({
			components: [KolTextarea],
			template: () => <kol-textarea _label="Label" _value="Value" _msg={{ _description: 'Es ist ein Fehler aufgetreten', _type: 'error' }} />,
		});

		const textarea = page.root?.shadowRoot?.querySelector('textarea');

		expect(textarea?.getAttribute('aria-invalid')).toBeNull();
	});

	it('does not set aria-invalid when no msg is set', async () => {
		const page = await newSpecPage({
			components: [KolTextarea],
			template: () => <kol-textarea _label="Label" _value="Value" _touched={true} />,
		});

		const textarea = page.root?.shadowRoot?.querySelector('textarea');

		expect(textarea?.getAttribute('aria-invalid')).toBeNull();
	});
});
