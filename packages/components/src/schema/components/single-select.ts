import type { Generic } from 'adopted-style-sheets';

import type {
	MsgPropType,
	PropAccessKey,
	PropDisabled,
	PropHideLabel,
	PropHideMsg,
	PropHorizontalIcons,
	PropId,
	PropLabelWithExpertSlot,
	PropMsg,
	PropName,
	PropOptions,
	PropRequired,
	PropShortKey,
	PropSyncValueBySelector,
	PropTouched,
} from '../props';
import type { InputTypeOnDefault, KoliBriHIcons, Option, StencilUnknown, Stringified } from '../types';

type RequiredProps = PropLabelWithExpertSlot & PropOptions;
type OptionalProps = {
	hint: string;
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	placeholder: string;
	value: StencilUnknown;
	hideClearButton: boolean;
} & PropAccessKey &
	PropDisabled &
	PropHideMsg &
	PropHideLabel &
	PropHorizontalIcons &
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
	on: InputTypeOnDefault;
	placeholder: string;
	hideClearButton: boolean;
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

export type SingleSelectProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type SingleSelectStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type SingleSelectWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type SingleSelectAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
