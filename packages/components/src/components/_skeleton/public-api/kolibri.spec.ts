import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-kolibri` (2 props, 0 methods), extracted from the legacy `shadow.tsx`
 * before its skeleton migration.
 */
const KOL_KOLIBRI_PUBLIC_API: PublicApiContract = {
	_color: {
		kind: 'prop',
		type: 'Stringified<PropColor>',
		required: false,
		doc: 'Defines the color of the logo and label.',
		default: "'#003c78'",
	},
	_labeled: {
		kind: 'prop',
		type: 'LabeledPropType',
		required: false,
		doc: 'Defines whether the component has a label.',
		default: 'true',
	},
};

describePublicApiContract({ tag: 'kol-kolibri', component: 'kolibri', pinnedApi: KOL_KOLIBRI_PUBLIC_API, schemaInterface: 'KolibriProps' });
