import type { Generic } from 'adopted-style-sheets';

import type { HeadingLevel, PropLabelLangSegments } from '../props';
import type { PropDialogVariant } from '../props/variant/dialog';
import type { KoliBriModalEventCallbacks } from '../types';
import type { Members } from '../types/members';

type RequiredProps = PropLabelLangSegments;
type OptionalProps = {
	on: KoliBriModalEventCallbacks;
	width: string;
	level?: HeadingLevel;
} & PropDialogVariant;
type RequiredStates = {
	width: string;
} & PropLabelLangSegments;
type OptionalStates = {
	level?: HeadingLevel;
	on: KoliBriModalEventCallbacks;
} & PropDialogVariant;

export type DialogProps = Members<RequiredProps, OptionalProps>;
export type DialogStates = Members<RequiredStates, OptionalStates>;
export type DialogAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
