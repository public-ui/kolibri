import type { Generic } from 'adopted-style-sheets';
import type {
	MsgPropType,
	PropAccessKey,
	PropDisabled,
	PropHideLabel,
	PropHideMsg,
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
import type { InputTypeOnDefault, RadioOption, StencilUnknown, Stringified } from '../types';
import type { PropOrientation } from '../props/orientation';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	hint: string;
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	value: StencilUnknown;
} & PropAccessKey &
	PropDisabled &
	PropHideLabel &
	PropHideMsg &
	PropName &
	PropOrientation &
	PropRadioOptions & // PropRadioOptions becomes required with 2.0
	PropRequired &
	PropShortKey &
	PropSyncValueBySelector &
	PropTouched &
	PropTooltipAlign;

type RequiredStates = {
	options: RadioOption<StencilUnknown>[];
} & PropId &
	PropHideMsg &
	PropLabelWithExpertSlot &
	PropOrientation;
type OptionalStates = {
	hint: string;
	on: InputTypeOnDefault;
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
