import type { Stringified } from '../../common';
import type { PropHorizontalIcons } from '../../../props';
import type { ButtonProps } from '../../../components';
import type { InputTypeOnDefault, InputTypeOnOff } from '../types';
import type { NumberString } from '../numberString';

export const inputDateTypeOptions = ['date', 'datetime-local', 'month', 'time', 'week'] as const;
export type InputDateType = (typeof inputDateTypeOptions)[number];

export type OptionalInputProps<T> = {
	accessKey: string;
	autoComplete: InputTypeOnOff;
	disabled: boolean;
	hideLabel: boolean;
	hint: string;
	max: T;
	min: T;
	name: string;
	on: InputTypeOnDefault;
	readOnly: boolean;
	required: boolean;
	smartButton: Stringified<ButtonProps>;
	step: number | NumberString;
	touched: boolean;
	value: T | null;
} & PropHorizontalIcons;
