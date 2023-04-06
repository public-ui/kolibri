import { Generic } from '@a11y-ui/core';
import { ButtonProps } from '../../types/button-link';
import { KoliBriHorizontalIcon } from '../../types/icon';
import { PropAlert, PropDisabled, PropHideLabel, PropReadOnly, PropRequired, PropTouched } from '../../types/props';

type RequiredProps = {
	id: string;
};
type OptionalProps = {
	error: string;
	hint: string;
	icon: KoliBriHorizontalIcon;
	smartButton: ButtonProps;
} & PropDisabled &
	PropAlert &
	PropTouched &
	PropHideLabel &
	PropRequired &
	PropReadOnly;

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
