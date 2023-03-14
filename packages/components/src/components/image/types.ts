import { Generic } from '@a11y-ui/core';

/**
 * API
 */
type RequiredProps = {
	src: string;
	alt: string;
};
type OptionalProps = {
	loading: 'eager' | 'lazy';
	srcset: string;
};

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type ComponentApi = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
