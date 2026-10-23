import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-image` (6 props, 0 methods).
 */
const KOL_IMAGE_PUBLIC_API: PublicApiContract = {
	_alt: {
		kind: 'prop',
		type: 'string',
		required: true,
		doc: 'Sets the alternative text of the image.',
	},
	_loading: {
		kind: 'prop',
		type: 'LoadingType',
		required: false,
		doc: 'Defines the loading mode for the image.',
	},
	_on: {
		kind: 'prop',
		type: 'KoliBriImageEventCallbacks',
		required: false,
		doc: 'Defines callbacks for image load events (`onError`, `onLoad`).',
	},
	_sizes: {
		kind: 'prop',
		type: 'string',
		required: false,
		doc: 'Defines the image sizes for different screen resolutions, supporting _srcset.',
	},
	_src: {
		kind: 'prop',
		type: 'string',
		required: true,
		doc: 'Sets the image `src` attribute to the given string.',
	},
	_srcset: {
		kind: 'prop',
		type: 'string',
		required: false,
		doc: 'Sets a list of source URLs with widths of the images.',
	},
};

describePublicApiContract({ tag: 'kol-image', component: 'image', pinnedApi: KOL_IMAGE_PUBLIC_API });
