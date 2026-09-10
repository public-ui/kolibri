import { KolProgressTag } from '../../core/component-names';
import { executeSnapshotTests } from '../../utils/testing';
import { KolProgress } from './component';

executeSnapshotTests<Partial<Pick<KolProgress, '_label' | '_max' | '_unit' | '_value' | '_variant'>>>(
	KolProgressTag,
	[KolProgress],
	[
		{ _label: 'Label', _variant: 'bar', _max: 100, _value: 0 },
		{ _label: 'Label', _variant: 'bar', _max: 100, _value: 42 },
		{ _label: 'Label', _variant: 'bar', _max: 100, _value: 100 },
		{ _label: 'more than max', _variant: 'bar', _max: 100, _value: 200 },
		{ _label: 'less than min', _variant: 'bar', _max: 100, _value: -100 },
		{ _label: 'Label', _variant: 'cycle', _max: 100, _value: 0 },
		{ _label: 'Label', _variant: 'cycle', _max: 100, _value: 42 },
		{ _label: 'Label', _variant: 'cycle', _max: 100, _value: 100 },
		{ _label: 'more than max', _variant: 'cycle', _max: 100, _value: 200 },
		{ _label: 'less than min', _variant: 'cycle', _max: 100, _value: -100 },

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
