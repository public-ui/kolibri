import type { Generic } from 'adopted-style-sheets';

import type {
	PropAccessKey,
	PropCurrentLength,
	PropDisabled,
	PropHasCounter,
	PropHasValue,
	PropHideLabel,
	PropHideMsg,
	PropHint,
	PropHorizontalIcons,
	PropId,
	PropLabelWithExpertSlot,
	PropMaxLengthBehavior,
	PropMaxLength,
	PropMsg,
	PropName,
	PropPlaceholder,
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
	on: InputTypeOnDefault;
	pattern: string;
	smartButton: Stringified<ButtonProps>;
	value: string;
} & PropAccessKey &
	PropPasswordVariant &
	PropDisabled &
	PropHasCounter &
	PropHideMsg &
	PropHideLabel &
	PropHorizontalIcons &
	PropMaxLengthBehavior &
	PropName &
	PropReadOnly &
	PropRequired &
	PropShortKey &
	PropSyncValueBySelector &
	PropTouched &
	PropHint &
	PropMaxLength &
	PropMsg &
	PropPlaceholder;

type RequiredStates = {
	autoComplete: InputTypeOnOff;
	currentLength: number;
	currentLengthDebounced: number;
	hasValue: boolean;
} & PropId &
	PropHasValue &
	PropHideMsg &
	PropLabelWithExpertSlot;
type OptionalStates = {
	hint: string;
	maxLength: number;
	on: InputTypeOnDefault;
	pattern: string;
	smartButton: ButtonProps;
	value: string | null;
} & PropAccessKey &
	PropCurrentLength &
	PropPasswordVariant &
	PropDisabled &
	PropHasCounter &
	PropHideLabel &
	PropHint &
	KoliBriHIcons &
	PropMaxLengthBehavior &
	PropMaxLength &
	PropMsg &
	PropName &
	PropPlaceholder &
	PropReadOnly &
	PropRequired &
	PropShortKey &
	PropTouched;

export type InputPasswordProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type InputPasswordStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type InputPasswordWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type InputPasswordAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
