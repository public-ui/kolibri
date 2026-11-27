import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-abbr` (1 prop, 0 methods). The schema `AbbrProps` was removed in v5,
 * so the pin has no schema interface check.
 */
const KOL_ABBR_PUBLIC_API: PublicApiContract = {
	_label: {
		kind: 'prop',
		type: 'LabelLangSegmentsPropType',
		required: false,
		doc: 'Defines the long form of the abbreviation, displayed in the tooltip of the slotted short form. Setting it makes the abbreviation focusable, so the tooltip is reachable by keyboard.',
	},
};

describePublicApiContract({ tag: 'kol-abbr', component: 'abbr', pinnedApi: KOL_ABBR_PUBLIC_API });
