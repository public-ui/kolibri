import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-avatar` (3 props, 0 methods).
 */
const KOL_AVATAR_PUBLIC_API: PublicApiContract = {
	_color: {
		kind: 'prop',
		type: 'string | ColorPair',
		required: false,
		doc: 'Defines the backgroundColor and foregroundColor.',
	},
	_label: {
		kind: 'prop',
		type: 'string',
		required: true,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).',
	},
	_src: {
		kind: 'prop',
		type: 'string',
		required: false,
		doc: 'Sets the image `src` attribute to the given string.',
	},
};

describePublicApiContract({ tag: 'kol-avatar', component: 'avatar', pinnedApi: KOL_AVATAR_PUBLIC_API });
