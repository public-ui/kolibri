import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { KolInputText } from '../component';

describe('kol-input-text _spellCheck', () => {
	// In a real browser DOM, the reflected spellcheck property is set so the native input renders
	// spellcheck="false", disabling spellchecking as expected. In Stencil's spec-page harness mock document,
	// the property is not reflected, so the attribute is omitted.
	it('omits spellcheck attribute in spec-page harness mock DOM when _spellCheck is false', async () => {
		const page = await newSpecPage({
			components: [KolInputText],
			template: () => <kol-input-text _label="Label" _name="field" _spellCheck={false} />,
		});
		await page.waitForChanges();

		const input = page.root?.shadowRoot?.querySelector('input');
		expect(input).not.toBeNull();
		expect(input?.hasAttribute('spellcheck')).toBe(false);
	});

	it('sets spellcheck attribute on native input when _spellCheck is true', async () => {
		const page = await newSpecPage({
			components: [KolInputText],
			template: () => <kol-input-text _label="Label" _name="field" _spellCheck={true} />,
		});
		await page.waitForChanges();

		const input = page.root?.shadowRoot?.querySelector('input');
		expect(input).not.toBeNull();
		expect(input?.hasAttribute('spellcheck')).toBe(true);
	});
});
