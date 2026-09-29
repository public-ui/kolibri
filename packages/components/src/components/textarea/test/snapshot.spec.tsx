import { KolTextareaTag } from '../../../core/component-names';
import type { TextareaProps } from '../../../schema';
import { executeInputSnapshotTests, executeSnapshotTests } from '../../../utils/testing';

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
	],
);
