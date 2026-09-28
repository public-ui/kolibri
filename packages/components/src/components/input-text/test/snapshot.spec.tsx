import { KolInputTextTag } from '../../../core/component-names';
import type { InputTextProps } from '../../../schema';
import { executeInputSnapshotTests, executeSnapshotTests } from '../../../utils/testing';

import { KolInputText } from '../shadow';

executeInputSnapshotTests<InputTextProps>(
	KolInputTextTag,
	[KolInputText],
	{
		_spellCheck: true,
		_value: 'Value',
	},
	{ hasSmartButton: true },
);

executeSnapshotTests<InputTextProps>(
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
