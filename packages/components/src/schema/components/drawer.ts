import type { Generic } from 'adopted-style-sheets';

import type { PropLabel, PropOpen, PropAlign } from '../props';
import type { KoliBriModalEventCallbacks } from '../types';

type RequiredProps = PropLabel;
type OptionalProps = PropAlign &
	PropOpen & {
		on: KoliBriModalEventCallbacks;
	};
type RequiredStates = PropAlign & PropOpen & PropLabel;
type OptionalStates = {
	on: KoliBriModalEventCallbacks;
};

export type DrawerProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type DrawerStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type DrawerAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
