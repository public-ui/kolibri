import { Generic } from '@public-ui/core';
import { InputTypeOnDefault } from '../../types/input/types';
import { InputRequiredProps } from '../input-text/types';

export type CSSResize = 'both' | 'horizontal' | 'vertical' | 'none';

/**
 * API
 */
type RequiredProps = InputRequiredProps;
type OptionalProps = {
	accessKey: string;
	alert: boolean;
	disabled: boolean;
	error: string;
	hasCounter: boolean;
	hideLabel: boolean;
	hint: string;
	maxLength: number;
	name: string;
	on: InputTypeOnDefault;
	placeholder: string;
	readOnly: boolean;
	resize: CSSResize;
	required: boolean;
	rows: number;
	tabIndex: number;
	touched: boolean;
	value: string;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	currentLength: number;
	id: string;
	name: string;
	resize: CSSResize;
};
type OptionalStates = {
	accessKey: string;
	alert: boolean;
	disabled: boolean;
	error: string;
	hasCounter: boolean;
	hideLabel: boolean;
	hint: string;
	maxLength: number;
	on: InputTypeOnDefault;
	placeholder: string;
	readOnly: boolean;
	required: boolean;
	rows: number;
	tabIndex: number;
	touched: boolean;
	value: string;
};

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type Watches = Generic.Element.Watchers<RequiredProps, OptionalProps>;

export type ComponentApi = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
