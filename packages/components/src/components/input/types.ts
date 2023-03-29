import { Generic } from '@a11y-ui/core';
import { ButtonProps } from '../../types/button-link';
import { KoliBriHorizontalIcon } from '../../types/icon';
import { PropAlert, PropDisabled, PropHideLabel, PropRequired, PropTouched } from '../../types/props';

/**
 * API
 */
type RequiredProps = unknown;
type OptionalProps = {
	error: string;
	hint: string;
	icon: KoliBriHorizontalIcon;
	readOnly: boolean;
	smartButton: ButtonProps;
} & PropDisabled &
	PropAlert &
	PropTouched &
	PropHideLabel &
	PropRequired;

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
