import { Generic } from '@a11y-ui/core';

import { Stringified } from '../../types/common';
import { KoliBriHorizontalIcon } from '../../types/icon';
import { InputTypeOnDefault, InputTypeOnOff, Option } from '../../types/input/types';
import { PropLabelWithExpertSlot } from '../../types/props/label';
import { InputRequiredProps } from '../input/types';
import { PropSuggestions } from '../../types/props/suggestions';

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

	/**
	 * @deprecated Use suggestions instead.
	 */
	list: Stringified<Option<number>[]>;
	max: number;
	min: number;
	name: string;
	on: InputTypeOnDefault;
	step: number;
	syncValueBySelector: string;
	tabIndex: number;
	touched: boolean;
	value: number;
} & PropSuggestions;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	autoComplete: InputTypeOnOff;
	id: string;
	suggestions: string[];
} & PropLabelWithExpertSlot;
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
