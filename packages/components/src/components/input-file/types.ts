import { Generic } from '@a11y-ui/core';

import { ButtonProps } from '../../types/button-link';
import { Stringified } from '../../types/common';
import { KoliBriHorizontalIcon } from '../../types/icon';
import { InputTypeOnDefault } from '../../types/input/types';
import { PropLabelWithExpertSlot } from '../../types/props/label';
import { InputRequiredProps } from '../input/types';

type RequiredProps = InputRequiredProps;
type OptionalProps = {
	accept: string;
	alert: boolean;
	accessKey: string;
	disabled: boolean;
	error: string;
	hideLabel: boolean;
	hint: string;
	icon: Stringified<KoliBriHorizontalIcon>;
	multiple: boolean;
	name: string;
	on: InputTypeOnDefault;
	required: boolean;
	smartButton: ButtonProps;
	syncValueBySelector: string;
	touched: boolean;
	tabIndex: number;
	value: string;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	id: string;
} & PropLabelWithExpertSlot;
type OptionalStates = {
	accept: string;
	alert: boolean;
	accessKey: string;
	disabled: boolean;
	error: string;
	hideLabel: boolean;
	hint: string;
	icon: KoliBriHorizontalIcon;
	multiple: boolean;
	name: string;
	on: InputTypeOnDefault;
	required: boolean;
	smartButton: ButtonProps;
	touched: boolean;
	tabIndex: number;
	value: string;
};

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type Watches = Generic.Element.Watchers<RequiredProps, OptionalProps>;

export type ComponentApi = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
