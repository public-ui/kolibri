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
	PropRequired,
	PropShortKey,
	PropSuggestions,
	PropSyncValueBySelector,
	PropTouched,
} from '../props';
import type { InputTypeOnDefault, KoliBriHIcons, Stringified, W3CInputValue } from '../types';

type RequiredProps = PropLabelWithExpertSlot & PropSuggestions;
type OptionalProps = {
	hideClearButton: boolean;
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	placeholder: string;
	value: string;
} & PropAccessKey &
	PropDisabled &
	PropHideMsg &
	PropHideLabel &
	PropHint &
	PropHorizontalIcons &
	PropName &
	PropRequired &
	PropShortKey &
	PropSyncValueBySelector &
	PropTouched;

type RequiredStates = {
	hasValue: boolean;
	hideClearButton: boolean;
	suggestions: W3CInputValue[];
	value: string;
} & PropId &
	PropHideMsg &
	PropLabelWithExpertSlot;
type OptionalStates = {
	on: InputTypeOnDefault;
	placeholder: string;
} & PropAccessKey &
	PropDisabled &
	PropHideLabel &
	PropHint &
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
