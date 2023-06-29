import { Generic } from '@a11y-ui/core';
import { PropAriaLabel } from '../../types/aria-label';
import { KoliBriModalEventCallbacks } from '../../components';
import { PropLabel } from '../../types/props';

type RequiredProps = unknown;
type OptionalProps = {
	activeElement: HTMLElement | null;
	on: KoliBriModalEventCallbacks;
	width: string;
} & PropAriaLabel &
	PropLabel;

type RequiredStates = {
	activeElement: HTMLElement | null;
	width: string;
} & PropLabel;
type OptionalStates = {
	on: KoliBriModalEventCallbacks;
};

export type KoliBriModalStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriModalAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
