import type { Generic } from 'adopted-style-sheets';

import type {
	MsgPropType,
	PropAccessKey,
	PropDisabled,
	PropHideError,
	PropHideLabel,
	PropHorizontalIcons,
	PropId,
	PropLabelWithExpertSlot,
	PropMsg,
	PropName,
	PropRequired,
	PropShortKey,
	PropSuggestions,
	PropSyncValueBySelector,
	PropTouched,
} from '../props';
import type { InputTypeOnDefault, KoliBriHIcons, Stringified, W3CInputValue } from '../types';

type RequiredProps = PropLabelWithExpertSlot & PropSuggestions;
type OptionalProps = {
	hint: string;
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	placeholder: string;
	tabIndex: number;
	value: string;
} & PropAccessKey &
	PropDisabled &
	PropHideError &
	PropHideLabel &
	PropHorizontalIcons &
	PropName &
	PropRequired &
	PropShortKey &
	PropSyncValueBySelector &
	PropTouched;

type RequiredStates = {
	hasValue: boolean;
	suggestions: W3CInputValue[];
	value: string;
} & PropId &
	PropHideError &
	PropLabelWithExpertSlot;
type OptionalStates = {
	alert: boolean;
	hint: string;
	on: InputTypeOnDefault;
	tabIndex: number;
	placeholder: string;
} & PropAccessKey &
	PropDisabled &
	PropHideLabel &
	KoliBriHIcons &
	PropId &
	PropName &
	PropRequired &
	PropMsg &
	PropShortKey &
	PropTouched;

export type ComboboxProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type ComboboxStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type ComboboxWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type ComboboxAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
