import type { Generic } from 'adopted-style-sheets';
import type {
	MsgPropType,
	PropAriaDetails,
	PropDisabled,
	PropHideLabel,
	PropHideMsg,
	PropHint,
	PropLabelWithExpertSlot,
	PropName,
	PropRadioOptions,
	PropRequired,
	PropSyncValueBySelector,
	PropTooltipAlign,
	PropTouched,
	PropVariantClassName,
} from '../props';
import type { PropOrientation } from '../props/orientation';
import type { InputTypeOnDefault, StencilUnknown, Stringified } from '../types';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	value: StencilUnknown;
} & PropAriaDetails &
	PropDisabled &
	PropHideLabel &
	PropHideMsg &
	PropHint &
	PropName &
	PropOrientation &
	PropRadioOptions & // PropRadioOptions becomes required with 2.0
	PropRequired &
	PropSyncValueBySelector &
	PropTouched &
	PropTooltipAlign &
	PropVariantClassName;

export type InputRadioProps = Generic.Element.Members<RequiredProps, OptionalProps>;
