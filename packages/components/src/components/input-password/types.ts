import { Generic } from '@a11y-ui/core';
import { ButtonProps } from '../../types/button-link';
import { Stringified } from '../../types/common';
import { InputTypeOnDefault, InputTypeOnOff } from '../../types/input/types';
import { InputRequiredProps } from '../input-text/types';
import { KoliBriHorizontalIcon } from '../../types/icon';

/**
 * API
 */
type RequiredProps = InputRequiredProps;
type OptionalProps = {
	accessKey: string;
	alert: boolean;
	autoComplete: InputTypeOnOff;
	disabled: boolean;
	error: string;
	hideLabel: boolean;
	hint: string;
	icon: Stringified<KoliBriHorizontalIcon>;
	maxLength: number;
	name: string;
	on: InputTypeOnDefault;
	pattern: string;
	placeholder: string;
	readOnly: boolean;
	required: boolean;
	size: number;
	smartButton: ButtonProps;
	tabIndex: number;
	touched: boolean;
	value: string;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	autoComplete: InputTypeOnOff;
	hasValue: boolean;
	id: string;
};
type OptionalStates = {
	accessKey: string;
	alert: boolean;
	disabled: boolean;
	error: string;
	hideLabel: boolean;
	hint: string;
	icon: KoliBriHorizontalIcon;
	maxLength: number;
	name: string;
	on: InputTypeOnDefault;
	pattern: string;
	placeholder: string;
	readOnly: boolean;
	required: boolean;
	size: number;
	smartButton: ButtonProps;
	tabIndex: number;
	touched: boolean;
	value: string | null;
};
export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type Watches = Generic.Element.Watchers<RequiredProps, OptionalProps>;

export type ComponentApi = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
