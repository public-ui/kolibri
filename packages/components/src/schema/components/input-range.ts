import type { Generic } from 'adopted-style-sheets';

import type {
	MsgPropType,
	PropAccessKey,
	PropAutoComplete,
	PropDisabled,
	PropHideLabel,
	PropHideMsg,
	PropHint,
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
import type { InputTypeOnDefault, KoliBriHIcons, NumberString, Stringified, W3CInputValue } from '../types';

export type InputRangeListItemType = {
	label?: string;
	value: number | string;
};

export type InputRangeListPropType = Stringified<InputRangeListItemType[]>;

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	list: InputRangeListPropType;
	max: number | NumberString;
	min: number | NumberString;
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	step: number | NumberString;
	value: number | NumberString;
} & PropAccessKey &
	PropAutoComplete &
	PropDisabled &
	PropHideMsg &
	PropHideLabel &
	PropHint &
	PropHorizontalIcons &
	PropName &
	PropSuggestions &
	PropSyncValueBySelector &
	PropShortKey &
	PropTouched;

type RequiredStates = {
	suggestions: W3CInputValue[];
} & PropId &
	PropHideMsg &
	PropLabelWithExpertSlot;
type OptionalStates = {
	list: InputRangeListItemType[];
	max: number;
	min: number;
	on: InputTypeOnDefault;
	step: number;
	value: number;
} & PropAccessKey &
	PropAutoComplete &
	PropDisabled &
	PropHideLabel &
	PropHint &
	KoliBriHIcons &
	PropMsg &
	PropName &
	PropShortKey &
	PropTouched;

export type InputRangeProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type InputRangeStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type InputRangeWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type InputRangeAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
