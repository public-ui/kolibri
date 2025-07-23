import type { Generic } from 'adopted-style-sheets';

import type {
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
	PropPlaceholder,
	PropRequired,
	PropRows,
	PropShortKey,
	PropSyncValueBySelector,
	PropTouched,
} from '../props';
import type { InputTypeOnDefault, KoliBriHIcons, Option, StencilUnknown } from '../types';

type RequiredProps = PropLabelWithExpertSlot & PropOptions;
type OptionalProps = {
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
	PropRows &
	PropSyncValueBySelector &
	PropShortKey &
	PropTouched &
	PropHint &
	PropMsg &
	PropPlaceholder;

type RequiredStates = {
	options: Option<StencilUnknown>[];
} & PropId &
	PropHideMsg &
	PropLabelWithExpertSlot;
type OptionalStates = {
	on: InputTypeOnDefault;
	hideClearButton: boolean;
} & PropAccessKey &
	PropDisabled &
	PropHideLabel &
	PropHint &
	KoliBriHIcons &
	PropId &
	PropName &
	PropRequired &
	PropRows &
	PropMsg &
	PropPlaceholder &
	PropShortKey &
	PropTouched;

export type SingleSelectProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type SingleSelectStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type SingleSelectWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type SingleSelectAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
