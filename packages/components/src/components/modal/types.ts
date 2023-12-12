import type { Generic } from 'adopted-style-sheets';

import { KoliBriModalEventCallbacks } from '../../types/modal';
import { PropAriaLabel } from '../../types/props/aria-label';
import { PropLabel } from '../../types/props/label';

type RequiredProps = NonNullable<unknown>;
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

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
