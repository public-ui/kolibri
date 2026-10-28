import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-badge`: 4 props plus `focus()`. Changing any of them is a breaking
 * change and has to be decided, not slipped in — see the contract test below.
 */
const KOL_BADGE_PUBLIC_API: PublicApiContract = {
	focus: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Sets focus on the internal element.',
	},
	_color: {
		kind: 'prop',
		type: 'Stringified<PropColor>',
		required: false,
		default: "'#000'",
		doc: 'Defines the backgroundColor and foregroundColor.',
	},
	_icons: {
		kind: 'prop',
		type: 'Stringified<KoliBriIconsProp>',
		required: false,
		doc: 'Defines the icon classnames.',
	},
	_label: {
		kind: 'prop',
		type: 'LabelPropType',
		required: true,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).',
	},
	_smartButton: {
		kind: 'prop',
		type: 'Stringified<InternalButtonProps>',
		required: false,
		doc: 'Allows to add a button with an arbitrary action within the element (_hide-label only).',
	},
};

describePublicApiContract({ tag: 'kol-badge', component: 'badge', pinnedApi: KOL_BADGE_PUBLIC_API, schemaInterface: 'BadgeProps' });
