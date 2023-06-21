import { Generic } from '@a11y-ui/core';

type RequiredProps = {
	ariaLabel: string;
	icon: string;
};
type OptionalProps = {
	part: string;
};
export type KoliBriIconProps = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;

export type KoliBriIconStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriIconAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
