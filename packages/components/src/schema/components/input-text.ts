import type { Generic } from 'adopted-style-sheets';

import type {
	MsgPropType,
	PropAccessKey,
	PropAutoComplete,
	PropDisabled,
	PropHasCounter,
	PropHideLabel,
	PropHideMsg,
	PropHorizontalIcons,
	PropId,
	PropLabelWithExpertSlot,
	PropMaxLengthBehavior,
	PropMsg,
	PropName,
	PropReadOnly,
	PropRequired,
	PropShortKey,
	PropSpellCheck,
	PropSuggestions,
	PropSyncValueBySelector,
	PropTouched,
} from '../props';
import type { InputTypeOnDefault, KoliBriHIcons, Stringified, W3CInputValue } from '../types';
import type { ButtonProps } from './button';

export const inputTextTypeOptions = ['text', 'search', 'url', 'tel'] as const;
export type InputTextType = (typeof inputTextTypeOptions)[number];

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	hint: string;
	maxLength: number;
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	pattern: string;
	placeholder: string;
	smartButton: Stringified<ButtonProps>;
	type: InputTextType;
	value: string;
} & PropAccessKey &
	PropAutoComplete &
	PropDisabled &
	PropHasCounter &
	PropHideMsg &
	PropHideLabel &
	PropHorizontalIcons &
	PropId &
	PropMaxLengthBehavior &
	PropName &
	PropReadOnly &
	PropRequired &
	PropShortKey &
	PropSpellCheck &
	PropSuggestions &
	PropSyncValueBySelector &
	PropTouched;

type RequiredStates = {
	currentLength: number;
	currentLengthDebounced: number;
	hasValue: boolean;
	suggestions: W3CInputValue[];
	type: InputTextType;
} & PropHideMsg &
	PropId &
	PropLabelWithExpertSlot;
type OptionalStates = {
	hint: string;
	maxLength: number;
	on: InputTypeOnDefault;
	pattern: string;
	placeholder: string;
	smartButton: ButtonProps;
	value: string;
} & PropAccessKey &
	PropAutoComplete &
	PropDisabled &
	PropHasCounter &
	PropHideLabel &
	KoliBriHIcons &
	PropMaxLengthBehavior &
	PropMsg &
	PropName &
	PropReadOnly &
	PropRequired &
	PropShortKey &
	PropSpellCheck &
	PropTouched;

export type InputTextProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type InputTextStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type InputTextWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type InputTextAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
