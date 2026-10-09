import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-abbr` (2 props, 0 methods). The schema `AbbrProps` was removed in v5,
 * so the pin has no schema interface check.
 */
const KOL_ABBR_PUBLIC_API: PublicApiContract = {
	_abbr: {
		kind: 'prop',
		type: 'string',
		required: false,
		doc: 'Defines the abbreviation that is shown, e.g. `z. B.`.',
	},
	_label: {
		kind: 'prop',
		type: 'LabelPropType',
		required: false,
		doc: 'Defines the long form of the abbreviation, e.g. `zum Beispiel`. It is shown as a tooltip on hover and keyboard focus and is announced as the description of the abbreviation.',
	},
};

describePublicApiContract({ tag: 'kol-abbr', component: 'abbr', pinnedApi: KOL_ABBR_PUBLIC_API });
