import { Generic } from '@a11y-ui/core';
import { ButtonProps } from '../../../types/button-link';
import { InputTypeOnDefault } from '../../../types/input/types';

type RequiredProps = unknown;
type OptionalProps = {
	accessKey: string;
	adjustHeight: boolean;
	disabled: boolean;
	error: string;
	hideLabel: boolean;
	hint: string;
	id: string;
	name: string;
	on: InputTypeOnDefault;
	smartButton: ButtonProps;
	tabIndex: number;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
export type Watches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
