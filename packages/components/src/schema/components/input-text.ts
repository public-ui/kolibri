import type { Generic } from 'adopted-style-sheets';

import type {
	MsgPropType,
	PropAccessKey,
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
	alert: boolean;
	autoComplete: InputTypeOnOff;
	/**
	 * @deprecated Will be removed in v3. Use `msg` instead.
	 */
	error: string;
	hint: string;
	maxLength: number;
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	pattern: string;
	placeholder: string;
	smartButton: Stringified<ButtonProps>;
	tabIndex: number;
	type: InputTextType;
	value: string;
} & PropAccessKey &
	PropDisabled &
	PropHasCounter &
	PropHideError &
	PropHideLabel &
	PropHorizontalIcons &
	PropId &
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
	hasValue: boolean;
	suggestions: W3CInputValue[];
	type: InputTextType;
} & PropHideError &
	PropId &
	PropLabelWithExpertSlot;
type OptionalStates = {
	alert: boolean;
	currentLength: number;
	hint: string;
	maxLength: number;
	on: InputTypeOnDefault;
	pattern: string;
	placeholder: string;
	smartButton: ButtonProps;
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
	PropShortKey &
	PropSpellCheck &
	PropTouched;

export type InputTextProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type InputTextStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type InputTextWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type InputTextAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
