import { Generic } from '@public-ui/core';
import { Stringified } from '../../types/common';
import { InputTypeOnDefault, SelectOption } from '../../types/input/types';
import { InputRequiredProps, KoliBriInputIcon } from '../input-text/types';

/**
 * API
 */
type RequiredProps = InputRequiredProps & {
	list: Stringified<SelectOption<unknown>[]>;
};
type OptionalProps = {
	accessKey: string;
	alert: boolean;
	disabled: boolean;
	error: string;
	height: string;
	hideLabel: boolean;
	hint: string;
	icon: Stringified<KoliBriInputIcon>;
	multiple: boolean;
	name: string;
	on: InputTypeOnDefault;
	required: boolean;
	size: number;
	tabIndex: number;
	touched: boolean;
	value: Stringified<unknown[]>;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	id: string;
	list: SelectOption<unknown>[];
	value: unknown[];
};
type OptionalStates = {
	accessKey: string;
	alert: boolean;
	disabled: boolean;
	error: string;
	height: string;
	hideLabel: boolean;
	hint: string;
	icon: KoliBriInputIcon;
	id: string;
	multiple: boolean;
	name: string;
	on: InputTypeOnDefault;
	required: boolean;
	size: number;
	tabIndex: number;
	touched: boolean;
};

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type Watches = Generic.Element.Watchers<RequiredProps, OptionalProps>;

export type ComponentApi = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
