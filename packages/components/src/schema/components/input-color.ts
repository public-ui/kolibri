import type { Generic } from 'adopted-style-sheets';

import type {
	PropAccessKey,
	MsgPropType,
	PropDisabled,
	PropHideError,
	PropHideLabel,
	PropLabelWithExpertSlot,
	PropMsg,
	PropName,
	PropShortKey,
	PropSuggestions,
	PropSyncValueBySelector,
	PropTouched,
} from '../props';
import type { InputTypeOnDefault, InputTypeOnOff, KoliBriHorizontalIcons, Stringified, W3CInputValue } from '../types';
import type { ButtonProps } from './button';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	autoComplete: InputTypeOnOff;
	hint: string;
	icons: Stringified<KoliBriHorizontalIcons>;
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	smartButton: Stringified<ButtonProps>;
	tabIndex: number;
	value: string;
} & PropAccessKey &
	PropDisabled &
	PropHideError &
	PropHideLabel &
	PropName &
	PropShortKey &
	PropSuggestions &
	PropSyncValueBySelector &
	PropTouched;

type RequiredStates = {
	autoComplete: InputTypeOnOff;
	id: string;
	suggestions: W3CInputValue[];
} & PropHideError &
	PropLabelWithExpertSlot;
type OptionalStates = {
	hint: string;
	icons: KoliBriHorizontalIcons;
	on: InputTypeOnDefault;
	smartButton: ButtonProps;
	tabIndex: number;
	value: string;
} & PropAccessKey &
	PropDisabled &
	PropHideLabel &
	PropMsg &
	PropName &
	PropShortKey &
	PropTouched;

export type InputColorProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type InputColorStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type InputColorWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type InputColorAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
