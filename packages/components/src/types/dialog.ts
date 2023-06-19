import { Generic } from '@a11y-ui/core';
import { EventCallback } from './callbacks';

export type KoliBriDialogCallbacks = {
	onClosedByEsc?: EventCallback<KeyboardEvent>;
};

type RequiredProps = unknown;
type OptionalProps = {
	on: KoliBriDialogCallbacks;
	show: boolean;
};

type RequiredStates = {
	on: KoliBriDialogCallbacks;
	show: boolean;
};
type OptionalStates = unknown;

export type KoliBriDialogProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type KoliBriDialogStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriDialogApi = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
