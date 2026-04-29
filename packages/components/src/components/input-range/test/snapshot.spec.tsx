import { KolInputRangeTag } from '../../../core/component-names';
import type { InputRangeProps } from '../../../schema';
import { executeInputSnapshotTests } from '../../../utils/testing';

import { KolInputRange } from '../shadow';

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

executeInputSnapshotTests<InputRangeProps>(KolInputRangeTag, [KolInputRange], {
	_value: 50,
	_min: 0,
	_max: 100,
	_step: 25,
	_list: [
		{ value: 0, label: '0%' },
		{ value: 25, label: '25%' },
		{ value: 50, label: '50%' },
		{ value: 75, label: '75%' },
		{ value: 100, label: '100%' },
	],
});
