import { Generic } from '@a11y-ui/core';
import { ButtonProps } from '../../types/button-link';
import { KoliBriHorizontalIcon } from '../../types/icon';
import { PropAlert, PropDisabled, PropHideLabel, PropTouched } from '../../types/props';

/**
 * API
 */
type RequiredProps = unknown;
type OptionalProps = {
	error: string;
	hint: string;
	icon: KoliBriHorizontalIcon;
	readOnly: boolean;
	required: boolean;
	smartButton: ButtonProps;
} & PropDisabled &
	PropAlert &
	PropTouched &
	PropHideLabel;

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
