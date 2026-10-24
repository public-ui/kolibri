import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { KolInputText } from '../../input-text/component';
import { KolTextarea } from '../component';

describe('kol-textarea _spellCheck', () => {
	// In a real browser DOM, the reflected spellcheck property is set so the native textarea renders
	// spellcheck="false", disabling spellchecking as expected. In Stencil's spec-page harness mock document,
	// the property is not reflected, so the attribute is omitted.
	it('omits spellcheck attribute in spec-page harness mock DOM when _spellCheck is false, matching kol-input-text', async () => {
		const pageTextarea = await newSpecPage({
			components: [KolTextarea],
			template: () => <kol-textarea _label="Label" _name="field" _spellCheck={false} />,
		});
		await pageTextarea.waitForChanges();

		const textarea = pageTextarea.root?.shadowRoot?.querySelector('textarea');
		expect(textarea).not.toBeNull();
		expect(textarea?.hasAttribute('spellcheck')).toBe(false);

		const pageInput = await newSpecPage({
			components: [KolInputText],
			template: () => <kol-input-text _label="Label" _name="field" _spellCheck={false} />,
		});
		await pageInput.waitForChanges();

		const input = pageInput.root?.shadowRoot?.querySelector('input');
		expect(input).not.toBeNull();
		expect(input?.hasAttribute('spellcheck')).toBe(false);
	});

	it('sets spellcheck attribute on native textarea when _spellCheck is true, matching kol-input-text', async () => {
		const pageTextarea = await newSpecPage({
			components: [KolTextarea],
			template: () => <kol-textarea _label="Label" _name="field" _spellCheck={true} />,
		});
		await pageTextarea.waitForChanges();

		const textarea = pageTextarea.root?.shadowRoot?.querySelector('textarea');
		expect(textarea).not.toBeNull();
		expect(textarea?.hasAttribute('spellcheck')).toBe(true);

		const pageInput = await newSpecPage({
			components: [KolInputText],
			template: () => <kol-input-text _label="Label" _name="field" _spellCheck={true} />,
		});
		await pageInput.waitForChanges();

		const input = pageInput.root?.shadowRoot?.querySelector('input');
		expect(input).not.toBeNull();
		expect(input?.hasAttribute('spellcheck')).toBe(true);
	});
});
