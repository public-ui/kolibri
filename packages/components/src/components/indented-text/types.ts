import type { Generic } from 'adopted-style-sheets';

type RequiredProps = NonNullable<unknown>;
type OptionalProps = NonNullable<unknown>;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;
export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
