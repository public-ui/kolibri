import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-abbr` (1 prop, 0 methods). The schema `AbbrProps` was removed in v5,
 * so the pin has no schema interface check.
 */
const KOL_ABBR_PUBLIC_API: PublicApiContract = {
	_label: {
		kind: 'prop',
		type: 'LabelPropType',
		required: false,
		doc: 'DEPRECATED! Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).',
	},
};

describePublicApiContract({ tag: 'kol-abbr', component: 'abbr', pinnedApi: KOL_ABBR_PUBLIC_API });
