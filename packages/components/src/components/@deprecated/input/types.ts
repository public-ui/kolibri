import type { AccessKeyPropType, ButtonProps, InputTypeOnDefault, MsgPropType, PropLabelWithExpertSlot, ShortKeyPropType, Stringified } from '../../../schema';
import type { Generic } from 'adopted-style-sheets';

type RequiredProps = NonNullable<unknown>;
type OptionalProps = PropLabelWithExpertSlot & {
	accessKey: AccessKeyPropType;
	adjustHeight: boolean;
	disabled: boolean;
	error: string;
	hideError: boolean;
	hideLabel: boolean;
	hint: string;
	id: string;
	msg: MsgPropType;
	on: InputTypeOnDefault;
	shortKey: ShortKeyPropType;
	smartButton: Stringified<ButtonProps>;
	syncValueBySelector: string;
	tabIndex: number;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
export type Watches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
