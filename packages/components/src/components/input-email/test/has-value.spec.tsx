import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { KolInputEmail } from '../component';

describe('kol-input-email has-value class', () => {
	it('does not have has-value class initially when value is empty', async () => {
		const page = await newSpecPage({
			components: [KolInputEmail],
			template: () => <kol-input-email _label="Label" />,
		});

		const formField = page.root?.shadowRoot?.querySelector('.kol-form-field');
		expect(formField?.classList.contains('has-value')).toBe(false);
	});

	it('has has-value class initially when value is provided', async () => {
		const page = await newSpecPage({
			components: [KolInputEmail],
			template: () => <kol-input-email _label="Label" _value="test@example.com" />,
		});

		const formField = page.root?.shadowRoot?.querySelector('.kol-form-field');
		expect(formField?.classList.contains('has-value')).toBe(true);
	});

	it('immediately adds and removes has-value class on programmatic _value update', async () => {
		const page = await newSpecPage({
			components: [KolInputEmail],
			template: () => <kol-input-email _label="Label" />,
		});

		const formField = page.root?.shadowRoot?.querySelector('.kol-form-field');
		expect(formField?.classList.contains('has-value')).toBe(false);

		page.root!._value = 'user@example.com';
		await page.waitForChanges();
		expect(formField?.classList.contains('has-value')).toBe(true);

		page.root!._value = '';
		await page.waitForChanges();
		expect(formField?.classList.contains('has-value')).toBe(false);
	});
});
