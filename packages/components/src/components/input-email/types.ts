import { Generic } from '@a11y-ui/core';

import { Props as ButtonProps } from '../button/types';
import { Stringified } from '../../types/common';
import { KoliBriHorizontalIcon } from '../../types/icon';
import { InputTypeOnDefault, InputTypeOnOff } from '../../types/input/types';
import { PropLabelWithExpertSlot } from '../../types/props/label';
import { PropMultiple } from '../../types/props/multiple';
import { PropSuggestions } from '../../types/props/suggestions';
import { W3CInputValue } from '../../types/w3c';
import { InputRequiredProps } from '../input/types';
import { PropSyncValueBySelector } from '../../types/props/sync-value-by-selector';

type RequiredProps = InputRequiredProps;
type OptionalProps = {
	accessKey: string;
	alert: boolean;
	autoComplete: InputTypeOnOff;
	disabled: boolean;
	error: string;
	hasCounter: boolean;
	hideLabel: boolean;
	hint: string;
	icon: Stringified<KoliBriHorizontalIcon>;

	/**
	 * @deprecated Use suggestions instead.
	 */
	list: Stringified<string[]>;
	maxLength: number;
	name: string;
	on: InputTypeOnDefault;
	pattern: string;
	placeholder: string;
	readOnly: boolean;
	required: boolean;
	/**
	 * @deprecated
	 */
	size: number;
	smartButton: Stringified<ButtonProps>;
	touched: boolean;
	tabIndex: number;
	value: string;
} & PropMultiple &
	PropSuggestions &
	PropSyncValueBySelector;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	autoComplete: InputTypeOnOff;
	id: string;
	hasValue: boolean;
	suggestions: W3CInputValue[];
} & PropLabelWithExpertSlot;
type OptionalStates = {
	accessKey: string;
	alert: boolean;
	currentLength: number;
	disabled: boolean;
	error: string;
	hasCounter: boolean;
	hideLabel: boolean;
	hint: string;
	icon: KoliBriHorizontalIcon;
	maxLength: number;
	name: string;
	on: InputTypeOnDefault;
	pattern: string;
	placeholder: string;
	readOnly: boolean;
	required: boolean;
	/**
	 * @deprecated
	 */
	size: number;
	smartButton: ButtonProps;
	touched: boolean;
	tabIndex: number;
	value: string;
} & PropMultiple;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type Watches = Generic.Element.Watchers<RequiredProps, OptionalProps>;

export type ComponentApi = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
