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
	PropMaxLengthBehavior,
	PropMsg,
	PropName,
	PropReadOnly,
	PropRequired,
	PropShortKey,
	PropSyncValueBySelector,
	PropTouched,
} from '../props';
import type { PropPasswordVariant } from '../props/variant/password-variant';
import type { InputTypeOnDefault, InputTypeOnOff, KoliBriHIcons, Stringified } from '../types';
import type { ButtonProps } from './button';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	autoComplete: InputTypeOnOff;
	hint: string;
	maxLength: number;
	on: InputTypeOnDefault;
	pattern: string;
	placeholder: string;
	smartButton: Stringified<ButtonProps>;
	value: string;
	msg: Stringified<MsgPropType>;
} & PropAccessKey &
	PropPasswordVariant &
	PropDisabled &
	PropHideMsg &
	PropHideLabel &
	PropHorizontalIcons &
	PropMaxLengthBehavior &
	PropName &
	PropReadOnly &
	PropRequired &
	PropShortKey &
	PropSyncValueBySelector &
	PropTouched;

type RequiredStates = {
	autoComplete: InputTypeOnOff;
	currentLength: number;
	currentLengthDebounced: number;
	hasValue: boolean;
} & PropId &
	PropHideMsg &
	PropLabelWithExpertSlot;
type OptionalStates = {
	hint: string;
	maxLength: number;
	on: InputTypeOnDefault;
	pattern: string;
	placeholder: string;
	smartButton: ButtonProps;
	value: string | null;
} & PropAccessKey &
	PropPasswordVariant &
	PropDisabled &
	PropHideLabel &
	KoliBriHIcons &
	PropMaxLengthBehavior &
	PropMsg &
	PropName &
	PropReadOnly &
	PropRequired &
	PropShortKey &
	PropTouched;

export type InputPasswordProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type InputPasswordStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type InputPasswordWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type InputPasswordAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
