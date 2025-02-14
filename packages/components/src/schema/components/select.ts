import type { Generic } from 'adopted-style-sheets';

import type {
	MsgPropType,
	PropAccessKey,
	PropDisabled,
	PropHideMsg,
	PropHideLabel,
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
import type { InputTypeOnDefault, KoliBriHorizontalIcons, SelectOption, Stringified, W3CInputValue } from '../types';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	hint: string;
	icons: Stringified<KoliBriHorizontalIcons>;
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	tabIndex: number;
	value: Stringified<W3CInputValue[]>;
} & PropAccessKey &
	PropDisabled &
	PropHideMsg &
	PropHideLabel &
	PropMultiple &
	PropName &
	PropOptionsWithOptgroup & // PropOptionsWithOptgroup becomes required with 2.0
	PropRequired &
	PropRows &
	PropShortKey &
	PropSyncValueBySelector &
	PropTouched;

type RequiredStates = {
	hasValue: boolean;
	options: SelectOption<W3CInputValue>[];
	value: W3CInputValue[];
} & PropId &
	PropHideMsg &
	PropMultiple &
	PropLabelWithExpertSlot;
type OptionalStates = {
	hint: string;
	icons: KoliBriHorizontalIcons;
	on: InputTypeOnDefault;
	tabIndex: number;
} & PropAccessKey &
	PropDisabled &
	PropHideLabel &
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
