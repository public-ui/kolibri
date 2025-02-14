import type { Generic } from 'adopted-style-sheets';

import type {
	MsgPropType,
	PropAccessKey,
	PropDisabled,
	PropHasCounter,
	PropHideMsg,
	PropHideLabel,
	PropId,
	PropLabelWithExpertSlot,
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
import type { InputTypeOnDefault, InputTypeOnOff, KoliBriHorizontalIcons, Stringified, W3CInputValue } from '../types';
import type { ButtonProps } from './button';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	autoComplete: InputTypeOnOff;
	hint: string;
	icons: Stringified<KoliBriHorizontalIcons>;
	maxLength: number;
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	pattern: string;
	placeholder: string;
	smartButton: Stringified<ButtonProps>;
	tabIndex: number;
	value: string;
} & PropAccessKey &
	PropDisabled &
	PropHasCounter &
	PropHideMsg &
	PropHideLabel &
	PropMultiple &
	PropName &
	PropReadOnly &
	PropRequired &
	PropShortKey &
	PropSuggestions &
	PropSyncValueBySelector &
	PropTouched;

type RequiredStates = {
	autoComplete: InputTypeOnOff;
	hasValue: boolean;
	suggestions: W3CInputValue[];
} & PropId &
	PropHideMsg &
	PropLabelWithExpertSlot;

type OptionalStates = {
	currentLength: number;
	hint: string;
	icons: KoliBriHorizontalIcons;
	maxLength: number;
	on: InputTypeOnDefault;
	pattern: string;
	placeholder: string;
	smartButton: ButtonProps;
	tabIndex: number;
	value: string;
} & PropAccessKey &
	PropDisabled &
	PropHasCounter &
	PropHideLabel &
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
