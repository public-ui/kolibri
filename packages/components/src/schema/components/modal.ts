import type { Generic } from 'adopted-style-sheets';

import type { PropLabel } from '../props';
import type { KoliBriModalEventCallbacks } from '../types';

type RequiredProps = PropLabel;
type OptionalProps = {
	activeElement: HTMLElement | null;
	on: KoliBriModalEventCallbacks;
	width: string;
};
type RequiredStates = {
	activeElement: HTMLElement | null;
	width: string;
} & PropLabel;
type OptionalStates = {
	on: KoliBriModalEventCallbacks;
};

export type ModalProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type ModalStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type ModalAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
