import type { Generic } from 'adopted-style-sheets';

import type {
	MsgPropType,
	PropDisabled,
	PropHideError,
	PropHideLabel,
	PropId,
	PropLabelWithExpertSlot,
	PropMsg,
	PropMultiple,
	PropName,
	PropOptionsWithOptgroup,
	PropRequired,
	PropRows,
	PropSyncValueBySelector,
	PropTouched,
} from '../props';
import type { InputTypeOnDefault, KoliBriHorizontalIcons, SelectOption, Stringified, W3CInputValue } from '../types';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	accessKey: string;
	alert: boolean;
	/**
	 * @deprecated Will be removed in v3. Use `msg` instead.
	 */
	error: string;
	hint: string;
	icons: Stringified<KoliBriHorizontalIcons>;
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	tabIndex: number;
	value: Stringified<W3CInputValue[]>;
} & PropDisabled &
	PropHideError &
	PropHideLabel &
	PropMultiple &
	PropName &
	PropOptionsWithOptgroup & // PropOptionsWithOptgroup becomes required with 2.0
	PropRequired &
	PropRows &
	PropSyncValueBySelector &
	PropTouched;

type RequiredStates = {
	hasValue: boolean;
	options: SelectOption<W3CInputValue>[];
	value: W3CInputValue[];
} & PropId &
	PropHideError &
	PropMultiple &
	PropLabelWithExpertSlot;
type OptionalStates = {
	accessKey: string;
	alert: boolean;
	error: string;
	hint: string;
	icons: KoliBriHorizontalIcons;
	on: InputTypeOnDefault;
	tabIndex: number;
} & PropDisabled &
	PropHideLabel &
	PropId &
	PropName &
	PropRequired &
	PropRows &
	PropMsg &
	PropTouched;

export type SelectProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type SelectStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type SelectWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type SelectAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
