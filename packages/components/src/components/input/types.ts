import { Generic } from '@a11y-ui/core';
import { ButtonProps } from '../../types/button-link';
import { KoliBriHorizontalIcon } from '../../types/icon';
import { PropAlert, PropDisabled, PropHideLabel, PropLabel, PropReadOnly, PropRequired, PropTouched } from '../../types/props';

export type InputRequiredProps = PropLabel;

type RequiredProps = {
	id: string;
};
type OptionalProps = {
	error: string;
	hint: string;
	icon: KoliBriHorizontalIcon;
	smartButton: ButtonProps;
	syncValueBySelector: string;
} & PropAlert &
	PropDisabled &
	PropHideLabel &
	PropReadOnly &
	PropRequired &
	PropTouched;

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
