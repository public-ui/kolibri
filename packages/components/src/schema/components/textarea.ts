import type { Generic } from 'adopted-style-sheets';

import type {
	MsgPropType,
	PropAccessKey,
	PropAdjustHeight,
	PropDisabled,
	PropHasCounter,
	PropHideError,
	PropHideLabel,
	PropHorizontalIcons,
	PropId,
	PropLabelWithExpertSlot,
	PropMsg,
	PropName,
	PropReadOnly,
	PropRequired,
	PropRows,
	PropShortKey,
	PropSpellCheck,
	PropSyncValueBySelector,
	PropTouched,
} from '../props';
import type { InputTypeOnDefault, KoliBriHIcons, Stringified } from '../types';

/**
 * TODO: In version 3 (v3), horizontal resizing is abolished. The corresponding property is then reduced to the properties `none` (default) and `vertical`.
 */
export const cssResizeOptions = ['both', 'horizontal', 'vertical', 'none'] as const;
export type CSSResize = (typeof cssResizeOptions)[number];

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	alert: boolean;
	/**
	 * @deprecated Will be removed in v3. Use `msg` instead.
	 */
	error: string;
	hint: string;
	maxLength: number;
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	placeholder: string;
	resize: CSSResize;
	tabIndex: number;
	value: string;
} & PropAccessKey &
	PropAdjustHeight &
	PropDisabled &
	PropHasCounter &
	PropHideError &
	PropHideLabel &
	PropHorizontalIcons &
	PropId &
	PropName &
	PropReadOnly &
	PropRequired &
	PropRows &
	PropShortKey &
	PropSpellCheck &
	PropSyncValueBySelector &
	PropTouched;

type RequiredStates = {
	adjustHeight: boolean;
	currentLength: number;
	hasValue: boolean;
	resize: CSSResize;
} & PropAdjustHeight &
	PropHideError &
	PropId &
	PropLabelWithExpertSlot;

type OptionalStates = {
	alert: boolean;
	error: string;
	hint: string;
	maxLength: number;
	on: InputTypeOnDefault;
	placeholder: string;
	tabIndex: number;
	value: string;
} & PropAccessKey &
	PropDisabled &
	PropHasCounter &
	PropHideLabel &
	KoliBriHIcons &
	PropMsg &
	PropName &
	PropReadOnly &
	PropRequired &
	PropRows &
	PropShortKey &
	PropSpellCheck &
	PropTouched;

export type TextareaProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type TextareaStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type TextareaWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type TextareaAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
