import { KolInputTextTag } from '../../core/component-names';
import { executeInputSnapshotTests, executeSnapshotTests } from '../../utils/testing';

import { KolInputText } from './component';

executeInputSnapshotTests(
	KolInputTextTag,
	[KolInputText],
	{
		_spellCheck: true,
		_value: 'Value',
	},
	{ hasSmartButton: true },
);

executeSnapshotTests(
	KolInputTextTag,
	[KolInputText],
	[
		{ _label: 'Label', _name: 'field', _type: 'search' },
		{ _label: 'Label', _name: 'field', _type: 'search', _value: 'Value' },
		{ _label: 'Label', _name: 'field', _hasCounter: true, _maxLength: 10, _value: 'Value' },
		{ _label: 'Label', _name: 'field', _hasCounter: true, _value: 'Value' },
		{ _label: 'Label', _name: 'field', _hasCounter: true, _maxLength: 10, _maxLengthBehavior: 'soft', _value: 'Value' },
		{ _label: 'Label', _name: 'field', _maxLength: 10, _value: 'Value' },
		{ _label: 'Label', _name: 'field', _maxLength: 10, _maxLengthBehavior: 'soft', _value: 'Value' },
		{ _label: 'Label', _name: 'field', _pattern: '[a-z]+', _required: true },
	],
);
