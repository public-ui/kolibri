import { Generic } from '@a11y-ui/core';
import { AriaLabel } from '../../types/aria-label';
import { KoliBriModalEventCallbacks } from '../../components';

type RequiredProps = AriaLabel;
type OptionalProps = {
	activeElement: HTMLElement | null;
	on: KoliBriModalEventCallbacks;
	width: string;
};

type RequiredStates = {
	activeElement: HTMLElement | null;
	width: string;
} & AriaLabel;
type OptionalStates = {
	on: KoliBriModalEventCallbacks;
};

export type KoliBriModalStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriModalAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
