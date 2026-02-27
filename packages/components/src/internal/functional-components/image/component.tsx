import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import type { FunctionalComponentProps } from '../generic-types';
import type { ImageApi } from './api';

export const ImageFC: FC<FunctionalComponentProps<ImageApi>> = (props) => {
	const { alt, loading, sizes, src, srcset } = props;

	return <img class="kol-image" alt={alt} loading={loading} sizes={sizes || undefined} src={src} srcset={srcset || undefined} />;
};
