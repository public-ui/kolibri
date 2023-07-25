import { Generic } from '@a11y-ui/core';

import { Stringified } from '../../types/common';
import { InputTypeOnDefault, Option } from '../../types/input/types';
import { Orientation } from '../../types/orientation';
import { PropLabelWithExpertSlot } from '../../types/props/label';
import { W3CInputValue } from '../../types/w3c';
import { InputRequiredProps } from '../input/types';
import { PropOptions } from '../../types/props/options';

type RequiredProps = InputRequiredProps;
type OptionalProps = {
	accessKey: string;
	alert: boolean;
	disabled: boolean;
	error: string;
	hideLabel: boolean;
	hint: string;
	/**
	 * @deprecated Use options.
	 */
	list: Stringified<Option<W3CInputValue>[]>;
	name: string;
	on: InputTypeOnDefault;
	orientation: Orientation;
	required: boolean;
	syncValueBySelector: string;
	tabIndex: number;
	touched: boolean;
	value: W3CInputValue;
} & PropOptions; // PropOptions becomes required with 2.0
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	id: string;
	options: Option<W3CInputValue>[];
	orientation: Orientation;
} & PropLabelWithExpertSlot;
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

export type Watches = Generic.Element.Watchers<RequiredProps, Omit<OptionalProps, 'list'>>; // deprecated prop omitted

export type ComponentApi = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
