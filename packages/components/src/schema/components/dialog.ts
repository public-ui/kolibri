import type { Generic } from 'adopted-style-sheets';

import type { HeadingLevel, PropLabel, PropModal } from '../props';
import type { PropDialogVariant } from '../props/variant/dialog';
import type { KoliBriModalEventCallbacks } from '../types';

type RequiredProps = PropLabel;
type OptionalProps = {
	on: KoliBriModalEventCallbacks;
	width: string;
	level?: HeadingLevel;
} & PropDialogVariant &
	PropModal;
type RequiredStates = {
	width: string;
} & PropLabel;
type OptionalStates = {
	level?: HeadingLevel;
	on: KoliBriModalEventCallbacks;
} & PropDialogVariant &
	PropModal;

export type DialogProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type DialogStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type DialogAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
