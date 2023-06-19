import { Generic } from '@a11y-ui/core';
import { Align } from '../../components';

type RequiredProps = {
	id: string;
	label: string;
};
type OptionalProps = {
	align: Align;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps & OptionalProps;
type OptionalStates = unknown;

export type KoliBriTooltipStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriTooltipAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
