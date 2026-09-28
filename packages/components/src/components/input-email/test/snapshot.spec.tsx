import { KolInputEmailTag } from '../../../core/component-names';
import type { InputEmailProps } from '../../../schema';
import { executeInputSnapshotTests, executeSnapshotTests } from '../../../utils/testing';

import { KolInputEmail } from '../shadow';

executeInputSnapshotTests<InputEmailProps>(
	KolInputEmailTag,
	[KolInputEmail],
	{
		_value: 'email@example.com',
	},
	{ hasSmartButton: true },
);

executeInputSnapshotTests<InputEmailProps>(
	KolInputEmailTag,
	[KolInputEmail],
	{
		_value: 'email@example.com',
		_suggestions: ['email1@example.com', 'email2@example.com', 'email3@example.com'],
	},
	{ hasSmartButton: true },
);

// `_hasCounter` is a prop of the element, but `InputEmailProps` does not declare it.
executeSnapshotTests<InputEmailProps & { _hasCounter?: boolean }>(
	KolInputEmailTag,
	[KolInputEmail],
	[
		{ _label: 'Label', _name: 'field', _multiple: true, _value: 'email@example.com' },
		{ _label: 'Label', _name: 'field', _hasCounter: true, _maxLength: 30, _value: 'email@example.com' },
		{ _label: 'Label', _name: 'field', _maxLength: 30, _value: 'email@example.com' },
		{ _label: 'Label', _name: 'field', _pattern: '.+@example\\.com', _required: true },
	],
);
