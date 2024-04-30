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
} from '../props';
import type { InputTypeOnDefault, KoliBriHorizontalIcons, Stringified } from '../types';

type RequiredProps = { options: string[] };
type OptionalProps = {
	accessKey: string;
	error: string;
	hint: string;
	icons: Stringified<KoliBriHorizontalIcons>;
	on: InputTypeOnDefault;
	tabIndex: number;
	value: string;
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
	options: string[];
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
