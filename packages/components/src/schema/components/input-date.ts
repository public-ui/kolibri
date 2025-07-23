import type { Generic } from 'adopted-style-sheets';

import type {
	MsgPropType,
	PropAccessKey,
	PropDisabled,
	PropHasValue,
	PropHideLabel,
	PropHideMsg,
	PropHint,
	PropId,
	PropLabelWithExpertSlot,
	PropMsg,
	PropName,
	PropPlaceholder,
	PropReadOnly,
	PropRequired,
	PropShortKey,
	PropSuggestions,
	PropSyncValueBySelector,
	PropTouched,
	PropTypeInputDate,
} from '../props';
import type { InputTypeOnDefault, InputTypeOnOff, Iso8601, KoliBriHIcons, OptionalInputProps, Stringified, W3CInputValue } from '../types';
import type { ButtonProps } from './button';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	msg: Stringified<MsgPropType>;
} & OptionalInputProps<Iso8601 | Date> &
	PropHideMsg &
	PropSuggestions &
	PropTypeInputDate;

type RequiredStates = {
	autoComplete: InputTypeOnOff;
	suggestions: W3CInputValue[];
} & PropLabelWithExpertSlot &
	PropHasValue &
	PropHideMsg &
	PropId &
	PropTypeInputDate;

type OptionalStates = {
	max: Iso8601;
	min: Iso8601;
	on: InputTypeOnDefault;
	smartButton: ButtonProps;
	step: number;
	value: Iso8601 | null;
} & PropAccessKey &
	PropSyncValueBySelector &
	PropDisabled &
	PropHideLabel &
	PropHint &
	KoliBriHIcons &
	PropMsg &
	PropName &
	PropPlaceholder &
	PropReadOnly &
	PropRequired &
	PropShortKey &
	PropTouched;

export type InputDateProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type InputDateStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type InputDateWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type InputDateAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
