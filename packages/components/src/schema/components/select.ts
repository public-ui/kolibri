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
	hint: string;
	msg: Stringified<MsgPropType>;
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
	PropTouched;

type RequiredStates = {
	hasValue: boolean;
	options: SelectOption<W3CInputValue>[];
	value: StencilUnknown[] | StencilUnknown;
} & PropId &
	PropHideMsg &
	PropMultiple &
	PropLabelWithExpertSlot;
type OptionalStates = {
	hint: string;
	on: InputTypeOnDefault;
	tabIndex: number;
} & PropAccessKey &
	PropDisabled &
	PropHideLabel &
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
