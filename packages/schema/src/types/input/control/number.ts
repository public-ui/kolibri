import type { Stringified } from '../../common';
import type { KoliBriHorizontalIcons } from '../../icons';
import type { ButtonProps } from '../../../components';
import type { InputTypeOnDefault, InputTypeOnOff } from '../types';

export const inputDateTypeOptions = ['date', 'datetime-local', 'month', 'time', 'week'] as const;
export type InputDateType = (typeof inputDateTypeOptions)[number];

export type OptionalInputProps<T> = {
	accessKey: string;
	alert: boolean;
	autoComplete: InputTypeOnOff;
	disabled: boolean;
	error: string;
	hideLabel: boolean;
	hint: string;
	icons: Stringified<KoliBriHorizontalIcons>;
	max: T;
	min: T;
	name: string;
	on: InputTypeOnDefault;
	readOnly: boolean;
	required: boolean;
	smartButton: Stringified<ButtonProps>;
	step: number;
	tabIndex: number;
	touched: boolean;
	value: T | null;
};
