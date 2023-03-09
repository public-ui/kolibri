import { Generic } from '@a11y-ui/core';
import { ButtonProps } from '../../types/button-link';
import { KoliBriHorizontalIcon } from '../../types/icon';

/**
 * API
 */
type RequiredProps = unknown;
type OptionalProps = {
	alert: boolean;
	disabled: boolean;
	error: string;
	hideLabel: boolean;
	hint: string;
	icon: KoliBriHorizontalIcon;
	readOnly: boolean;
	required: boolean;
	smartButton: ButtonProps;
	touched: boolean;
};

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
