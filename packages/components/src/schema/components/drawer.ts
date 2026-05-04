import type { Generic } from 'adopted-style-sheets';

import type { HeadingLevel, PropAlign, PropHasCloser, PropLabel, PropModal, PropOpen } from '../props';
import type { KoliBriModalEventCallbacks } from '../types';

type RequiredProps = PropLabel;
type OptionalProps = PropAlign &
	PropHasCloser &
	PropModal &
	PropOpen & {
		level?: HeadingLevel;
		on: KoliBriModalEventCallbacks;
	};
type RequiredStates = PropAlign & PropOpen & PropLabel;
type OptionalStates = PropHasCloser &
	PropModal & {
		level?: HeadingLevel;
		on: KoliBriModalEventCallbacks;
	};

export type DrawerProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type DrawerStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type DrawerAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
