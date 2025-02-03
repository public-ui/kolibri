import type { Generic } from 'adopted-style-sheets';

import type {
	MsgPropType,
	PropDisabled,
	PropHideError,
	PropHideLabel,
	PropId,
	PropLabelWithExpertSlot,
	PropMsg,
	PropName,
	PropRequired,
	PropSuggestions,
	PropSyncValueBySelector,
	PropTouched,
	PropAccessKey,
	PropShortKey,
} from '../props';
import type { InputTypeOnDefault, KoliBriHorizontalIcons, Stringified, W3CInputValue } from '../types';

type RequiredProps = PropLabelWithExpertSlot & PropSuggestions;
type OptionalProps = {
	hint: string;
	icons: Stringified<KoliBriHorizontalIcons>;
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	placeholder: string;
	tabIndex: number;
	value: string;
} & PropAccessKey &
	PropDisabled &
	PropHideError &
	PropHideLabel &
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
	hint: string;
	icons: KoliBriHorizontalIcons;
	on: InputTypeOnDefault;
	tabIndex: number;
	placeholder: string;
} & PropAccessKey &
	PropDisabled &
	PropHideLabel &
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
