import type { Generic } from 'adopted-style-sheets';

import type {
	PropDisabled,
	PropHideError,
	PropHideLabel,
	PropId,
	PropLabelWithExpertSlot,
	PropMsg,
	PropName,
	PropReadOnly,
	PropRequired,
	PropSuggestions,
	PropSyncValueBySelector,
	PropTouched,
} from '../props';
import type { InputTypeOnDefault, InputTypeOnOff, Iso8601, KoliBriHorizontalIcons, OptionalInputProps, W3CInputValue } from '../types';
import type { ButtonProps } from './button';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	/**
	 * @deprecated Will be removed in v3. Use `msg` instead.
	 */
	error: string;
	placeholder: string;
} & OptionalInputProps<number | Iso8601> &
	PropHideError &
	PropMsg &
	PropSuggestions;

type RequiredStates = {
	autoComplete: InputTypeOnOff;
	hasValue: boolean;
	suggestions: W3CInputValue[];
} & PropId &
	PropHideError &
	PropLabelWithExpertSlot;

type OptionalStates = {
	accessKey: string;
	alert: boolean;
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
} & PropDisabled &
	PropHideLabel &
	PropMsg &
	PropName &
	PropReadOnly &
	PropRequired &
	PropSyncValueBySelector &
	PropTouched;

export type InputNumberProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type InputNumberStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type InputNumberWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type InputNumberAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
