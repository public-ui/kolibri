import type { Generic } from 'adopted-style-sheets';

import type {
	PropAccessKey,
	PropDisabled,
	PropHasValue,
	PropHideLabel,
	PropHideMsg,
	PropHint,
	PropHorizontalIcons,
	PropId,
	PropLabelWithExpertSlot,
	PropMsg,
	PropName,
	PropPlaceholder,
	PropRequired,
	PropShortKey,
	PropSuggestions,
	PropSyncValueBySelector,
	PropTouched,
} from '../props';
import type { InputTypeOnDefault, KoliBriHIcons, W3CInputValue } from '../types';

type RequiredProps = PropLabelWithExpertSlot & PropSuggestions;
type OptionalProps = {
	on: InputTypeOnDefault;
	placeholder: string;
	value: string;
} & PropAccessKey &
	PropDisabled &
	PropHideMsg &
	PropHideLabel &
	PropHorizontalIcons &
	PropName &
	PropRequired &
	PropShortKey &
	PropSyncValueBySelector &
	PropTouched &
	PropHint &
	PropMsg &
	PropPlaceholder;

type RequiredStates = {
	suggestions: W3CInputValue[];
	value: string;
} & PropId &
	PropHasValue &
	PropHideMsg &
	PropLabelWithExpertSlot;
type OptionalStates = {
	on: InputTypeOnDefault;
} & PropAccessKey &
	PropDisabled &
	PropHideLabel &
	PropHint &
	KoliBriHIcons &
	PropId &
	PropName &
	PropRequired &
	PropMsg &
	PropPlaceholder &
	PropShortKey &
	PropTouched;

export type ComboboxProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type ComboboxStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type ComboboxWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type ComboboxAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
