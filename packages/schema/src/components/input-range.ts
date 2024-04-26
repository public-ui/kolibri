import type { Generic } from 'adopted-style-sheets';

import type {
	PropDisabled,
	PropHideError,
	PropHideLabel,
	PropId,
	PropLabelWithExpertSlot,
	PropMsg,
	PropName,
	PropSuggestions,
	PropSyncValueBySelector,
	PropTouched,
} from '../props';
import type { InputTypeOnDefault, InputTypeOnOff, KoliBriHorizontalIcons, Stringified, W3CInputValue } from '../types';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	accessKey: string;
	alert: boolean;
	autoComplete: InputTypeOnOff;
	/**
	 * @deprecated Will be removed in v3. Use `msg` instead.
	 */
	error: string;
	hint: string;
	icons: Stringified<KoliBriHorizontalIcons>;
	max: number;
	min: number;
	on: InputTypeOnDefault;
	step: number;
	tabIndex: number;
	value: number;
} & PropDisabled &
	PropHideError &
	PropHideLabel &
	PropMsg &
	PropName &
	PropSuggestions &
	PropSyncValueBySelector &
	PropTouched;

type RequiredStates = {
	autoComplete: InputTypeOnOff;
	suggestions: W3CInputValue[];
} & PropId &
	PropHideError &
	PropLabelWithExpertSlot;
type OptionalStates = {
	accessKey: string;
	alert: boolean;
	hint: string;
	icons: KoliBriHorizontalIcons;
	max: number;
	min: number;
	on: InputTypeOnDefault;
	step: number;
	tabIndex: number;
	value: number;
} & PropDisabled &
	PropHideLabel &
	PropMsg &
	PropName &
	PropTouched;

export type InputRangeProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type InputRangeStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type InputRangeWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type InputRangeAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
