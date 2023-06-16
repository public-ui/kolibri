import { Generic } from '@a11y-ui/core';

type RequiredProps = unknown;
type OptionalProps = {
	activeElement: HTMLElement | null;
};

type RequiredStates = {
	activeElement: HTMLElement | null;
};
type OptionalStates = unknown;

export type KoliBriDialogProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type KoliBriDialogStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriDialogApi = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
