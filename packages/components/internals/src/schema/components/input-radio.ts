import type { Generic } from 'adopted-style-sheets';
import type {
	MsgPropType,
	PropAriaDetails,
	PropDisabled,
	PropHideLabel,
	PropHideMsg,
	PropHint,
	PropId,
	PropLabelWithExpertSlot,
	PropMsg,
	PropName,
	PropRadioOptions,
	PropRequired,
	PropSyncValueBySelector,
	PropTooltipAlign,
	PropTouched,
	PropVariantClassName,
} from '../props';
import type { PropOrientation } from '../props/orientation';
import type { InputTypeOnDefault, RadioOption, StencilUnknown, Stringified } from '../types';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	value: StencilUnknown;
} & PropAriaDetails &
	PropDisabled &
	PropHideLabel &
	PropHideMsg &
	PropHint &
	PropName &
	PropOrientation &
	PropRadioOptions & // PropRadioOptions becomes required with 2.0
	PropRequired &
	PropSyncValueBySelector &
	PropTouched &
	PropTooltipAlign &
	PropVariantClassName;

type RequiredStates = {
	options: RadioOption<StencilUnknown>[];
} & PropId &
	PropHideMsg &
	PropLabelWithExpertSlot &
	PropOrientation;
type OptionalStates = {
	on: InputTypeOnDefault;
	value: StencilUnknown;
} & PropDisabled &
	PropHideLabel &
	PropHint &
	PropMsg &
	PropName &
	PropRequired &
	PropTouched &
	PropVariantClassName;

export type InputRadioProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type InputRadioStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type InputRadioWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type InputRadioAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
