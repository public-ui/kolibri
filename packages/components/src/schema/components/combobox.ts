import type { Generic } from 'adopted-style-sheets';

import type {
	PropDisabled,
	PropHideError,
	PropHideLabel,
	PropId,
	PropLabelWithExpertSlot,
	PropMsg,
	PropName,
	PropRequired,
	PropSyncValueBySelector,
	PropTouched,
	PropSuggestions,
} from '../props';
import type { InputTypeOnDefault, KoliBriHorizontalIcons, Stringified, W3CInputValue } from '../types';

type RequiredProps = PropSuggestions;
type OptionalProps = {
	accessKey: string;
	error: string;
	hint: string;
	icons: Stringified<KoliBriHorizontalIcons>;
	on: InputTypeOnDefault;
	tabIndex: number;
	value: string;
	placeholder: string;
} & PropDisabled &
	PropHideError &
	PropHideLabel &
	PropLabelWithExpertSlot &
	PropMsg &
	PropName &
	PropRequired &
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
	accessKey: string;
	alert: boolean;
	error: string;
	hint: string;
	icons: KoliBriHorizontalIcons;
	on: InputTypeOnDefault;
	tabIndex: number;
	placeholder: string;
} & PropDisabled &
	PropHideLabel &
	PropId &
	PropName &
	PropRequired &
	PropMsg &
	PropTouched;

export type ComboboxProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type ComboboxStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type ComboboxWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type ComboboxAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
