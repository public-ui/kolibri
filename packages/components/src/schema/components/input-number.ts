import type { Generic } from 'adopted-style-sheets';

import type {
	MsgPropType,
	PlaceholderPropType,
	PropAccessKey,
	PropAutoComplete,
	PropDisabled,
	PropHideError,
	PropHideLabel,
	PropHideMsg,
	PropHint,
	PropHorizontalIcons,
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
import type { InputTypeOnDefault, KoliBriHIcons, NumberString, Stringified, W3CInputValue } from '../types';
import type { ButtonProps } from './button';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	max: number | NumberString;
	min: number | NumberString;
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	placeholder: PlaceholderPropType;
	smartButton: Stringified<ButtonProps>;
	step: number | NumberString;
	value: number | NumberString | null;
} & PropAccessKey &
	PropAutoComplete &
	PropDisabled &
	PropHideLabel &
	PropHideError &
	PropHideMsg &
	PropHint &
	PropHorizontalIcons &
	PropName &
	PropReadOnly &
	PropRequired &
	PropSuggestions &
	PropTouched;

type RequiredStates = {
	hasValue: boolean;
	suggestions: W3CInputValue[];
} & PropId &
	PropHideError &
	PropHideMsg &
	PropLabelWithExpertSlot;

type OptionalStates = {
	max: number;
	min: number;
	on: InputTypeOnDefault;
	placeholder: PlaceholderPropType;
	smartButton: ButtonProps;
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
	PropReadOnly &
	PropRequired &
	PropSyncValueBySelector &
	PropShortKey &
	PropTouched;

export type InputNumberProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type InputNumberStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type InputNumberWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type InputNumberAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
