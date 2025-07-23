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
	PropMultiple,
	PropName,
	PropOptionsWithOptgroup,
	PropRequired,
	PropRows,
	PropShortKey,
	PropSyncValueBySelector,
	PropTouched,
} from '../props';
import type { InputTypeOnDefault, KoliBriHIcons, SelectOption, StencilUnknown, Stringified, W3CInputValue } from '../types';

type RequiredProps = PropLabelWithExpertSlot & PropOptionsWithOptgroup;
type OptionalProps = {
	on: InputTypeOnDefault;
	tabIndex: number;
	value: Stringified<StencilUnknown[]> | Stringified<StencilUnknown>;
} & PropAccessKey &
	PropDisabled &
	PropHideMsg &
	PropHideLabel &
	PropHorizontalIcons &
	PropMultiple &
	PropName &
	PropRequired &
	PropRows &
	PropShortKey &
	PropSyncValueBySelector &
	PropTouched &
	PropHint &
	PropMsg;

type RequiredStates = {
	options: SelectOption<W3CInputValue>[];
	value: StencilUnknown[] | StencilUnknown;
} & PropId &
	PropHasValue &
	PropHideMsg &
	PropMultiple &
	PropLabelWithExpertSlot;
type OptionalStates = {
	on: InputTypeOnDefault;
	tabIndex: number;
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
	PropShortKey &
	PropTouched;

export type SelectProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type SelectStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type SelectWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type SelectAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
