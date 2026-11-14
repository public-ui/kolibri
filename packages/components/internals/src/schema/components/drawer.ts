import type { Generic } from 'adopted-style-sheets';

import type { HeadingLevel, PropAlign, PropHasCloser, PropLabelLangSegments, PropOpen } from '../props';
import type { KoliBriModalEventCallbacks } from '../types';

type RequiredProps = PropLabelLangSegments;
type OptionalProps = PropAlign &
	PropHasCloser &
	PropOpen & {
		level?: HeadingLevel;
		on: KoliBriModalEventCallbacks;
	};
type RequiredStates = PropAlign & PropOpen & PropLabelLangSegments;
type OptionalStates = PropHasCloser & {
	level?: HeadingLevel;
	on: KoliBriModalEventCallbacks;
};

export type DrawerProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type DrawerStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type DrawerAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
