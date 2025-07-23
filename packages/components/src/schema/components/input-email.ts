import type { Generic } from 'adopted-style-sheets';

import type {
	MsgPropType,
	PropAccessKey,
	PropAutoComplete,
	PropDisabled,
	PropHideLabel,
	PropHideMsg,
	PropHorizontalIcons,
	PropId,
	PropLabelWithExpertSlot,
	PropMaxLengthBehavior,
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
import type { InputTypeOnDefault, KoliBriHIcons, Stringified, W3CInputValue } from '../types';
import type { ButtonProps } from './button';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	hint: string;
	maxLength: number;
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	pattern: string;
	placeholder: string;
	smartButton: Stringified<ButtonProps>;
	value: string;
} & PropAccessKey &
	PropAutoComplete &
	PropDisabled &
	PropHideMsg &
	PropHideLabel &
	PropHorizontalIcons &
	PropMaxLengthBehavior &
	PropMultiple &
	PropName &
	PropReadOnly &
	PropRequired &
	PropShortKey &
	PropSuggestions &
	PropSyncValueBySelector &
	PropTouched;

type RequiredStates = {
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
	PropAutoComplete &
	PropDisabled &
	PropHideLabel &
	KoliBriHIcons &
	PropMaxLengthBehavior &
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
