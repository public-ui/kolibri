import { Generic } from '@a11y-ui/core';
import { Stringified } from '../../types/common';
import { InputTypeOnDefault, InputTypeOnOff, Option } from '../../types/input/types';
import { InputRequiredProps } from '../input-text/types';
import { KoliBriHorizontalIcon } from '../../types/icon';

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
	list: Stringified<Option<number>[]>;
	max: number;
	min: number;
	name: string;
	on: InputTypeOnDefault;
	step: number;
	tabIndex: number;
	touched: boolean;
	value: number;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	autoComplete: InputTypeOnOff;
	id: string;
	list: Option<number>[];
};
type OptionalStates = {
	accessKey: string;
	alert: boolean;
	disabled: boolean;
	error: string;
	hideLabel: boolean;
	hint: string;
	icon: KoliBriHorizontalIcon;
	max: number;
	min: number;
	name: string;
	on: InputTypeOnDefault;
	step: number;
	tabIndex: number;
	touched: boolean;
	value: number;
};

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type Watches = Generic.Element.Watchers<RequiredProps, OptionalProps>;

export type ComponentApi = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
