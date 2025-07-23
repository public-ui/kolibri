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
	PropSpellCheck,
	PropSuggestions,
	PropSyncValueBySelector,
	PropTouched,
	PropTypeInputText,
} from '../props';
import type { InputTypeOnDefault, InputTypeOnOff, KoliBriHIcons, Stringified, W3CInputValue } from '../types';
import type { ButtonProps } from './button';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	autoComplete: InputTypeOnOff;
	on: InputTypeOnDefault;
	pattern: string;
	smartButton: Stringified<ButtonProps>;
	value: string;
} & PropAccessKey &
	PropDisabled &
	PropHasCounter &
	PropHideMsg &
	PropHideLabel &
	PropHorizontalIcons &
	PropId &
	PropMaxLengthBehavior &
	PropName &
	PropReadOnly &
	PropRequired &
	PropShortKey &
	PropSpellCheck &
	PropSuggestions &
	PropSyncValueBySelector &
	PropTouched &
	PropTypeInputText &
	PropHint &
	PropMaxLength &
	PropMsg &
	PropPlaceholder;

type RequiredStates = {
	autoComplete: InputTypeOnOff;
	currentLength: number;
	currentLengthDebounced: number;
	hasValue: boolean;
	suggestions: W3CInputValue[];
} & PropHideMsg &
	PropHasValue &
	PropId &
	PropLabelWithExpertSlot &
	PropTypeInputText;
type OptionalStates = {
	hint: string;
	maxLength: number;
	on: InputTypeOnDefault;
	pattern: string;
	smartButton: ButtonProps;
	value: string;
} & PropAccessKey &
	PropCurrentLength &
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
	PropSpellCheck &
	PropTouched;

export type InputTextProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type InputTextStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type InputTextWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type InputTextAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
