import { Generic } from '@a11y-ui/core';
import { AriaLabel } from '../../types/aria-label';
import { KoliBriModalEventCallbacks } from '../../components';

type RequiredProps = unknown;
type OptionalProps = {
	activeElement: HTMLElement | null;
	label: string;
	on: KoliBriModalEventCallbacks;
	width: string;
} & AriaLabel;

type RequiredStates = {
	activeElement: HTMLElement | null;
	label: string;
	width: string;
};
type OptionalStates = {
	on: KoliBriModalEventCallbacks;
} & AriaLabel;

export type KoliBriModalStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriModalAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
