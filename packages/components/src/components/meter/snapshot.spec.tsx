import { KolMeterTag } from '../../core/component-names';
import { executeSnapshotTests } from '../../utils/testing';
import { KolMeter } from './component';

executeSnapshotTests(
	KolMeterTag,
	[KolMeter],
	[
		{ _label: 'Label', _max: 100, _value: 0 },
		{ _label: 'Label', _max: 100, _value: 42 },
		{ _label: 'Label', _max: 100, _value: 100 },

		{ _label: 'Label', _max: 1, _min: 0, _value: 0 },
		{ _label: 'Label', _max: 1, _min: 0, _value: 0.5 },
		{ _label: 'Label', _max: 1, _min: 0, _value: 1 },

		{ _label: 'Label', _max: 100, _value: 30, _low: 25, _high: 75, _optimum: 50 },
		{ _label: 'Label', _max: 100, _value: 10, _low: 25, _high: 75, _optimum: 50 },
		{ _label: 'Label', _max: 100, _value: 90, _low: 25, _high: 75, _optimum: 50 },

		{ _label: 'Label', _max: 100, _value: 10, _low: 25, _high: 75, _optimum: 10 },
		{ _label: 'Label', _max: 100, _value: 90, _low: 25, _high: 75, _optimum: 90 },

		{ _label: 'Label', _max: 42, _value: 21, _unit: 'kg' },
	],
);
