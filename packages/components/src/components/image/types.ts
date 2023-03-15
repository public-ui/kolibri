import { Generic } from '@a11y-ui/core';
import { Loading } from '../../utils/validators/loading';

/**
 * API
 */
type RequiredProps = {
	src: string;
	alt: string;
};
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

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type ComponentApi = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
