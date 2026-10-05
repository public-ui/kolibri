import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-toolbar`: 3 props plus `focus()` and `click()` — identical to the
 * predecessor `shadow.tsx` on the develop branch.
 */
const KOL_TOOLBAR_PUBLIC_API: PublicApiContract = {
	focus: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Sets focus on the currently active toolbar item.',
	},
	click: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Triggers a click on the currently active toolbar item.',
	},
	_label: {
		kind: 'prop',
		type: 'string',
		required: true,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).',
	},
	_items: {
		kind: 'prop',
		type: 'ToolbarItemsPropType',
		required: true,
		doc: 'Defines the functional elements of toolbar to render (e.g. kol-link, kol-button).',
	},
	_orientation: {
		kind: 'prop',
		type: 'OrientationPropType',
		required: false,
		doc: 'Defines whether the orientation of the component is horizontal or vertical.',
	},
};

describePublicApiContract({ tag: 'kol-toolbar', component: 'toolbar', pinnedApi: KOL_TOOLBAR_PUBLIC_API, schemaInterface: 'ToolbarProps' });
