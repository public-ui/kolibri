import { Generic } from '@a11y-ui/core';

import { KoliBriModalEventCallbacks } from '../../types/modal';
import { PropAriaLabel } from '../../types/props/aria-label';
import { PropLabel } from '../../types/props/label';

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
