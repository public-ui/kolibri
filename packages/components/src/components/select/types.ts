import { Generic } from '@a11y-ui/core';

import { Stringified } from '../../types/common';
import { KoliBriHorizontalIcon } from '../../types/icon';
import { InputTypeOnDefault, SelectOption } from '../../types/input/types';
import { PropLabelWithExpertSlot } from '../../types/props/label';
import { W3CInputValue } from '../../types/w3c';
import { InputRequiredProps } from '../input/types';

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
	syncValueBySelector: string;
	tabIndex: number;
	touched: boolean;
	value: Stringified<W3CInputValue[]>;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	hasValue: boolean;
	id: string;
	list: SelectOption<W3CInputValue>[];
	multiple: boolean;
	value: W3CInputValue[];
} & PropLabelWithExpertSlot;
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
