import { Generic } from '@a11y-ui/core';

type RequiredProps = {
	summary: string;
};
type OptionalProps = {
	open: boolean;
};
export type KoliBriDetailsProps = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;

export type KoliBriDetailsStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriDetailsAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
