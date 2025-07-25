import type { Generic } from 'adopted-style-sheets';

import type {
	MsgPropType,
	PropAccessKey,
	PropAutoComplete,
	PropDisabled,
	PropHasCounter,
	PropHideLabel,
	PropHideMsg,
	PropHint,
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
import type { InputTypeOnDefault, KoliBriHIcons, Stringified } from '../types';
import type { ButtonProps } from './button';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	maxLength: number;
	on: InputTypeOnDefault;
	pattern: string;
	placeholder: string;
	smartButton: Stringified<ButtonProps>;
	value: string;
	msg: Stringified<MsgPropType>;
} & PropAccessKey &
	PropAutoComplete &
	PropPasswordVariant &
	PropDisabled &
	PropHasCounter &
	PropHideMsg &
	PropHideLabel &
	PropHint &
	PropHorizontalIcons &
	PropMaxLengthBehavior &
	PropName &
	PropReadOnly &
	PropRequired &
	PropShortKey &
	PropSyncValueBySelector &
	PropTouched;

type RequiredStates = {
	currentLength: number;
	currentLengthDebounced: number;
	hasValue: boolean;
} & PropId &
	PropHideMsg &
	PropLabelWithExpertSlot;
type OptionalStates = {
	maxLength: number;
	on: InputTypeOnDefault;
	pattern: string;
	placeholder: string;
	smartButton: ButtonProps;
	value: string | null;
} & PropAccessKey &
	PropAutoComplete &
	PropPasswordVariant &
	PropDisabled &
	PropHasCounter &
	PropHideLabel &
	PropHint &
	KoliBriHIcons &
	PropMaxLengthBehavior &
	PropMsg &
	PropName &
	PropReadOnly &
	PropRequired &
	PropShortKey &
	PropSyncValueBySelector &
	PropTouched;

export type InputPasswordProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type InputPasswordStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type InputPasswordWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type InputPasswordAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
