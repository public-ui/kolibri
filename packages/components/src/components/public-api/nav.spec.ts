import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-nav` (6 props, 0 methods), extracted from the legacy `shadow.tsx` before its
 * skeleton migration (#11152).
 */
const KOL_NAV_PUBLIC_API: PublicApiContract = {
	_collapsible: {
		kind: 'prop',
		type: 'CollapsiblePropType',
		required: false,
		doc: 'Defines if navigation nodes can be collapsed or not. Enabled by default.',
		default: 'true',
	},
	_hasCompactButton: {
		kind: 'prop',
		type: 'HasCompactButtonPropType',
		required: false,
		doc: 'Creates a button below the navigation, that toggles _collapsible.',
		default: 'false',
	},
	_hasIconsWhenExpanded: {
		kind: 'prop',
		type: 'HasIconsWhenExpandedPropType',
		required: false,
		doc: 'Shows icons next to the navigation item labels, even when the navigation is not collapsed.',
		default: 'false',
	},
	_hideLabel: {
		kind: 'prop',
		type: 'HideLabelPropType',
		required: false,
		doc: 'Hides the caption by default and displays the caption text with a tooltip when the interactive element is focused or the mouse is over it.',
		default: 'false',
	},
	_label: {
		kind: 'prop',
		type: 'LabelPropType',
		required: true,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).',
	},
	_links: {
		kind: 'prop',
		type: 'Stringified<ButtonOrLinkOrTextWithChildrenProps[]>',
		required: true,
		doc: 'Defines the list of links, buttons or texts to render.',
	},
};

describePublicApiContract({ tag: 'kol-nav', component: 'nav', pinnedApi: KOL_NAV_PUBLIC_API, schemaInterface: 'NavProps' });
