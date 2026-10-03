import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-heading` (3 props, 0 methods).
 */
const KOL_HEADING_PUBLIC_API: PublicApiContract = {
	_label: {
		kind: 'prop',
		type: 'LabelWithExpertSlotPropType',
		required: true,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.',
	},
	_level: {
		kind: 'prop',
		type: 'HeadingLevel',
		required: false,
		default: '0',
		doc: 'Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.',
	},
	_secondaryHeadline: {
		kind: 'prop',
		type: 'string',
		required: false,
		doc: 'Defines the text of the secondary headline.',
	},
};

describePublicApiContract({ tag: 'kol-heading', component: 'heading', pinnedApi: KOL_HEADING_PUBLIC_API });
