import type { Generic } from 'adopted-style-sheets';
import type {
	PropDisabled,
	PropHideError,
	PropHideLabel,
	PropId,
	PropLabelWithExpertSlot,
	PropMsg,
	PropName,
	PropOptions,
	PropRequired,
	PropSyncValueBySelector,
	PropTouched,
} from '../props';
import type { InputTypeOnDefault, Option, Orientation, W3CInputValue } from '../types';

type RequiredProps = NonNullable<unknown>;
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
	value: W3CInputValue;
} & PropDisabled &
	PropHideError &
	PropHideLabel &
	PropLabelWithExpertSlot &
	PropMsg &
	PropName &
	PropOptions & // PropOptions becomes required with 2.0
	PropRequired &
	PropSyncValueBySelector &
	PropTouched;

type RequiredStates = {
	options: Option<W3CInputValue>[];
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
	value: W3CInputValue;
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
