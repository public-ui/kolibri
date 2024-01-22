import type { Generic } from 'adopted-style-sheets';

import type {
	PropAdjustHeight,
	PropDisabled,
	PropHasCounter,
	PropHideError,
	PropHideLabel,
	PropId,
	PropLabelWithExpertSlot,
	PropName,
	PropReadOnly,
	PropRequired,
	PropRows,
	PropSyncValueBySelector,
	PropTouched,
} from '../props';
import type { InputTypeOnDefault } from '../types';

export const cssResizeOptions = ['both', 'horizontal', 'vertical', 'none'] as const;
export type CSSResize = (typeof cssResizeOptions)[number];

type RequiredProps = NonNullable<unknown>;
type OptionalProps = {
	accessKey: string;
	alert: boolean;
	error: string;
	hint: string;
	maxLength: number;
	on: InputTypeOnDefault;
	placeholder: string;
	resize: CSSResize;
	tabIndex: number;
	value: string;
} & PropAdjustHeight &
	PropDisabled &
	PropHasCounter &
	PropHideError &
	PropHideLabel &
	PropLabelWithExpertSlot &
	PropName &
	PropReadOnly &
	PropRequired &
	PropRows &
	PropSyncValueBySelector &
	PropTouched;

type RequiredStates = {
	adjustHeight: boolean;
	currentLength: number;
	hasValue: boolean;
	resize: CSSResize;
} & PropId &
	PropAdjustHeight &
	PropHideError &
	PropLabelWithExpertSlot;
type OptionalStates = {
	accessKey: string;
	alert: boolean;
	error: string;
	hint: string;
	maxLength: number;
	on: InputTypeOnDefault;
	placeholder: string;
	tabIndex: number;
	value: string;
} & PropDisabled &
	PropHasCounter &
	PropHideLabel &
	PropName &
	PropReadOnly &
	PropRequired &
	PropRows &
	PropTouched;

export type TextareaProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type TextareaStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type TextareaWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type TextareaAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
