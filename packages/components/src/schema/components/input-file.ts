import type { Generic } from 'adopted-style-sheets';

import type {
	MsgPropType,
	PropAccessKey,
	PropDisabled,
	PropHideLabel,
	PropHideMsg,
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
	hint: string;
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	smartButton: Stringified<ButtonProps>;
} & PropAccessKey &
	PropDisabled &
	PropHideMsg &
	PropHideLabel &
	PropHorizontalIcons &
	PropMultiple &
	PropName &
	PropRequired &
	PropShortKey &
	PropSyncValueBySelector &
	PropTouched;

type RequiredStates = PropId & PropLabelWithExpertSlot & PropHideMsg;
type OptionalStates = {
	accept: string;
	hint: string;
	on: InputTypeOnDefault;
	smartButton: ButtonProps;
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
