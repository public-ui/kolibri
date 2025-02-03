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
