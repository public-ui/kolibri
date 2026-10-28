import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-meter` (9 props, 0 methods).
 */
const KOL_METER_PUBLIC_API: PublicApiContract = {
	_high: {
		kind: 'prop',
		type: 'HighPropType',
		required: false,
		doc: 'From this value to the max value is the high range of the meter. Below this value is the middle range.',
	},
	_label: {
		kind: 'prop',
		type: 'LabelPropType',
		required: true,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).',
	},
	_low: {
		kind: 'prop',
		type: 'LowPropType',
		required: false,
		doc: 'From this value to the min value is the low range of the meter. Above this value is the middle range.',
	},
	_max: {
		kind: 'prop',
		type: 'MaxPropType',
		required: false,
		doc: 'Defines the maximum value of the element. Default like native component.',
		default: '1',
	},
	_min: {
		kind: 'prop',
		type: 'MinPropType',
		required: false,
		doc: 'Defines the minimum value of the element. Default like native component.',
		default: '0',
	},
	_optimum: {
		kind: 'prop',
		type: 'OptimumPropType',
		required: false,
		doc: 'Indicates the optimal range of the element. If this lies in the high range, the high range will be optimum, the middle range will be suboptimum and the low range will be critical. If this lies in the low range, the low range will be optimum, the middle range will be suboptimum and the high range will be critical. If this lies in the middle range, both low and high range will be suboptimum and nothing will be critical.',
	},
	_orientation: {
		kind: 'prop',
		type: 'OrientationPropType',
		required: false,
		doc: 'Defines whether the meter bar is displayed horizontally or vertically.',
		default: "'horizontal'",
	},
	_unit: {
		kind: 'prop',
		type: 'UnitPropType',
		required: false,
		doc: 'Defines the unit of the value.',
		default: "'%'",
	},
	_value: {
		kind: 'prop',
		type: 'ClampedNumberValuePropType',
		required: true,
		doc: 'Defines the value of the element. Is capped between min and max.',
	},
};

describePublicApiContract({ tag: 'kol-meter', component: 'meter', pinnedApi: KOL_METER_PUBLIC_API });
