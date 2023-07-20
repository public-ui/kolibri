import { Generic } from '@a11y-ui/core';

import { PropAriaLabel } from '../../types/props/aria-label';
import { PropLabel } from '../../types/props/label';

type RequiredProps = {
	icon: string;
};
type OptionalProps = {
	part: string;
} & PropAriaLabel &
	PropLabel;
export type KoliBriIconProps = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;

export type KoliBriIconStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriIconAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
