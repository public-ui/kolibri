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
import type { InternalButtonProps } from './button';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	maxLength: number;
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	pattern: string;
	placeholder: string;
	smartButton: Stringified<InternalButtonProps>;
	value: string;
} & PropAccessKey &
	PropAutoComplete &
	PropDisabled &
	PropHideMsg &
	PropHideLabel &
	PropHint &
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
	maxLength: number;
	on: InputTypeOnDefault;
	pattern: string;
	placeholder: string;
	smartButton: InternalButtonProps;
	value: string;
} & PropAccessKey &
	PropAutoComplete &
	PropDisabled &
	PropHideLabel &
	PropHint &
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
