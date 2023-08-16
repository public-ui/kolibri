import { Generic } from '@a11y-ui/core';

import { PropImageSource } from '../../types/props/image-source';
import { Loading } from '../../utils/validators/loading';

/**
 * API for the Image component.
 */
type RequiredProps = {
	alt: string;
} & PropImageSource;
type OptionalProps = {
	loading: Loading;
	sizes: string;
	srcset: string;
};

type RequiredStates = RequiredProps & {
	loading: Loading;
};
type OptionalStates = {
	sizes: string;
	srcset: string;
};

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type ComponentApi = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
