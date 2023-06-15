import { Generic } from '@a11y-ui/core';

export type KoliBriDialogEventCallbacks = {
	onClose?: () => void;
};

type RequiredProps = unknown;
type OptionalProps = {
	activeElement: HTMLElement | null;
	hideCloseButton: boolean;
	on: KoliBriDialogEventCallbacks;
	width: string;
};

type RequiredStates = {
	activeElement: HTMLElement | null;
};
type OptionalStates = {
	hideCloseButton: boolean;
	on: KoliBriDialogEventCallbacks;
	width: string;
};

export type KoliBriDialogProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type KoliBriDialogStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriDialogApi = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
