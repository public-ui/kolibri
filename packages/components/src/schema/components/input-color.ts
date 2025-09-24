import type { Generic } from 'adopted-style-sheets';

import type {
	MsgPropType,
	PropAccessKey,
	PropAutoComplete,
	PropDisabled,
	PropHideLabel,
	PropHideMsg,
	PropHint,
	PropHorizontalIcons,
	PropLabelWithExpertSlot,
	PropMsg,
	PropName,
	PropShortKey,
	PropSuggestions,
	PropSyncValueBySelector,
	PropTabIndex,
	PropTouched,
} from '../props';
import type { InputTypeOnDefault, KoliBriHIcons, Stringified, W3CInputValue } from '../types';
import type { ButtonProps } from './button';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	smartButton: Stringified<ButtonProps>;
	value: string;
} & PropAccessKey &
	PropAutoComplete &
	PropDisabled &
	PropHideLabel &
	PropHideMsg &
	PropHint &
	PropHorizontalIcons &
	PropName &
	PropShortKey &
	PropSuggestions &
	PropSyncValueBySelector &
	PropTabIndex &
	PropTouched;

type RequiredStates = {
	id: string;
	suggestions: W3CInputValue[];
} & PropHideMsg &
	PropLabelWithExpertSlot;
type OptionalStates = {
	on: InputTypeOnDefault;
	smartButton: ButtonProps;
	value: string;
} & PropAccessKey &
	PropAutoComplete &
	PropDisabled &
	PropHideLabel &
	PropHint &
	KoliBriHIcons &
	PropMsg &
	PropName &
	PropShortKey &
	PropTabIndex &
	PropTouched;

export type InputColorProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type InputColorStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type InputColorWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type InputColorAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
