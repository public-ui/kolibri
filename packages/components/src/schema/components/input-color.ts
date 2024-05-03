import type { Generic } from 'adopted-style-sheets';

import type {
	PropDisabled,
	PropHideError,
	PropHideLabel,
	PropLabelWithExpertSlot,
	PropMsg,
	PropName,
	PropSuggestions,
	PropSyncValueBySelector,
	PropTouched,
} from '../props';
import type { InputTypeOnDefault, InputTypeOnOff, KoliBriHorizontalIcons, Stringified, W3CInputValue } from '../types';
import type { ButtonProps } from './button';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	accessKey: string;
	alert: boolean;
	autoComplete: InputTypeOnOff;
	/**
	 * @deprecated Will be removed in v3. Use `msg` instead.
	 */
	error: string;
	hint: string;
	icons: Stringified<KoliBriHorizontalIcons>;
	on: InputTypeOnDefault;
	smartButton: Stringified<ButtonProps>;
	tabIndex: number;
	value: string;
} & PropDisabled &
	PropHideError &
	PropHideLabel &
	PropMsg &
	PropName &
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
	accessKey: string;
	alert: boolean;
	hint: string;
	icons: KoliBriHorizontalIcons;
	on: InputTypeOnDefault;
	smartButton: ButtonProps;
	tabIndex: number;
	value: string;
} & PropDisabled &
	PropHideLabel &
	PropMsg &
	PropName &
	PropTouched;

export type InputColorProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type InputColorStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type InputColorWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type InputColorAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
