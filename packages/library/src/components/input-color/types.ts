import { Generic } from '@public-ui/core';
import { ButtonProps } from '../../types/button-link';
import { Stringified } from '../../types/common';
import { InputTypeOnDefault, InputTypeOnOff } from '../../types/input/types';
import { InputRequiredProps, KoliBriInputIcon } from '../input-text/types';

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
	name: string;
	on: InputTypeOnDefault;
	smartButton: ButtonProps;
	touched: boolean;
	tabIndex: number;
	value: string;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	autoComplete: InputTypeOnOff;
	id: string;
	list: string[];
	name: string;
};
type OptionalStates = {
	accessKey: string;
	alert: boolean;
	disabled: boolean;
	error: string;
	hideLabel: boolean;
	hint: string;
	icon: KoliBriInputIcon;
	on: InputTypeOnDefault;
	smartButton: ButtonProps;
	touched: boolean;
	tabIndex: number;
	value: string;
};

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type Watches = Generic.Element.Watchers<RequiredProps, OptionalProps>;

export type ComponentApi = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
