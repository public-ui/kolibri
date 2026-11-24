import { KolInputPasswordTag } from '../../core/component-names';
import { executeInputSnapshotTests, executeSnapshotTests } from '../../utils/testing';

import { KolInputPassword } from './component';

executeInputSnapshotTests(
	KolInputPasswordTag,
	[KolInputPassword],
	{
		_value: 'Value',
	},
	{ hasSmartButton: true },
);

executeSnapshotTests(
	KolInputPasswordTag,
	[KolInputPassword],
	[
		{ _label: 'Label', _name: 'field', _visibilityToggle: true, _value: 'Value' },
		{ _label: 'Label', _name: 'field', _variant: 'visibility-toggle', _value: 'Value' },
		{ _label: 'Label', _name: 'field', _hasCounter: true, _maxLength: 10, _value: 'Value' },
		{ _label: 'Label', _name: 'field', _maxLength: 10, _value: 'Value' },
		{ _label: 'Label', _name: 'field', _pattern: '[a-z]+', _required: true },
	],
);
