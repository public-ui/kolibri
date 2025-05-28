import type { Generic } from 'adopted-style-sheets';

import type {
	MsgPropType,
	PropAccessKey,
	PropDisabled,
	PropHideLabel,
	PropHideMsg,
	PropId,
	PropLabelWithExpertSlot,
	PropMsg,
	PropName,
	PropReadOnly,
	PropRequired,
	PropShortKey,
	PropSuggestions,
	PropSyncValueBySelector,
	PropTouched,
} from '../props';
import type { InputTypeOnDefault, InputTypeOnOff, KoliBriHIcons, NumberString, OptionalInputProps, Stringified, W3CInputValue } from '../types';
import type { ButtonProps } from './button';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	msg: Stringified<MsgPropType>;
	placeholder: string;
} & OptionalInputProps<number | NumberString> &
	PropHideMsg &
	PropSuggestions;

type RequiredStates = {
	autoComplete: InputTypeOnOff;
	hasValue: boolean;
	suggestions: W3CInputValue[];
} & PropId &
	PropHideMsg &
	PropLabelWithExpertSlot;

type OptionalStates = {
	hint: string;
	max: number | NumberString;
	min: number | NumberString;
	on: InputTypeOnDefault;
	placeholder: string;
	smartButton: ButtonProps;
	step: number | NumberString;
	value: number;
} & PropAccessKey &
	PropDisabled &
	PropHideLabel &
	KoliBriHIcons &
	PropMsg &
	PropName &
	PropReadOnly &
	PropRequired &
	PropSyncValueBySelector &
	PropShortKey &
	PropTouched;

export type InputNumberProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type InputNumberStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type InputNumberWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type InputNumberAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
