import { Generic } from '@a11y-ui/core';

type RequiredProps = {
	ariaLabel: string;
	symbol: string;
};
type OptionalProps = unknown;
export type KoliBriSymbolProps = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;

export type KoliBriSymbolStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriSymbolAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
