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
	PropRequired,
	PropShortKey,
	PropSyncValueBySelector,
	PropTouched,
} from '../props';
import type { InputTypeOnDefault, KoliBriHIcons, Stringified } from '../types';
import type { ButtonProps } from './button';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	accept: string;
	alert: boolean;
	/**
	 * @deprecated Will be removed in v3. Use `msg` instead.
	 */
	error: string;
	hint: string;
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	smartButton: Stringified<ButtonProps>;
	tabIndex: number;
	value: string;
} & PropAccessKey &
	PropDisabled &
	PropHideError &
	PropHideLabel &
	PropHorizontalIcons &
	PropMultiple &
	PropName &
	PropRequired &
	PropShortKey &
	PropSyncValueBySelector &
	PropTouched;

type RequiredStates = PropId & PropLabelWithExpertSlot & PropHideError;
type OptionalStates = {
	accept: string;
	alert: boolean;
	hint: string;
	on: InputTypeOnDefault;
	smartButton: ButtonProps;
	tabIndex: number;
	value: string;
} & PropAccessKey &
	PropDisabled &
	PropHideLabel &
	KoliBriHIcons &
	PropMsg &
	PropMultiple &
	PropName &
	PropRequired &
	PropShortKey &
	PropTouched;

export type InputFileProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type InputFileStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type InputFileWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type InputFileAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
