import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-icon` (2 props, 0 methods).
 */
const KOL_ICON_PUBLIC_API: PublicApiContract = {
	_icons: {
		kind: 'prop',
		type: 'string',
		required: true,
		doc: 'Defines the icon classnames (e.g. `_icons="fa-solid fa-user"`).',
	},
	_label: {
		kind: 'prop',
		type: 'string',
		required: true,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).',
	},
};

describePublicApiContract({ tag: 'kol-icon', component: 'icon', pinnedApi: KOL_ICON_PUBLIC_API });
