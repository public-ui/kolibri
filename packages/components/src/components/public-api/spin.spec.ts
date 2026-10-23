import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-spin` (3 props, 0 methods).
 */
const KOL_SPIN_PUBLIC_API: PublicApiContract = {
	_label: {
		kind: 'prop',
		type: 'string',
		required: false,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).',
	},
	_show: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		doc: 'Makes the element show up.',
	},
	_variant: {
		kind: 'prop',
		type: 'SpinVariantType',
		required: false,
		doc: 'Defines which variant should be used for presentation.',
	},
};

describePublicApiContract({ tag: 'kol-spin', component: 'spin', pinnedApi: KOL_SPIN_PUBLIC_API });
