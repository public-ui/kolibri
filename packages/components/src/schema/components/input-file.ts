import type { Generic } from 'adopted-style-sheets';

import type {
	MsgPropType,
	PropDisabled,
	PropHideMsg,
	PropHideLabel,
	PropId,
	PropLabelWithExpertSlot,
	PropMsg,
	PropMultiple,
	PropName,
	PropRequired,
	PropSyncValueBySelector,
	PropTouched,
	PropAccessKey,
	PropShortKey,
} from '../props';
import type { InputTypeOnDefault, KoliBriHorizontalIcons, Stringified } from '../types';
import type { ButtonProps } from './button';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	accept: string;
	hint: string;
	icons: Stringified<KoliBriHorizontalIcons>;
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	smartButton: Stringified<ButtonProps>;
	tabIndex: number;
} & PropAccessKey &
	PropDisabled &
	PropHideMsg &
	PropHideLabel &
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
	icons: KoliBriHorizontalIcons;
	on: InputTypeOnDefault;
	smartButton: ButtonProps;
	tabIndex: number;
} & PropAccessKey &
	PropDisabled &
	PropHideLabel &
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
