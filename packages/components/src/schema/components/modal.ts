import type { Generic } from 'adopted-style-sheets';

import type { PropLabel } from '../props';
import type { KoliBriModalEventCallbacks } from '../types';
import { PropModalVariant } from '../props/variant/modal';

type RequiredProps = PropLabel;
type OptionalProps = {
	on: KoliBriModalEventCallbacks;
	width: string;
} & PropModalVariant;
type RequiredStates = {
	width: string;
} & PropLabel;
type OptionalStates = {
	on: KoliBriModalEventCallbacks;
} & PropModalVariant;

export type ModalProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type ModalStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type ModalAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
