import type { Generic } from 'adopted-style-sheets';

import type {
	InputDateTypePropType,
	MsgPropType,
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
import type { InputTypeOnDefault, Iso8601, NumberString, Stringified } from '../types';
import type { InternalButtonProps } from './button';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	max: Iso8601 | Date;
	min: Iso8601 | Date;
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	smartButton: Stringified<InternalButtonProps>;
	step: number | NumberString;
	type: InputDateTypePropType;
	value: Iso8601 | Date | null;
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

export type InputDateProps = Generic.Element.Members<RequiredProps, OptionalProps>;
