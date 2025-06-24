import type { Generic } from 'adopted-style-sheets';

import type {
	MsgPropType,
	PropAccessKey,
	PropDisabled,
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
import type { InputTextType, InputTypeOnDefault, InputTypeOnOff, KoliBriHIcons, Stringified, W3CInputValue } from '../types';
import type { ButtonProps } from './button';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	autoComplete: InputTypeOnOff;
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
	PropDisabled &
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
	autoComplete: InputTypeOnOff;
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
	PropDisabled &
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
