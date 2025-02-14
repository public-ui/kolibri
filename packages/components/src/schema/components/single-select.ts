import type { Generic } from 'adopted-style-sheets';

import type {
	MsgPropType,
	PropDisabled,
	PropHideMsg,
	PropHideLabel,
	PropId,
	PropLabelWithExpertSlot,
	PropMsg,
	PropName,
	PropRequired,
	PropSyncValueBySelector,
	PropTouched,
	PropOptions,
	PropShortKey,
	PropAccessKey,
} from '../props';
import type { InputTypeOnDefault, KoliBriHorizontalIcons, Option, StencilUnknown, Stringified } from '../types';

type RequiredProps = PropLabelWithExpertSlot & PropOptions;
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
	PropHideMsg &
	PropHideLabel &
	PropName &
	PropRequired &
	PropSyncValueBySelector &
	PropShortKey &
	PropTouched;

type RequiredStates = {
	options: Option<StencilUnknown>[];
} & PropId &
	PropHideMsg &
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

export type SingleSelectProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type SingleSelectStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type SingleSelectWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type SingleSelectAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
