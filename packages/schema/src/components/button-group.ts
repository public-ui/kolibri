import type { Generic } from 'adopted-style-sheets';

type RequiredProps = NonNullable<unknown>;
type OptionalProps = NonNullable<unknown>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;

export type ButtonGroupProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type ButtonGroupStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type ButtonGroupAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
