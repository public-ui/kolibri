import type { ImageProps, ImageStates } from '@public-ui/schema';
import { mixMembers } from 'stencil-awesome-test';

export const getImageHtml = (props: ImageProps, additionalAttrs = ''): string => {
	const state = mixMembers<ImageProps, ImageStates>(
		{
			_alt: '', // ⚠ required
			_loading: 'lazy',
			_src: '', // ⚠ required
			_sizes: '',
			_srcset: '',
		},
		props,
	);
	const sizes = state._sizes ? ` sizes="${state._sizes}"` : '';
	const srcset = state._srcset ? ` srcset="${state._srcset}"` : '';
	return `<kol-image${additionalAttrs} class="kol-image">
  <mock:shadow-root>
    <img alt="${state._alt}" loading="${state._loading}" src="${state._src}"${sizes}${srcset}>
  </mock:shadow-root>
</kol-image>`;
};
