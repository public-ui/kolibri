import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { KolTextareaTag } from '../../../core/component-names';
import type { TextareaProps } from '../../../schema';
import { executeInputSnapshotTests, executeSnapshotTests } from '../../../utils/testing';
import { KolInputText } from '../../input-text/component';
import { KolTextarea } from '../component';

executeInputSnapshotTests<TextareaProps>(KolTextareaTag, [KolTextarea], {
	_rows: 5,
	_spellCheck: true,
	_value: 'Value',
});

executeSnapshotTests<TextareaProps>(
	KolTextareaTag,
	[KolTextarea],
	[
		{ _label: 'Label', _name: 'field', _hasCounter: true, _maxLength: 10, _value: 'Value' },
		{ _label: 'Label', _name: 'field', _hasCounter: true, _maxLength: 10, _maxLengthBehavior: 'soft', _value: 'Value' },
		{ _label: 'Label', _name: 'field', _maxLength: 10, _value: 'Value' },
		{ _label: 'Label', _name: 'field', _resize: 'none', _value: 'Value' },
		{ _label: 'Label', _name: 'field', _placeholder: 'Platzhalter', _required: true },
		{ _label: 'Label', _name: 'field', _spellCheck: false },
	],
);

describe('kol-textarea _spellCheck', () => {
	it('should not set spellcheck attribute on native textarea when _spellCheck is false, matching kol-input-text', async () => {
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

	it('should set spellcheck attribute on native textarea when _spellCheck is true, matching kol-input-text', async () => {
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
