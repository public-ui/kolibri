import { Generic } from '@a11y-ui/core';
import { AriaLabel } from '../../types/aria-label';

type RequiredProps = {
	icon: string;
};
type OptionalProps = {
	label: string;
	part: string;
} & AriaLabel;
export type KoliBriIconProps = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;

export type KoliBriIconStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriIconAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
