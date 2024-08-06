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
	PropOptions,
} from '../props';
import type { InputTypeOnDefault, KoliBriHorizontalIcons, Option, StencilUnknown, Stringified } from '../types';

type RequiredProps = PropLabelWithExpertSlot & PropOptions;
type OptionalProps = {
	accessKey: string;
	hint: string;
	icons: Stringified<KoliBriHorizontalIcons>;
	on: InputTypeOnDefault;
	tabIndex: number;
	value: string;
	placeholder: string;
} & PropDisabled &
	PropHideError &
	PropHideLabel &
	PropMsg &
	PropName &
	PropRequired &
	PropSyncValueBySelector &
	PropTouched;

type RequiredStates = {
	options: Option<StencilUnknown>[];
} & PropId &
	PropHideError &
	PropLabelWithExpertSlot;
type OptionalStates = {
	accessKey: string;
	alert: boolean;
	hint: string;
	value: string;
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

export type SingleSelectProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type SingleSelectStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type SingleSelectWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type SingleSelectAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
