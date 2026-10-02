import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-meter` (9 props, 0 methods).
 */
const KOL_METER_PUBLIC_API: PublicApiContract = {
	_high: {
		kind: 'prop',
		type: 'number',
		required: false,
		doc: 'From this value to the max value is the high range of the meter. Below this value is the middle range.',
	},
	_label: {
		kind: 'prop',
		type: 'string',
		required: true,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).',
	},
	_low: {
		kind: 'prop',
		type: 'number',
		required: false,
		doc: 'From this value to the min value is the low range of the meter. Above this value is the middle range.',
	},
	_max: {
		kind: 'prop',
		type: 'number',
		required: false,
		default: '1',
		doc: 'Defines the maximum value of the element. Default like native component.',
	},
	_min: {
		kind: 'prop',
		type: 'number',
		required: false,
		default: '0',
		doc: 'Defines the minimum value of the element. Default like native component.',
	},
	_optimum: {
		kind: 'prop',
		type: 'number',
		required: false,
		doc: 'Indicates the optimal range of the element. If this lies in the high range, the high range will be optimum, the middle range will be suboptimum and the low range will be critical. If this lies in the low range, the low range will be optimum, the middle range will be suboptimum and the high range will be critical. If this lies in the middle range, both low and high range will be suboptimum and nothing will be critical.',
	},
	_orientation: {
		kind: 'prop',
		type: 'OrientationPropType',
		required: false,
		default: "'horizontal'",
		doc: 'Defines whether the meter bar is displayed horizontally or vertically.',
	},
	_unit: {
		kind: 'prop',
		type: 'string',
		required: false,
		default: "'%'",
		doc: 'Defines the unit of the value.',
	},
	_value: {
		kind: 'prop',
		type: 'number',
		required: true,
		doc: 'Defines the value of the element. Is capped between min and max.',
	},
};

describePublicApiContract({ tag: 'kol-meter', component: 'meter', pinnedApi: KOL_METER_PUBLIC_API });
