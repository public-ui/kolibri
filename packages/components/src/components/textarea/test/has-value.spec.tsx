import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { KolTextarea } from '../component';

describe('kol-textarea has-value class', () => {
	it('does not have kol-form-field--has-value class initially when value is empty', async () => {
		const page = await newSpecPage({
			components: [KolTextarea],
			template: () => <kol-textarea _label="Label" />,
		});

		const formField = page.root?.shadowRoot?.querySelector('.kol-form-field');
		expect(formField?.classList.contains('kol-form-field--has-value')).toBe(false);
	});

	it('has kol-form-field--has-value class initially when value is provided', async () => {
		const page = await newSpecPage({
			components: [KolTextarea],
			template: () => <kol-textarea _label="Label" _value="Text content" />,
		});

		const formField = page.root?.shadowRoot?.querySelector('.kol-form-field');
		expect(formField?.classList.contains('kol-form-field--has-value')).toBe(true);
	});

	it('immediately adds and removes kol-form-field--has-value class on programmatic _value update', async () => {
		const page = await newSpecPage({
			components: [KolTextarea],
			template: () => <kol-textarea _label="Label" />,
		});

		const formField = page.root?.shadowRoot?.querySelector('.kol-form-field');
		expect(formField?.classList.contains('kol-form-field--has-value')).toBe(false);

		page.root!._value = 'Some typed message';
		await page.waitForChanges();
		expect(formField?.classList.contains('kol-form-field--has-value')).toBe(true);

		page.root!._value = '';
		await page.waitForChanges();
		expect(formField?.classList.contains('kol-form-field--has-value')).toBe(false);
	});
});
