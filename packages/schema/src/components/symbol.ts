import type { Generic } from 'adopted-style-sheets';
import type { PropLabel } from '../props';

type RequiredProps = {
	symbol: string;
} & PropLabel;
type OptionalProps = NonNullable<unknown>;

type RequiredStates = RequiredProps;
type OptionalStates = NonNullable<unknown>;

export type SymbolProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type SymbolStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type SymbolAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
