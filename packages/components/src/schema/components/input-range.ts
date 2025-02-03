import type { Generic } from 'adopted-style-sheets';

import type {
	MsgPropType,
	PropAccessKey,
	PropDisabled,
	PropHideError,
	PropHideLabel,
	PropId,
	PropLabelWithExpertSlot,
	PropMsg,
	PropName,
	PropShortKey,
	PropSuggestions,
	PropSyncValueBySelector,
	PropTouched,
} from '../props';
import type { InputTypeOnDefault, InputTypeOnOff, KoliBriHorizontalIcons, Stringified, W3CInputValue } from '../types';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	autoComplete: InputTypeOnOff;
	hint: string;
	icons: Stringified<KoliBriHorizontalIcons>;
	max: number;
	min: number;
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	step: number;
	tabIndex: number;
	value: number;
} & PropAccessKey &
	PropDisabled &
	PropHideError &
	PropHideLabel &
	PropName &
	PropSuggestions &
	PropSyncValueBySelector &
	PropShortKey &
	PropTouched;

type RequiredStates = {
	autoComplete: InputTypeOnOff;
	suggestions: W3CInputValue[];
} & PropId &
	PropHideError &
	PropLabelWithExpertSlot;
type OptionalStates = {
	hint: string;
	icons: KoliBriHorizontalIcons;
	max: number;
	min: number;
	on: InputTypeOnDefault;
	step: number;
	tabIndex: number;
	value: number;
} & PropAccessKey &
	PropDisabled &
	PropHideLabel &
	PropMsg &
	PropName &
	PropShortKey &
	PropTouched;

export type InputRangeProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type InputRangeStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type InputRangeWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type InputRangeAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
