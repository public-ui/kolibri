import type { Generic } from 'adopted-style-sheets';

import type {
	MsgPropType,
	PropAccessKey,
	PropDisabled,
	PropHideMsg,
	PropHideLabel,
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
import type { InputTypeOnDefault, InputTypeOnOff, KoliBriHorizontalIcons, OptionalInputProps, Stringified, W3CInputValue } from '../types';
import type { ButtonProps } from './button';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	msg: Stringified<MsgPropType>;
	placeholder: string;
} & OptionalInputProps<number> &
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
	icons: KoliBriHorizontalIcons;
	max: string;
	min: string;
	on: InputTypeOnDefault;
	placeholder: string;
	smartButton: ButtonProps;
	step: number;
	tabIndex: number;
	value: string;
} & PropAccessKey &
	PropDisabled &
	PropHideLabel &
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
