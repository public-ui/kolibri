import type { Generic } from 'adopted-style-sheets';

import type {
	MsgPropType,
	PropAccessKey,
	PropAdjustHeight,
	PropAriaDetails,
	PropDisabled,
	PropHasCounter,
	PropHideLabel,
	PropHideMsg,
	PropHint,
	PropHorizontalIcons,
	PropId,
	PropLabelWithExpertSlot,
	PropMaxLengthBehavior,
	PropMsg,
	PropName,
	PropReadOnly,
	PropRequired,
	PropRows,
	PropShortKey,
	PropSpellCheck,
	PropSyncValueBySelector,
	PropTouched,
	PropVariantClassName,
} from '../props';
import type { InputTypeOnDefault, KoliBriHIcons, Stringified } from '../types';

export const cssResizeOptions = ['vertical', 'none'] as const;
export type CSSResize = (typeof cssResizeOptions)[number];

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	maxLength: number;
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	placeholder: string;
	resize: CSSResize;
	value: string;
} & PropAccessKey &
	PropAriaDetails &
	PropAdjustHeight &
	PropDisabled &
	PropHasCounter &
	PropHideLabel &
	PropHideMsg &
	PropHint &
	PropHorizontalIcons &
	PropMaxLengthBehavior &
	PropName &
	PropReadOnly &
	PropRequired &
	PropRows &
	PropShortKey &
	PropSpellCheck &
	PropSyncValueBySelector &
	PropTouched &
	PropVariantClassName;

type RequiredStates = {
	adjustHeight: boolean;
	hasValue: boolean;
	resize: CSSResize;
} & PropAdjustHeight &
	PropHideMsg &
	PropId &
	PropLabelWithExpertSlot;

type OptionalStates = {
	maxLength: number;
	on: InputTypeOnDefault;
	placeholder: string;
	value: string;
} & PropAccessKey &
	KoliBriHIcons &
	PropDisabled &
	PropHasCounter &
	PropHideLabel &
	PropHint &
	PropMaxLengthBehavior &
	PropMsg &
	PropName &
	PropReadOnly &
	PropRequired &
	PropRows &
	PropShortKey &
	PropSpellCheck &
	PropTouched &
	PropVariantClassName;

export type TextareaProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type TextareaStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type TextareaWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type TextareaAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
