import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-card`: 6 props plus `focus()` and `click()` — identical to the
 * predecessor `shadow.tsx` on the develop branch.
 */
const KOL_CARD_PUBLIC_API: PublicApiContract = {
	focus: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Sets focus on the internal element.',
	},
	click: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Clicks the primary interactive element inside this component.',
	},
	_hasCloser: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		default: 'false',
		doc: 'Defines whether the element can be closed. @TODO: Change type back to `HasCloserPropType` after Stencil#4663 has been resolved.',
	},
	_href: {
		kind: 'prop',
		type: 'HrefPropType',
		required: false,
		doc: 'Sets the target URI of the link or citation source.',
	},
	_label: {
		kind: 'prop',
		type: 'LabelPropType',
		required: true,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).',
	},
	_level: {
		kind: 'prop',
		type: 'HeadingLevel',
		required: false,
		default: '0',
		doc: 'Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.',
	},
	_on: {
		kind: 'prop',
		type: 'KoliBriCardEventCallbacks',
		required: false,
		doc: 'Defines the event callback functions for the component.',
	},
	_target: {
		kind: 'prop',
		type: 'LinkTargetPropType',
		required: false,
		doc: 'Defines where to open the link.',
	},
};

describePublicApiContract({ tag: 'kol-card', component: 'card', pinnedApi: KOL_CARD_PUBLIC_API, schemaInterface: 'CardProps' });
