import { Generic } from '@a11y-ui/core';

type RequiredProps = {
	icon: string;
};
type OptionalProps = {
	/**
	 * @deprecated
	 */
	ariaLabel: string;
	label: string;
	part: string;
};
export type KoliBriIconProps = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;

export type KoliBriIconStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriIconAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
