import { Generic } from '@a11y-ui/core';
import { Stringified } from '../../types/common';
import { InputTypeOnDefault, SelectOption } from '../../types/input/types';
import { W3CInputValue } from '../../types/w3c';
import { InputRequiredProps } from '../input-text/types';
import { KoliBriHorizontalIcon } from '../../types/icon';

/**
 * API
 */
type RequiredProps = InputRequiredProps & {
	list: Stringified<SelectOption<W3CInputValue>[]>;
};
type OptionalProps = {
	accessKey: string;
	alert: boolean;
	disabled: boolean;
	error: string;
	/**
	 * @deprecated Use _size instead.
	 */
	height: string;
	hideLabel: boolean;
	hint: string;
	icon: Stringified<KoliBriHorizontalIcon>;
	multiple: boolean;
	name: string;
	on: InputTypeOnDefault;
	required: boolean;
	size: number;
	tabIndex: number;
	touched: boolean;
	value: Stringified<W3CInputValue[]>;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	id: string;
	list: SelectOption<W3CInputValue>[];
	multiple: boolean;
	value: W3CInputValue[];
};
type OptionalStates = {
	accessKey: string;
	alert: boolean;
	disabled: boolean;
	error: string;
	/**
	 * @deprecated Use _size instead.
	 */
	height: string;
	hideLabel: boolean;
	hint: string;
	icon: KoliBriHorizontalIcon;
	id: string;
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
