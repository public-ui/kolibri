import type { Generic } from 'adopted-style-sheets';

import type {
	MsgPropType,
	PropAccessKey,
	PropDisabled,
	PropHideError,
	PropHideLabel,
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
import type { InputTypeOnDefault, KoliBriHIcons, SelectOption, StencilUnknown, Stringified } from '../types';

type RequiredProps = PropLabelWithExpertSlot & PropOptionsWithOptgroup;
type OptionalProps = {
	alert: boolean;
	/**
	 * @deprecated Will be removed in v3. Use `msg` instead.
	 */
	error: string;
	hint: string;
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	tabIndex: number;
	value: Stringified<StencilUnknown[]>;
} & PropAccessKey &
	PropDisabled &
	PropHideError &
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
	options: SelectOption<StencilUnknown>[];
	value: StencilUnknown[];
} & PropId &
	PropHideError &
	PropMultiple &
	PropLabelWithExpertSlot;
type OptionalStates = {
	alert: boolean;
	error: string;
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
