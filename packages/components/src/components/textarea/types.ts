import { Generic } from '@a11y-ui/core';

import { InputTypeOnDefault } from '../../types/input/types';
import { PropAdjustHeight } from '../../types/props/adjust-height';
import { PropHasCounter } from '../../types/props/has-counter';
import { PropLabelWithExpertSlot } from '../../types/props/label';
import { InputRequiredProps } from '../input/types';

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
	syncValueBySelector: string;
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
	PropLabelWithExpertSlot;
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
