import { KolInputRangeTag } from '../../../core/component-names';
import type { InputRangeProps } from '../../../schema';
import { executeInputSnapshotTests, executeSnapshotTests } from '../../../utils/testing';

import { KolInputRange } from '../component';

executeInputSnapshotTests<InputRangeProps>(KolInputRangeTag, [KolInputRange], {
	_value: 5,
	_min: 1,
	_max: 10,
	_step: 1,
});

executeInputSnapshotTests<InputRangeProps>(KolInputRangeTag, [KolInputRange], {
	_value: 5,
	_min: 1,
	_max: 10,
	_step: 1,
	_suggestions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
});

executeSnapshotTests<InputRangeProps>(
	KolInputRangeTag,
	[KolInputRange],
	[
		{ _label: 'Label', _max: 10, _min: 1, _name: 'field', _value: 5 },
		{ _label: 'Label', _name: 'field', _value: '5' },
		{ _label: 'Label', _max: 100000, _min: -50, _name: 'field', _value: 10 },
		{ _label: 'Label', _name: 'field', _suggestions: [1, 2], _value: 1 },
	],
);
