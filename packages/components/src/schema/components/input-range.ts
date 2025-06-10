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
	PropMsg,
	PropName,
	PropShortKey,
	PropSuggestions,
	PropSyncValueBySelector,
	PropTouched,
} from '../props';
import type { InputTypeOnDefault, InputTypeOnOff, KoliBriHIcons, NumberString, Stringified, W3CInputValue } from '../types';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	autoComplete: InputTypeOnOff;
	hint: string;
	max: number | NumberString;
	min: number | NumberString;
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	step: number | NumberString;
	value: number | NumberString;
} & PropAccessKey &
	PropDisabled &
	PropHideMsg &
	PropHideLabel &
	PropHorizontalIcons &
	PropName &
	PropSuggestions &
	PropSyncValueBySelector &
	PropShortKey &
	PropTouched;

type RequiredStates = {
	autoComplete: InputTypeOnOff;
	suggestions: W3CInputValue[];
} & PropId &
	PropHideMsg &
	PropLabelWithExpertSlot;
type OptionalStates = {
	hint: string;
	max: number;
	min: number;
	on: InputTypeOnDefault;
	step: number;
	value: number;
} & PropAccessKey &
	PropDisabled &
	PropHideLabel &
	KoliBriHIcons &
	PropMsg &
	PropName &
	PropShortKey &
	PropTouched;

export type InputRangeProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type InputRangeStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type InputRangeWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type InputRangeAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
