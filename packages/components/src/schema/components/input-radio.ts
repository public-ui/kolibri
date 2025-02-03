import type { Generic } from 'adopted-style-sheets';
import type {
	MsgPropType,
	PropAccessKey,
	PropDisabled,
	PropHideError,
	PropHideLabel,
	PropId,
	PropLabelWithExpertSlot,
	PropMsg,
	PropName,
	PropRadioOptions,
	PropRequired,
	PropShortKey,
	PropSyncValueBySelector,
	PropTooltipAlign,
	PropTouched,
} from '../props';
import type { InputTypeOnDefault, RadioOption, Orientation, StencilUnknown, Stringified } from '../types';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	hint: string;
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	orientation: Orientation;
	tabIndex: number;
	value: StencilUnknown;
} & PropAccessKey &
	PropDisabled &
	PropHideError &
	PropHideLabel &
	PropName &
	PropRadioOptions & // PropRadioOptions becomes required with 2.0
	PropRequired &
	PropShortKey &
	PropSyncValueBySelector &
	PropTouched &
	PropTooltipAlign;

type RequiredStates = {
	options: RadioOption<StencilUnknown>[];
	orientation: Orientation;
} & PropId &
	PropHideError &
	PropLabelWithExpertSlot;
type OptionalStates = {
	hint: string;
	on: InputTypeOnDefault;
	tabIndex: number;
	value: StencilUnknown;
} & PropAccessKey &
	PropDisabled &
	PropHideLabel &
	PropMsg &
	PropName &
	PropRequired &
	PropShortKey &
	PropTouched;

export type InputRadioProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type InputRadioStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type InputRadioWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type InputRadioAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
