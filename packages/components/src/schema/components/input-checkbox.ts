import type { Generic } from 'adopted-style-sheets';

import type {
	InputCheckboxIconsProp,
	InputCheckboxVariantPropType,
	MsgPropType,
	PropAccessKey,
	PropAriaDetails,
	PropChecked,
	PropDisabled,
	PropHideLabel,
	PropHideMsg,
	PropHint,
	PropIndeterminate,
	PropLabelAlign,
	PropLabelWithExpertSlot,
	PropName,
	PropRequired,
	PropShortKey,
	PropSyncValueBySelector,
	PropTouched,
} from '../props';
import type { InputTypeOnDefault, StencilUnknown, Stringified } from '../types';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	icons: Stringified<InputCheckboxIconsProp>;
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	value: StencilUnknown;
	variant: InputCheckboxVariantPropType;
} & PropAccessKey &
	PropAriaDetails &
	PropChecked &
	PropDisabled &
	PropHideMsg &
	PropHideLabel &
	PropHint &
	PropIndeterminate &
	PropName &
	PropRequired &
	PropShortKey &
	PropSyncValueBySelector &
	PropTouched &
	PropLabelAlign;

export type InputCheckboxProps = Generic.Element.Members<RequiredProps, OptionalProps>;
