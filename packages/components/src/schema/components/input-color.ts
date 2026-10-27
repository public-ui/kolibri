import type { Generic } from 'adopted-style-sheets';

import type {
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
	PropShortKey,
	PropSuggestions,
	PropSyncValueBySelector,
	PropTouched,
	PropVariantClassName,
} from '../props';
import type { InputTypeOnDefault, Stringified } from '../types';
import type { InternalButtonProps } from './button';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	smartButton: Stringified<InternalButtonProps>;
	value: string;
} & PropAccessKey &
	PropAriaDetails &
	PropAutoComplete &
	PropDisabled &
	PropHideLabel &
	PropHideMsg &
	PropHint &
	PropHorizontalIcons &
	PropName &
	PropShortKey &
	PropSuggestions &
	PropSyncValueBySelector &
	PropTouched &
	PropVariantClassName;

export type InputColorProps = Generic.Element.Members<RequiredProps, OptionalProps>;
