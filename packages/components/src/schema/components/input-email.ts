import type { Generic } from 'adopted-style-sheets';

import type {
	PropAccessKey,
	PropCurrentLength,
	PropDisabled,
	PropHasValue,
	PropHideLabel,
	PropHideMsg,
	PropHint,
	PropHorizontalIcons,
	PropId,
	PropLabelWithExpertSlot,
	PropMaxLength,
	PropMaxLengthBehavior,
	PropMsg,
	PropMultiple,
	PropName,
	PropPlaceholder,
	PropReadOnly,
	PropRequired,
	PropShortKey,
	PropSuggestions,
	PropSyncValueBySelector,
	PropTouched,
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
	PropHideMsg &
	PropHideLabel &
	PropHorizontalIcons &
	PropMaxLengthBehavior &
	PropMultiple &
	PropName &
	PropReadOnly &
	PropRequired &
	PropShortKey &
	PropSuggestions &
	PropSyncValueBySelector &
	PropTouched &
	PropHint &
	PropMaxLength &
	PropMsg &
	PropPlaceholder;

type RequiredStates = {
	suggestions: W3CInputValue[];
	currentLength: number;
	currentLengthDebounced: number;
} & PropId &
	PropHasValue &
	PropId &
	PropHideMsg &
	PropLabelWithExpertSlot;

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
	PropHideLabel &
	PropHint &
	KoliBriHIcons &
	PropMaxLengthBehavior &
	PropMaxLength &
	PropMsg &
	PropMultiple &
	PropName &
	PropPlaceholder &
	PropReadOnly &
	PropRequired &
	PropShortKey &
	PropTouched;

export type InputEmailProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type InputEmailStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type InputEmailWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type InputEmailAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
