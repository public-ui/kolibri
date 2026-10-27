import type { Generic } from 'adopted-style-sheets';

import type {
	MsgPropType,
	PropAccessKey,
	PropAriaDetails,
	PropDisabled,
	PropHideLabel,
	PropHideMsg,
	PropHint,
	PropHorizontalIcons,
	PropLabelWithExpertSlot,
	PropName,
	PropOptions,
	PropRequired,
	PropRows,
	PropShortKey,
	PropSyncValueBySelector,
	PropTouched,
	PropVariantClassName,
} from '../props';
import type { InputTypeOnDefault, StencilUnknown, Stringified } from '../types';

type RequiredProps = PropLabelWithExpertSlot & PropOptions;
type OptionalProps = {
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	placeholder: string;
	value: StencilUnknown;
	hasClearButton: boolean;
} & PropAccessKey &
	PropAriaDetails &
	PropDisabled &
	PropHideMsg &
	PropHideLabel &
	PropHint &
	PropHorizontalIcons &
	PropName &
	PropRequired &
	PropRows &
	PropSyncValueBySelector &
	PropShortKey &
	PropTouched &
	PropVariantClassName;

export type SingleSelectProps = Generic.Element.Members<RequiredProps, OptionalProps>;
