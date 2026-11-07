import type { Generic } from 'adopted-style-sheets';

import type { LoadingType } from '../../internal/props';
import type { AltPropType, SizesPropType, SrcPropType, SrcsetPropType } from '../props';
import type { EventCallback } from '../types';

export type KoliBriImageEventCallbacks = {
	onError?: EventCallback<Event>;
	onLoad?: EventCallback<Event>;
};

type RequiredImageProps = {
	alt: AltPropType;
	src: SrcPropType;
};
type OptionalImageProps = {
	loading: LoadingType;
	on: KoliBriImageEventCallbacks;
	sizes: SizesPropType;
	srcset: SrcsetPropType;
};

export type ImageProps = Generic.Element.Members<RequiredImageProps, OptionalImageProps>;
