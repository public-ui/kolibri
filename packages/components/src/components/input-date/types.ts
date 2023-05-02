import { Generic } from '@a11y-ui/core';
import type { ButtonProps } from '../../types/button-link';
import type { KoliBriHorizontalIcon } from '../../types/icon';
import { InputDateType, OptionalInputProps } from '../../types/input/control/number';
import { Iso8601 } from '../../types/input/iso8601';
import type { InputTypeOnDefault, InputTypeOnOff } from '../../types/input/types';
import { InputRequiredProps } from '../input-text/types';

type RequiredProps = InputRequiredProps;
type OptionalProps = OptionalInputProps<Iso8601 | Date> & { type: InputDateType };

type RequiredStates = {
	autoComplete: InputTypeOnOff;
	hasValue: boolean;
	id: string;
	list: string[];
	type: InputDateType;
};

type OptionalStates = {
	accessKey: string;
	alert: boolean;
	disabled: boolean;
	error: string;
	hideLabel: boolean;
	hint: string;
	icon: KoliBriHorizontalIcon;
	max: Iso8601;
	min: Iso8601;
	name: string;
	on: InputTypeOnDefault;
	placeholder: string;
	readOnly: boolean;
	required: boolean;
	smartButton: ButtonProps;
	step: number;
	tabIndex: number;
	touched: boolean;
	value: Iso8601 | null;
};

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type Watches = Generic.Element.Watchers<RequiredProps, OptionalProps>;

export type ComponentApi = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
