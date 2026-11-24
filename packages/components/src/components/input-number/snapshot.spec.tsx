import { KolInputNumberTag } from '../../core/component-names';
import { executeInputSnapshotTests, executeSnapshotTests } from '../../utils/testing';
import { KolInputNumber } from './component';

executeInputSnapshotTests(
	KolInputNumberTag,
	[KolInputNumber],
	{
		// _value: 'Value'
	},
	{ hasSmartButton: true },
);

executeInputSnapshotTests(
	KolInputNumberTag,
	[KolInputNumber],
	{
		// _value: 'Value'
		_suggestions: [1, 2, 3],
	},
	{ hasSmartButton: true },
);

executeSnapshotTests(
	KolInputNumberTag,
	[KolInputNumber],
	[
		{ _label: 'Label', _name: 'field', _max: 10, _min: 1, _step: 0.5, _value: 5 },
		{ _label: 'Label', _name: 'field', _value: '5' },
		{ _label: 'Label', _name: 'field', _value: null },
		{ _label: 'Label', _name: 'field', _value: 0 },
		{ _label: 'Label', _name: 'field', _placeholder: '0', _required: true },
	],
);
