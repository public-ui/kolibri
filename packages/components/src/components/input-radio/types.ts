import { Generic } from '@a11y-ui/core';
import { Stringified } from '../../types/common';
import { InputTypeOnDefault, Option } from '../../types/input/types';
import { Orientation } from '../../types/orientation';
import { W3CInputValue } from '../../types/w3c';
import { InputRequiredProps } from '../input-text/types';

/**
 * API
 */
type RequiredProps = InputRequiredProps & {
	list: Stringified<Option<W3CInputValue>[]>;
};
type OptionalProps = {
	accessKey: string;
	alert: boolean;
	disabled: boolean;
	error: string;
	hideLabel: boolean;
	hint: string;
	name: string;
	on: InputTypeOnDefault;
	orientation: Orientation;
	required: boolean;
	tabIndex: number;
	touched: boolean;
	value: W3CInputValue;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	id: string;
	list: Option<W3CInputValue>[];
	orientation: Orientation;
};
type OptionalStates = {
	accessKey: string;
	alert: boolean;
	disabled: boolean;
	error: string;
	hideLabel: boolean;
	hint: string;
	name: string;
	on: InputTypeOnDefault;
	required: boolean;
	tabIndex: number;
	touched: boolean;
	value: W3CInputValue;
};

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type Watches = Generic.Element.Watchers<RequiredProps, OptionalProps>;

export type ComponentApi = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
