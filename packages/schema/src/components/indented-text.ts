import type { Generic } from 'adopted-style-sheets';

type RequiredProps = NonNullable<unknown>;
type OptionalProps = NonNullable<unknown>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;

export type IndentedTextProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type IndentedTextStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type IndentedTextAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
