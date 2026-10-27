import type { Generic } from 'adopted-style-sheets';

import type {
	MsgPropType,
	PlaceholderPropType,
	PropAccessKey,
	PropAriaDetails,
	PropAutoComplete,
	PropDisabled,
	PropHideLabel,
	PropHideMsg,
	PropHint,
	PropHorizontalIcons,
	PropLabelWithExpertSlot,
	PropName,
	PropReadOnly,
	PropRequired,
	PropSuggestions,
	PropTouched,
	PropVariantClassName,
} from '../props';
import type { InputTypeOnDefault, NumberString, Stringified } from '../types';
import type { InternalButtonProps } from './button';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	max: number | NumberString;
	min: number | NumberString;
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	placeholder: PlaceholderPropType;
	smartButton: Stringified<InternalButtonProps>;
	step: number | NumberString;
	value: number | NumberString | null;
} & PropAccessKey &
	PropAriaDetails &
	PropAutoComplete &
	PropDisabled &
	PropHideLabel &
	PropHideMsg &
	PropHint &
	PropHorizontalIcons &
	PropName &
	PropReadOnly &
	PropRequired &
	PropSuggestions &
	PropTouched &
	PropVariantClassName;

export type InputNumberProps = Generic.Element.Members<RequiredProps, OptionalProps>;
