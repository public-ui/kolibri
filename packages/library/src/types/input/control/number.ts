import { ButtonProps } from '../../button-link';
import { Stringified } from '../../common';
import { KoliBriHorizontalIcon } from '../../icon';
import { InputTypeOnDefault, InputTypeOnOff } from '../types';

export type InputDateType = 'date' | 'datetime-local' | 'month' | 'time' | 'week';
export type InputNumberType = 'number' | InputDateType;

export type OptionalInputProps<T> = {
	accessKey: string;
	alert: boolean;
	autoComplete: InputTypeOnOff;
	disabled: boolean;
	error: string;
	hideLabel: boolean;
	hint: string;
	icon: Stringified<KoliBriHorizontalIcon>;
	list: Stringified<string[]>;
	max: T;
	min: T;
	name: string;
	on: InputTypeOnDefault;
	readOnly: boolean;
	required: boolean;
	smartButton: ButtonProps;
	step: number;
	tabIndex: number;
	touched: boolean;
	value: T;
};
