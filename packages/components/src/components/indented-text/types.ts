import { Generic } from '@a11y-ui/core';

export type RequiredProps = unknown;
export type OptionalProps = unknown;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

export type RequiredStates = RequiredProps;
export type OptionalStates = OptionalProps;
export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
