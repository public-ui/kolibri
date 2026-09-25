import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-skip-nav` — byte-identical to the predecessor on the develop branch
 * (2 required props plus `focus()`).
 */
const KOL_SKIP_NAV_PUBLIC_API: PublicApiContract = {
	_label: {
		kind: 'prop',
		type: 'LabelPropType',
		required: true,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).',
	},
	_links: {
		kind: 'prop',
		type: 'Stringified<LinkProps[]>',
		required: true,
		doc: 'Defines the list of links combined with their labels to render.',
	},
	focus: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Sets focus on the internal element.',
	},
};

describePublicApiContract({ tag: 'kol-skip-nav', component: 'skip-nav', pinnedApi: KOL_SKIP_NAV_PUBLIC_API, schemaInterface: 'SkipNavProps' });
