import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { KolInputPassword } from '../component';

describe('kol-input-password value reflection', () => {
	it('does not reflect the value to a host attribute, neither initially nor after input', async () => {
		const page = await newSpecPage({
			components: [KolInputPassword],
			template: () => <kol-input-password _label="Label" _value="Secret123" />,
		});

		expect(page.root?.hasAttribute('_value')).toBe(false);

		const input = page.root?.shadowRoot?.querySelector('input');
		input!.value = 'Typed123!';
		input!.dispatchEvent(new Event('input', { bubbles: true }));
		await page.waitForChanges();

		expect(input!.value).toBe('Typed123!');
		expect(page.root?.hasAttribute('_value')).toBe(false);
	});
});
