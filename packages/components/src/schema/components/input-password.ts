import type { Generic } from 'adopted-style-sheets';

import type {
	MsgPropType,
	PropAccessKey,
	PropAriaDetails,
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
	PropVariantClassName,
} from '../props';
import { PropVisibilityToggle } from '../props/visibility-toggle';
import type { InputTypeOnDefault, KoliBriHIcons, Stringified } from '../types';
import type { InternalButtonProps } from './button';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	maxLength: number;
	on: InputTypeOnDefault;
	pattern: string;
	placeholder: string;
	smartButton: Stringified<InternalButtonProps>;
	value: string;
	msg: Stringified<MsgPropType>;
} & PropAccessKey &
	PropAriaDetails &
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
	PropSyncValueBySelector &
	PropTouched &
	PropVariantClassName &
	PropVisibilityToggle;

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
	smartButton: InternalButtonProps;
	value: string | null;
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
	PropSyncValueBySelector &
	PropTouched &
	PropVariantClassName &
	PropVisibilityToggle;

export type InputPasswordProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type InputPasswordStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type InputPasswordWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type InputPasswordAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
