import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { KolInputText } from '../component';

describe('kol-input-text has-value class', () => {
	it('does not have has-value class initially when value is empty', async () => {
		const page = await newSpecPage({
			components: [KolInputText],
			template: () => <kol-input-text _label="Label" />,
		});

		const formField = page.root?.shadowRoot?.querySelector('.kol-form-field');
		expect(formField?.classList.contains('has-value')).toBe(false);
	});

	it('has has-value class initially when value is provided', async () => {
		const page = await newSpecPage({
			components: [KolInputText],
			template: () => <kol-input-text _label="Label" _value="Hello" />,
		});

		const formField = page.root?.shadowRoot?.querySelector('.kol-form-field');
		expect(formField?.classList.contains('has-value')).toBe(true);
	});

	it('immediately adds and removes has-value class on programmatic _value update', async () => {
		const page = await newSpecPage({
			components: [KolInputText],
			template: () => <kol-input-text _label="Label" />,
		});

		const formField = page.root?.shadowRoot?.querySelector('.kol-form-field');
		expect(formField?.classList.contains('has-value')).toBe(false);

		page.root!._value = 'Hello World';
		await page.waitForChanges();
		expect(formField?.classList.contains('has-value')).toBe(true);

		page.root!._value = '';
		await page.waitForChanges();
		expect(formField?.classList.contains('has-value')).toBe(false);
	});
});
