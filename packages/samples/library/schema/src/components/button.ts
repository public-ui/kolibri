import type { Generic } from 'adopted-style-sheets';

export type RequiredButtonProps = NonNullable<unknown>;
export type OptionalButtonProps = NonNullable<unknown>;

export type RequiredButtonStates = RequiredButtonProps;
export type OptionalButtonStates = OptionalButtonProps;

export type ButtonProps = Generic.Element.Members<RequiredButtonProps, OptionalButtonProps>;
export type ButtonStates = Generic.Element.Members<RequiredButtonStates, OptionalButtonStates>;
export type ButtonAPI = Generic.Element.ComponentApi<RequiredButtonProps, OptionalButtonProps, RequiredButtonStates, OptionalButtonStates>;
