import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import { bem } from '../../../schema/bem-registry';
import type { LoadingType } from '../../props';

type ImageFCProps = {
	alt: string;
	loading?: LoadingType;
	sizes?: string;
	src: string;
	srcset?: string;
	handleError: (event: Event) => void;
	handleLoad: (event: Event) => void;
};

const imageBem = bem.forBlock('kol-image');
const BEM_CLASS_IMAGE = imageBem();

export const ImageFC: FC<ImageFCProps> = (props) => {
	const { alt, loading, sizes, src, srcset, handleError, handleLoad } = props;

	return (
		<img
			class={BEM_CLASS_IMAGE}
			alt={alt}
			loading={loading}
			sizes={sizes || undefined}
			src={src}
			srcset={srcset || undefined}
			onError={(e) => handleError(e)}
			onLoad={(e) => handleLoad(e)}
		/>
	);
};
