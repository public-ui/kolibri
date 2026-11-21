import type { Generic } from 'adopted-style-sheets';

import type {
	InputCheckboxIconsProp,
	InputCheckboxIconsState,
	MsgPropType,
	PropAccessKey,
	PropAriaDetails,
	PropChecked,
	PropDisabled,
	PropHideLabel,
	PropHideMsg,
	PropHint,
	PropLabelAlign,
	PropLabelWithExpertSlot,
	PropMsg,
	PropName,
	PropRequired,
	PropShortKey,
	PropSyncValueBySelector,
	PropTouched,
} from '../props';
import type { InputTypeOnDefault, StencilUnknown, Stringified } from '../types';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	icons: Stringified<InputCheckboxIconsProp>;
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	value: StencilUnknown;
} & PropAccessKey &
	PropAriaDetails &
	PropChecked &
	PropDisabled &
	PropHideMsg &
	PropHideLabel &
	PropHint &
	PropName &
	PropRequired &
	PropShortKey &
	PropSyncValueBySelector &
	PropTouched &
	PropLabelAlign;

type RequiredStates = {
	icons: InputCheckboxIconsState;
	id: string;
	value: StencilUnknown;
} & PropChecked &
	PropHideMsg &
	PropLabelWithExpertSlot;
type OptionalStates = {
	on: InputTypeOnDefault;
} & PropAccessKey &
	PropDisabled &
	PropHideLabel &
	PropHint &
	PropMsg &
	PropName &
	PropRequired &
	PropShortKey &
	PropTouched &
	PropLabelAlign;

export type InputSwitchProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type InputSwitchStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type InputSwitchWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type InputSwitchAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
