import { Generic } from '@a11y-ui/core';
import { ButtonProps } from '../../types/button-link';
import { KoliBriHorizontalIcon } from '../../types/icon';
import { PropAlert, PropDisabled } from '../../types/props';

/**
 * API
 */
type RequiredProps = unknown;
type OptionalProps = {
	error: string;
	hideLabel: boolean;
	hint: string;
	icon: KoliBriHorizontalIcon;
	readOnly: boolean;
	required: boolean;
	smartButton: ButtonProps;
	touched: boolean;
} & PropDisabled &
	PropAlert;

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
