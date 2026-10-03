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
		default: "'#003c78'",
		doc: 'Defines the color of the logo and label.',
	},
	_labeled: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		default: 'true',
		doc: 'Defines whether the component has a label.',
	},
};

describePublicApiContract({ tag: 'kol-kolibri', component: 'kolibri', pinnedApi: KOL_KOLIBRI_PUBLIC_API, schemaInterface: 'KolibriProps' });
