import { Generic } from '@a11y-ui/core';
import { ButtonProps } from '../../types/button-link';
import { Stringified } from '../../types/common';
import { InputTypeOnDefault, InputTypeOnOff } from '../../types/input/types';
import { InputRequiredProps } from '../input-text/types';
import { KoliBriHorizontalIcon } from '../../types/icon';
import { PropMultiple } from '../../types/props';

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
	touched: boolean;
	tabIndex: number;
	value: string;
} & PropMultiple;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	autoComplete: InputTypeOnOff;
	id: string;
	hasValue: boolean;
	list: string[];
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
	multiple: boolean;
	name: string;
	on: InputTypeOnDefault;
	pattern: string;
	placeholder: string;
	readOnly: boolean;
	required: boolean;
	size: number;
	smartButton: ButtonProps;
	touched: boolean;
	tabIndex: number;
	value: string;
};

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type Watches = Generic.Element.Watchers<RequiredProps, OptionalProps>;

export type ComponentApi = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
