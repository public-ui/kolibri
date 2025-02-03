import type { Generic } from 'adopted-style-sheets';

import type { Loading, PropImageSource } from '../props';

type RequiredProps = {
	alt: string; // TODO: PropAlt ??? LABEL?!
} & PropImageSource;
type OptionalProps = {
	loading: Loading; // TODO: PropLoading
	sizes: string; // TODO: PropSizes
	srcset: string; // TODO: PropSrcSet
};

type RequiredStates = RequiredProps & {
	loading: Loading;
};
type OptionalStates = {
	sizes: string;
	srcset: string;
};

export type ImageProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type ImageStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type ImageAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
