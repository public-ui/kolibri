import { KoliBriInputIcon } from '../../../components/input-text/types';
import { ButtonProps } from '../../button-link';
import { Stringified } from '../../common';
import { InputTypeOnDefault, InputTypeOnOff } from '../types';

export type InputNumberType = /* 'datetime' | */ 'number' | 'date' | 'datetime-local' | 'month' | 'time' | 'week';

export type OptionalInputNumberProps<T> = {
	accessKey: string;
	alert: boolean;
	autoComplete: InputTypeOnOff;
	disabled: boolean;
	error: string;
	hideLabel: boolean;
	hint: string;
	icon: Stringified<KoliBriInputIcon>;
	list: Stringified<string[]>;
	max: T;
	min: T;
	name: string;
	on: InputTypeOnDefault;
	placeholder: string;
	readOnly: boolean;
	required: boolean;
	smartButton: ButtonProps;
	step: number;
	tabIndex: number;
	touched: boolean;
	value: T;
};
