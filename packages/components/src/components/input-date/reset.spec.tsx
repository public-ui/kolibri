import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { KolInputDate } from './component';

describe('kol-input-date reset', () => {
	it('immediately removes the has-value class and clears the field', async () => {
		const page = await newSpecPage({
			components: [KolInputDate],
			template: () => <kol-input-date _label="Label" _type="date" _value="2025-01-01" />,
		});

		const formField = page.root?.shadowRoot?.querySelector('.kol-form-field');
		expect(formField?.classList.contains('has-value')).toBe(true);

		const component = page.root as HTMLKolInputDateElement;
		await component.reset();
		await page.waitForChanges();
		expect(formField?.classList.contains('has-value')).toBe(false);
		expect(page.root?.shadowRoot?.querySelector('input')?.value).toBe('');
	});
});
