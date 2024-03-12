import type { Generic } from 'adopted-style-sheets';
import type {
	PropDisabled,
	PropHideError,
	PropHideLabel,
	PropId,
	PropLabelWithExpertSlot,
	PropName,
	PropOptions,
	PropRequired,
	PropSyncValueBySelector,
	PropTouched,
} from '../props';
import type { InputTypeOnDefault, Option, Orientation, StencilUnknown } from '../types';

type RequiredProps = NonNullable<unknown>;
type OptionalProps = {
	accessKey: string;
	alert: boolean;
	error: string;
	hint: string;
	on: InputTypeOnDefault;
	orientation: Orientation;
	tabIndex: number;
	value: StencilUnknown;
} & PropDisabled &
	PropHideError &
	PropHideLabel &
	PropLabelWithExpertSlot &
	PropName &
	PropOptions & // PropOptions becomes required with 2.0
	PropRequired &
	PropSyncValueBySelector &
	PropTouched;

type RequiredStates = {
	options: Option<StencilUnknown>[];
	orientation: Orientation;
} & PropId &
	PropHideError &
	PropLabelWithExpertSlot;
type OptionalStates = {
	accessKey: string;
	alert: boolean;
	error: string;
	hint: string;
	on: InputTypeOnDefault;
	tabIndex: number;
	value: StencilUnknown;
} & PropDisabled &
	PropHideLabel &
	PropName &
	PropRequired &
	PropTouched;

export type InputRadioProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type InputRadioStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type InputRadioWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type InputRadioAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
