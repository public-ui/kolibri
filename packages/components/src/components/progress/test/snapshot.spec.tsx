import { KolProgress } from '../shadow';
import { executeSnapshotTests } from '../../../utils/testing';
import { ProgressProps } from '../../../schema';
import { KolProgressTag } from '../../../core/component-names';

executeSnapshotTests<ProgressProps>(
	KolProgressTag,
	[KolProgress],
	[
		{ _label: 'Label', _variant: 'bar', _max: 100, _value: 0 },
		{ _label: 'Label', _variant: 'bar', _max: 100, _value: 42 },
		{ _label: 'Label', _variant: 'bar', _max: 100, _value: 100 },
		{ _label: 'Label', _variant: 'cycle', _max: 100, _value: 0 },
		{ _label: 'Label', _variant: 'cycle', _max: 100, _value: 42 },
		{ _label: 'Label', _variant: 'cycle', _max: 100, _value: 100 },

		{ _label: 'Label', _variant: 'bar', _max: 42, _value: 0 },
		{ _label: 'Label', _variant: 'bar', _max: 42, _value: 17 },
		{ _label: 'Label', _variant: 'bar', _max: 42, _value: 100 },
		{ _label: 'Label', _variant: 'cycle', _max: 42, _value: 0 },
		{ _label: 'Label', _variant: 'cycle', _max: 42, _value: 17 },
		{ _label: 'Label', _variant: 'cycle', _max: 42, _value: 42 },

		{ _label: 'Label', _variant: 'bar', _max: 42, _value: 0, _unit: 'kg' },
		{ _label: 'Label', _variant: 'bar', _max: 42, _value: 21, _unit: 'kg' },
		{ _label: 'Label', _variant: 'cycle', _max: 42, _value: 0, _unit: 'kg' },
		{ _label: 'Label', _variant: 'cycle', _max: 42, _value: 21, _unit: 'kg' },
	],
);
