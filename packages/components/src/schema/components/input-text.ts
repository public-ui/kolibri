import type { Generic } from 'adopted-style-sheets';

import type {
	InputTextTypePropType,
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
	PropSpellCheck,
	PropSuggestions,
	PropSyncValueBySelector,
	PropTouched,
	PropVariantClassName,
} from '../props';
import type { InputTypeOnDefault, KoliBriHIcons, Stringified, W3CInputValue } from '../types';
import type { InternalButtonProps } from './button';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	maxLength: number;
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	pattern: string;
	placeholder: string;
	smartButton: Stringified<InternalButtonProps>;
	type: InputTextTypePropType;
	value: string;
} & PropAccessKey &
	PropAutoComplete &
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
	PropSpellCheck &
	PropSuggestions &
	PropSyncValueBySelector &
	PropTouched &
	PropVariantClassName;

type RequiredStates = {
	currentLength: number;
	currentLengthDebounced: number;
	hasValue: boolean;
	suggestions: W3CInputValue[];
	type: InputTextTypePropType;
} & PropHideMsg &
	PropId &
	PropLabelWithExpertSlot;
type OptionalStates = {
	maxLength: number;
	on: InputTypeOnDefault;
	pattern: string;
	placeholder: string;
	smartButton: InternalButtonProps;
	value: string;
} & PropAccessKey &
	PropAutoComplete &
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
	PropSpellCheck &
	PropTouched &
	PropVariantClassName;

export type InputTextProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type InputTextStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type InputTextWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type InputTextAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
