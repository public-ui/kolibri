import type { Generic } from 'adopted-style-sheets';
import type {
	AccessKeyPropType,
	InputTypeOnDefault,
	InternalButtonProps,
	MsgPropType,
	PropLabelWithExpertSlot,
	PropVariantClassName,
	ShortKeyPropType,
	Stringified,
} from '../../../schema';

type RequiredProps = NonNullable<unknown>;
type OptionalProps = PropLabelWithExpertSlot & {
	accessKey: AccessKeyPropType;
	adjustHeight: boolean;
	disabled: boolean;
	hideMsg: boolean;
	hideLabel: boolean;
	hint: string;
	msg: MsgPropType;
	on: InputTypeOnDefault;
	shortKey: ShortKeyPropType;
	smartButton: Stringified<InternalButtonProps>;
	syncValueBySelector: string;
	tabIndex: number;
} & PropVariantClassName;

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
export type Watches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
