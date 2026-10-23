import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-tabs` — same props, types and defaults as the predecessor `shadow.tsx`
 * on the develop branch (7 props + focus and click). The one deviation is the `_on` JSDoc, which
 * the predecessor carried in German; it was translated on reviewer request, which changes only the
 * generated documentation, not the API surface.
 */
const KOL_TABS_PUBLIC_API: PublicApiContract = {
	focus: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Sets focus on the current tab button.',
	},
	click: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Triggers a click on the currently selected tab.',
	},
	_align: {
		kind: 'prop',
		type: 'AlignPropType',
		required: false,
		default: "'top'",
		doc: 'Defines the visual orientation of the component.',
	},
	_behavior: {
		kind: 'prop',
		type: 'TabBehaviorPropType',
		required: false,
		doc: 'Defines which behavior is active.',
	},
	_hasCreateButton: {
		kind: 'prop',
		type: 'HasCreateButtonPropType',
		required: false,
		default: 'false',
		doc: 'Defines whether the element has a create button.',
	},
	_label: {
		kind: 'prop',
		type: 'LabelPropType',
		required: true,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).',
	},
	_on: {
		kind: 'prop',
		type: 'KoliBriTabsCallbacks',
		required: false,
		doc: 'Defines the callback functions for tabs events.',
	},
	_selected: {
		kind: 'prop',
		type: 'number',
		required: false,
		default: '0',
		doc: 'Defines which tab is active.',
	},
	_tabs: {
		kind: 'prop',
		type: 'Stringified<TabButtonProps[]>',
		required: true,
		doc: 'Defines the tab captions.',
	},
};

describePublicApiContract({ tag: 'kol-tabs', component: 'tabs', pinnedApi: KOL_TABS_PUBLIC_API, schemaInterface: 'TabsProps' });
