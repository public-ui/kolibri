import type { Generic } from 'adopted-style-sheets';

import type {
	MsgPropType,
	PropAccessKey,
	PropAdjustHeight,
	PropDisabled,
	PropHasCounter,
	PropHideMsg,
	PropHideLabel,
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
import type { InputTypeOnDefault, KoliBriHorizontalIcons, Stringified } from '../types';

export const cssResizeOptions = ['vertical', 'none'] as const;
export type CSSResize = (typeof cssResizeOptions)[number];

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	hint: string;
	icons: KoliBriHorizontalIcons;
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
	PropHideMsg &
	PropHideLabel &
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
	PropHideMsg &
	PropId &
	PropLabelWithExpertSlot;

type OptionalStates = {
	hint: string;
	icons: KoliBriHorizontalIcons;
	maxLength: number;
	on: InputTypeOnDefault;
	placeholder: string;
	tabIndex: number;
	value: string;
} & PropAccessKey &
	PropDisabled &
	PropHasCounter &
	PropHideLabel &
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
