import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import type { LoadingType } from '../../props';
import { BemRootNodeFC } from '../bem-root-node/component';

type ImageFCProps = {
	alt: string;
	loading?: LoadingType;
	sizes?: string;
	src: string;
	srcset?: string;
	handleError: (event: Event) => void;
	handleLoad: (event: Event) => void;
};

export const ImageFC: FC<ImageFCProps> = (props) => {
	const { alt, loading, sizes, src, srcset, handleError, handleLoad } = props;

	return (
		<BemRootNodeFC
			component="img"
			block="kol-image"
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
