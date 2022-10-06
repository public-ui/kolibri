import { Generic } from '@public-ui/core';
import { ButtonProps } from '../../types/button-link';
import { Stringified } from '../../types/common';
import { KoliBriHorizontalIcon } from '../../types/icon';
import { InputTextType } from '../../types/input/control/text';
import { InputTypeOnDefault, InputTypeOnOff } from '../../types/input/types';

export type InputRequiredProps = {
	id: string;
};

export type KoliBriInputIcon = KoliBriHorizontalIcon;

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
	icon: Stringified<KoliBriInputIcon>;
	list: Stringified<string[]>;
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
	type: InputTextType;
	value: string;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	autoComplete: InputTypeOnOff;
	id: string;
	list: string[];
	type: InputTextType;
};
type OptionalStates = {
	accessKey: string;
	alert: boolean;
	disabled: boolean;
	error: string;
	hideLabel: boolean;
	hint: string;
	icon: KoliBriInputIcon;
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
export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type Watches = Generic.Element.Watchers<RequiredProps, OptionalProps>;

export type ComponentApi = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
