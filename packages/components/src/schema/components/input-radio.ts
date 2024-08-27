import type { Generic } from 'adopted-style-sheets';
import type {
	PropDisabled,
	PropHideError,
	PropHideLabel,
	PropId,
	PropLabelWithExpertSlot,
	PropMsg,
	PropName,
	PropRadioOptions,
	PropRequired,
	PropSyncValueBySelector,
	PropTooltipAlign,
	PropTouched,
} from '../props';
import type { InputTypeOnDefault, RadioOption, Orientation, StencilUnknown } from '../types';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	accessKey: string;
	alert: boolean;
	/**
	 * @deprecated Will be removed in v3. Use `msg` instead.
	 */
	error: string;
	hint: string;
	on: InputTypeOnDefault;
	orientation: Orientation;
	tabIndex: number;
	value: StencilUnknown;
} & PropDisabled &
	PropHideError &
	PropHideLabel &
	PropMsg &
	PropName &
	PropRadioOptions & // PropRadioOptions becomes required with 2.0
	PropRequired &
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
	accessKey: string;
	alert: boolean;
	hint: string;
	on: InputTypeOnDefault;
	tabIndex: number;
	value: StencilUnknown;
} & PropDisabled &
	PropHideLabel &
	PropMsg &
	PropName &
	PropRequired &
	PropTouched;

export type InputRadioProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type InputRadioStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type InputRadioWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type InputRadioAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
