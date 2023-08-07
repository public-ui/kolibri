import { Generic } from '@a11y-ui/core';

import { Stringified } from '../../types/common';
import { KoliBriHorizontalIcon } from '../../types/icon';
import { InputTypeOnDefault, SelectOption } from '../../types/input/types';
import { PropLabelWithExpertSlot } from '../../types/props/label';
import { PropOptionsWithOptgroup } from '../../types/props/options';
import { PropRows } from '../../types/props/rows';
import { W3CInputValue } from '../../types/w3c';
import { InputRequiredProps } from '../input/types';
import { PropSyncValueBySelector } from '../../types/props/sync-value-by-selector';

type RequiredProps = InputRequiredProps;
type OptionalProps = {
	accessKey: string;
	alert: boolean;
	disabled: boolean;
	error: string;
	/**
	 * @deprecated Use _rows instead.
	 */
	height: string;
	hideLabel: boolean;
	hint: string;
	icon: Stringified<KoliBriHorizontalIcon>;
	/**
	 * @deprecated Use options.
	 */
	list: Stringified<SelectOption<W3CInputValue>[]>;
	multiple: boolean;
	name: string;
	on: InputTypeOnDefault;
	required: boolean;
	/**
	 * @deprecated Use _rows instead.
	 */
	size: number;
	tabIndex: number;
	touched: boolean;
	value: Stringified<W3CInputValue[]>;
} & PropRows &
	PropOptionsWithOptgroup & // PropOptionsWithOptgroup becomes required with 2.0
	PropSyncValueBySelector;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	hasValue: boolean;
	id: string;
	options: SelectOption<W3CInputValue>[];
	multiple: boolean;
	value: W3CInputValue[];
} & PropLabelWithExpertSlot;
type OptionalStates = {
	accessKey: string;
	alert: boolean;
	disabled: boolean;
	error: string;
	/**
	 * @deprecated Use _rows instead.
	 */
	height: string;
	hideLabel: boolean;
	hint: string;
	icon: KoliBriHorizontalIcon;
	id: string;
	name: string;
	on: InputTypeOnDefault;
	required: boolean;
	/**
	 * @deprecated Use _rows instead.
	 */
	size: number;
	tabIndex: number;
	touched: boolean;
} & PropRows;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type Watches = Generic.Element.Watchers<RequiredProps, Omit<OptionalProps, 'size' | 'list'>>; // deprecated props omitted

export type ComponentApi = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
