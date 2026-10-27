import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-version` (1 prop, 0 methods).
 */
const KOL_VERSION_PUBLIC_API: PublicApiContract = {
	_label: {
		kind: 'prop',
		type: 'LabelPropType',
		required: true,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).',
	},
};

describePublicApiContract({ tag: 'kol-version', component: 'version', pinnedApi: KOL_VERSION_PUBLIC_API, schemaInterface: 'VersionProps' });
