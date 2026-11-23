import type { Generic } from 'adopted-style-sheets';

import type { HeadingLevel, PropAlign, PropHasCloser, PropLabelLangSegments, PropOpen } from '../props';
import type { KoliBriModalEventCallbacks } from '../types';
import type { Members } from '../types/members';

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

export type DrawerProps = Members<RequiredProps, OptionalProps>;
export type DrawerStates = Members<RequiredStates, OptionalStates>;
export type DrawerAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
