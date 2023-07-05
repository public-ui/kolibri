import { Generic } from '@a11y-ui/core';
import { Align } from '../../components';
import { PropLabel } from '../../types/props';

type RequiredProps = {
	id: string;
} & PropLabel;
type OptionalProps = {
	align: Align;
};
export type KoliBriTooltipProps = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps & OptionalProps;
type OptionalStates = unknown;

export type KoliBriTooltipStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriTooltipAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
