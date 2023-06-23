import { Generic } from '@a11y-ui/core';

type RequiredProps = {
	label: string;
	symbol: string;
};
type OptionalProps = {
	ariaLabel: string;
};
export type KoliBriSymbolProps = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;

export type KoliBriSymbolStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriSymbolAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
