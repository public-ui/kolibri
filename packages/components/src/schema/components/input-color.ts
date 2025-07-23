import type { Generic } from 'adopted-style-sheets';

import type {
	MsgPropType,
	PropAccessKey,
	PropAutoComplete,
	PropDisabled,
	PropHideLabel,
	PropHideMsg,
	PropHorizontalIcons,
	PropLabelWithExpertSlot,
	PropMsg,
	PropName,
	PropShortKey,
	PropSuggestions,
	PropSyncValueBySelector,
	PropTouched,
} from '../props';
import type { InputTypeOnDefault, KoliBriHIcons, Stringified, W3CInputValue } from '../types';
import type { ButtonProps } from './button';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	hint: string;
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	smartButton: Stringified<ButtonProps>;
	value: string;
} & PropAccessKey &
	PropAutoComplete &
	PropDisabled &
	PropHideMsg &
	PropHideLabel &
	PropHorizontalIcons &
	PropName &
	PropShortKey &
	PropSuggestions &
	PropSyncValueBySelector &
	PropTouched;

type RequiredStates = {
	id: string;
	suggestions: W3CInputValue[];
} & PropHideMsg &
	PropLabelWithExpertSlot;
type OptionalStates = {
	hint: string;
	on: InputTypeOnDefault;
	smartButton: ButtonProps;
	value: string;
} & PropAccessKey &
	PropAutoComplete &
	PropDisabled &
	PropHideLabel &
	KoliBriHIcons &
	PropMsg &
	PropName &
	PropShortKey &
	PropTouched;

export type InputColorProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type InputColorStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type InputColorWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type InputColorAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
