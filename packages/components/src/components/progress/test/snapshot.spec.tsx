import { KolProcess } from '../shadow';
import { executeSnapshotTests } from '../../../utils/testing';
import type { ProgressProps } from '../../../schema';
import { KolProgressTag } from '../../../core/component-names';

const DEFAULT_PROPS = {
	_max: 42,
	_value: 17,
};

executeSnapshotTests<ProgressProps>(
	KolProgressTag,
	[KolProcess],
	[
		{
			...DEFAULT_PROPS,
			_label: 'Progress',
		},
		{
			...DEFAULT_PROPS,
			_label: 'Progress',
			_unit: 'cm',
		},
		{
			...DEFAULT_PROPS,
			_label: 'Progress',
			_variant: 'cycle',
		},
	],
);
