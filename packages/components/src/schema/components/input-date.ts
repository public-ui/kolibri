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
	PropReadOnly,
	PropRequired,
	PropShortKey,
	PropSuggestions,
	PropSyncValueBySelector,
	PropTouched,
} from '../props';
import type {
	InputDateType,
	InputTypeOnDefault,
	InputTypeOnOff,
	Iso8601,
	KoliBriHorizontalIcons,
	OptionalInputProps,
	Stringified,
	W3CInputValue,
} from '../types';
import type { ButtonProps } from './button';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	msg: Stringified<MsgPropType>;
	type: InputDateType;
} & OptionalInputProps<Iso8601 | Date> &
	PropHideError &
	PropSuggestions;

type RequiredStates = {
	autoComplete: InputTypeOnOff;
	hasValue: boolean;
	suggestions: W3CInputValue[];
	type: InputDateType;
} & PropLabelWithExpertSlot &
	PropHideError &
	PropId;

type OptionalStates = {
	hint: string;
	icons: KoliBriHorizontalIcons;
	max: Iso8601;
	min: Iso8601;
	on: InputTypeOnDefault;
	placeholder: string;
	smartButton: ButtonProps;
	step: number;
	tabIndex: number;
	value: Iso8601 | null;
} & PropAccessKey &
	PropSyncValueBySelector &
	PropDisabled &
	PropHideLabel &
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
