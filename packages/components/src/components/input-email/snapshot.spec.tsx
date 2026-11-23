import { KolInputEmailTag } from '../../core/component-names';
import { executeInputSnapshotTests, executeSnapshotTests } from '../../utils/testing';

import { KolInputEmail } from './component';

executeInputSnapshotTests(
	KolInputEmailTag,
	[KolInputEmail],
	{
		_value: 'email@example.com',
	},
	{ hasSmartButton: true },
);

executeInputSnapshotTests(
	KolInputEmailTag,
	[KolInputEmail],
	{
		_value: 'email@example.com',
		_suggestions: ['email1@example.com', 'email2@example.com', 'email3@example.com'],
	},
	{ hasSmartButton: true },
);

executeSnapshotTests(
	KolInputEmailTag,
	[KolInputEmail],
	[
		{ _label: 'Label', _name: 'field', _multiple: true, _value: 'email@example.com' },
		{ _label: 'Label', _name: 'field', _hasCounter: true, _maxLength: 30, _value: 'email@example.com' },
		{ _label: 'Label', _name: 'field', _maxLength: 30, _value: 'email@example.com' },
		{ _label: 'Label', _name: 'field', _pattern: '.+@example\\.com', _required: true },
	],
);
