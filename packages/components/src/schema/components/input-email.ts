import type { Generic } from 'adopted-style-sheets';

import type {
	MsgPropType,
	PropAccessKey,
	PropCharacterLimit,
	PropDisabled,
	PropHideLabel,
	PropHideMsg,
	PropHorizontalIcons,
	PropId,
	PropLabelWithExpertSlot,
	PropMsg,
	PropMultiple,
	PropName,
	PropReadOnly,
	PropRequired,
	PropShortKey,
	PropSuggestions,
	PropSyncValueBySelector,
	PropTouched,
} from '../props';
import type { InputTypeOnDefault, InputTypeOnOff, KoliBriHIcons, Stringified, W3CInputValue } from '../types';
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
	value: string;
} & PropAccessKey &
	PropCharacterLimit &
	PropDisabled &
	PropHideMsg &
	PropHideLabel &
	PropHorizontalIcons &
	PropMultiple &
	PropName &
	PropReadOnly &
	PropRequired &
	PropShortKey &
	PropSuggestions &
	PropSyncValueBySelector &
	PropTouched;

type RequiredStates = {
	autoComplete: InputTypeOnOff;
	hasValue: boolean;
	suggestions: W3CInputValue[];
	currentLength: number;
	currentLengthDebounced: number;
} & PropId &
	PropHideMsg &
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
	PropCharacterLimit &
	PropDisabled &
	PropHideLabel &
	KoliBriHIcons &
	PropMsg &
	PropMultiple &
	PropName &
	PropReadOnly &
	PropRequired &
	PropShortKey &
	PropTouched;

export type InputEmailProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type InputEmailStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type InputEmailWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type InputEmailAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
