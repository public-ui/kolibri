import { Generic } from '@a11y-ui/core';
import { ButtonProps } from '../../types/button-link';
import { Stringified } from '../../types/common';
import { InputTypeOnDefault, InputTypeOnOff } from '../../types/input/types';
import { InputRequiredProps } from '../input/types';
import { KoliBriHorizontalIcon } from '../../types/icon';
import { PropLabel, PropMultiple } from '../../types/props';

type RequiredProps = InputRequiredProps;
type OptionalProps = {
	accessKey: string;
	alert: boolean;
	autoComplete: InputTypeOnOff;
	disabled: boolean;
	error: string;
	hasCounter: boolean;
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
	/**
	 * @deprecated
	 */
	size: number;
	smartButton: ButtonProps;
	syncValueBySelector: string;
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
} & PropLabel;
type OptionalStates = {
	accessKey: string;
	alert: boolean;
	currentLength: number;
	disabled: boolean;
	error: string;
	hasCounter: boolean;
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
	/**
	 * @deprecated
	 */
	size: number;
	smartButton: ButtonProps;
	touched: boolean;
	tabIndex: number;
	value: string;
};

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type Watches = Generic.Element.Watchers<RequiredProps, OptionalProps>;

export type ComponentApi = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
