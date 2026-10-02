import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-quote` (4 props, 0 methods).
 */
const KOL_QUOTE_PUBLIC_API: PublicApiContract = {
	_href: {
		kind: 'prop',
		type: 'string',
		required: true,
		doc: 'Sets the target URI of the link or citation source.',
	},
	_label: {
		kind: 'prop',
		type: 'string',
		required: false,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).',
	},
	_quote: {
		kind: 'prop',
		type: 'string',
		required: true,
		doc: 'Defines the text of the quote.',
	},
	_variant: {
		kind: 'prop',
		type: 'QuoteVariantType',
		required: false,
		default: "'inline'",
		doc: 'Defines which variant should be used for presentation.',
	},
};

describePublicApiContract({ tag: 'kol-quote', component: 'quote', pinnedApi: KOL_QUOTE_PUBLIC_API });
