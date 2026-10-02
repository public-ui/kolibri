import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-progress` (5 props, 0 methods).
 */
const KOL_PROGRESS_PUBLIC_API: PublicApiContract = {
	_label: {
		kind: 'prop',
		type: 'string',
		required: false,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).',
	},
	_max: {
		kind: 'prop',
		type: 'number',
		required: true,
		doc: 'Defines the maximum value of the element.',
	},
	_unit: {
		kind: 'prop',
		type: 'string',
		required: false,
		doc: 'Defines the unit of the step values (not shown).',
	},
	_value: {
		kind: 'prop',
		type: 'number',
		required: true,
		doc: 'Defines the value of the element.',
	},
	_variant: {
		kind: 'prop',
		type: 'ProgressVariantType',
		required: false,
		doc: 'Defines which variant should be used for presentation.',
	},
};

describePublicApiContract({ tag: 'kol-progress', component: 'progress', pinnedApi: KOL_PROGRESS_PUBLIC_API });
