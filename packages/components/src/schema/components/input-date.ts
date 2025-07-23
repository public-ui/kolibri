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
	PropReadOnly,
	PropRequired,
	PropShortKey,
	PropSuggestions,
	PropSyncValueBySelector,
	PropTouched,
} from '../props';
import type { InputTypeOnDefault, Iso8601, KoliBriHIcons, NumberString, Stringified, W3CInputValue } from '../types';
import type { ButtonProps } from './button';

export const inputDateTypeOptions = ['date', 'datetime-local', 'month', 'time', 'week'] as const;
export type InputDateType = (typeof inputDateTypeOptions)[number];

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	max: Iso8601 | Date;
	min: Iso8601 | Date;
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	smartButton: Stringified<ButtonProps>;
	step: number | NumberString;
	type: InputDateType;
	value: Iso8601 | Date | null;
} & PropAccessKey &
	PropAutoComplete &
	PropDisabled &
	PropHideLabel &
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
	type: InputDateType;
} & PropLabelWithExpertSlot &
	PropHideMsg &
	PropId;

type OptionalStates = {
	max: Iso8601;
	min: Iso8601;
	on: InputTypeOnDefault;
	placeholder: string;
	smartButton: ButtonProps;
	step: number;
	value: Iso8601 | null;
} & PropAccessKey &
	PropAutoComplete &
	PropHint &
	PropSyncValueBySelector &
	PropDisabled &
	PropHideLabel &
	KoliBriHIcons &
	PropMsg &
	PropName &
	PropReadOnly &
	PropRequired &
	PropShortKey &
	PropTouched;

export type InputDateProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type InputDateStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type InputDateWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type InputDateAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
