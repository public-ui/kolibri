import { Generic } from '@a11y-ui/core';
import { ButtonProps } from '../../types/button-link';
import { InputNumberType, OptionalInputProps } from '../../types/input/control/number';
import { Iso8601 } from '../../types/input/iso8601';
import { InputTypeOnDefault, InputTypeOnOff } from '../../types/input/types';
import { InputRequiredProps } from '../input-text/types';
import { KoliBriHorizontalIcon } from '../../types/icon';

type RequiredProps = InputRequiredProps;
type OptionalProps = OptionalInputProps<number | Iso8601> & { placeholder: string; type: InputNumberType };

type RequiredStates = {
	autoComplete: InputTypeOnOff;
	hasValue: boolean;
	id: string;
	list: string[];
	type: InputNumberType;
};

type OptionalStates = {
	accessKey: string;
	alert: boolean;
	disabled: boolean;
	error: string;
	hideLabel: boolean;
	hint: string;
	icon: KoliBriHorizontalIcon;
	max: string;
	min: string;
	name: string;
	on: InputTypeOnDefault;
	placeholder: string;
	readOnly: boolean;
	required: boolean;
	smartButton: ButtonProps;
	step: number;
	tabIndex: number;
	touched: boolean;
	value: string;
};

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type Watches = Generic.Element.Watchers<RequiredProps, OptionalProps>;

export type ComponentApi = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
