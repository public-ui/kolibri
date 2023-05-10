import { Generic } from '@a11y-ui/core';
import { InputTypeOnDefault } from '../../types/input/types';
import { PropAdjustHeight, PropHasCounter, PropLabel } from '../../types/props';
import { InputRequiredProps } from '../input-text/types';

export type CSSResize = 'both' | 'horizontal' | 'vertical' | 'none';

type RequiredProps = InputRequiredProps;
type OptionalProps = {
	accessKey: string;
	alert: boolean;
	disabled: boolean;
	error: string;
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
} & PropAdjustHeight &
	PropHasCounter;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	adjustHeight: boolean;
	currentLength: number;
	id: string;
	hasValue: boolean;
	resize: CSSResize;
} & PropAdjustHeight &
	PropLabel;
type OptionalStates = {
	accessKey: string;
	alert: boolean;
	disabled: boolean;
	error: string;
	hideLabel: boolean;
	hint: string;
	maxLength: number;
	name: string;
	on: InputTypeOnDefault;
	placeholder: string;
	readOnly: boolean;
	required: boolean;
	rows: number;
	tabIndex: number;
	touched: boolean;
	value: string;
} & PropHasCounter;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type Watches = Generic.Element.Watchers<RequiredProps, OptionalProps>;

export type ComponentApi = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
