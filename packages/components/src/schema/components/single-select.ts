import type { Generic } from 'adopted-style-sheets';

import type {
	MsgPropType,
	PropAccessKey,
	PropDisabled,
	PropHideLabel,
	PropHideMsg,
	PropHint,
	PropHorizontalIcons,
	PropId,
	PropLabelWithExpertSlot,
	PropMsg,
	PropName,
	PropOptions,
	PropRequired,
	PropRows,
	PropShortKey,
	PropSyncValueBySelector,
	PropTouched,
	PropVariantClassName,
} from '../props';
import type { InputTypeOnDefault, KoliBriHIcons, Option, StencilUnknown, Stringified } from '../types';

type RequiredProps = PropLabelWithExpertSlot & PropOptions;
type OptionalProps = {
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	placeholder: string;
	value: StencilUnknown;
	hasClearButton: boolean;
} & PropAccessKey &
	PropDisabled &
	PropHideMsg &
	PropHideLabel &
	PropHint &
	PropHorizontalIcons &
	PropName &
	PropRequired &
	PropRows &
	PropSyncValueBySelector &
	PropShortKey &
	PropTouched &
	PropVariantClassName;

type RequiredStates = {
	options: Option<StencilUnknown>[];
} & PropId &
	PropHideMsg &
	PropLabelWithExpertSlot;
type OptionalStates = {
	on: InputTypeOnDefault;
	placeholder: string;
	hasClearButton: boolean;
} & PropAccessKey &
	PropDisabled &
	PropHideLabel &
	KoliBriHIcons &
	PropHint &
	PropName &
	PropRequired &
	PropRows &
	PropMsg &
	PropShortKey &
	PropTouched &
	PropVariantClassName;

export type SingleSelectProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type SingleSelectStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type SingleSelectWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type SingleSelectAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
