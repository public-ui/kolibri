import type { Generic } from 'adopted-style-sheets';

import type {
	MsgPropType,
	PropAccessKey,
	PropDisabled,
	PropHasCounter,
	PropHideLabel,
	PropHideMsg,
	PropHorizontalIcons,
	PropId,
	PropLabelWithExpertSlot,
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
	PropHasCounter &
	PropHideMsg &
	PropHideLabel &
	PropHorizontalIcons &
	PropName &
	PropReadOnly &
	PropRequired &
	PropShortKey &
	PropSyncValueBySelector &
	PropTouched;

type RequiredStates = {
	autoComplete: InputTypeOnOff;
	hasValue: boolean;
} & PropId &
	PropHideMsg &
	PropLabelWithExpertSlot;
type OptionalStates = {
	currentLength: number;
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
	PropHasCounter &
	PropHideLabel &
	KoliBriHIcons &
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
