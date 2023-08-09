import { Generic } from '@a11y-ui/core';

import { Stringified } from '../../types/common';
import { AnyIconFontClass } from '../../types/icon';
import { InputTypeOnDefault } from '../../types/input/types';
import { PropChecked } from '../../types/props/checked';
import { PropIndeterminate } from '../../types/props/indeterminate';
import { PropLabelWithExpertSlot } from '../../types/props/label';
import { StencilUnknown } from '../../types/unknown';
import { PropSyncValueBySelector } from '../../types/props/sync-value-by-selector';

export type InputCheckboxVariant =
	| 'button'
	| 'checkbox' //deprecated
	| 'default'
	| 'switch';

export type InputCheckboxIcon = {
	checked: AnyIconFontClass;
	indeterminate?: AnyIconFontClass;
	unchecked?: AnyIconFontClass;
} & {
	checked?: AnyIconFontClass;
	indeterminate: AnyIconFontClass;
	unchecked?: AnyIconFontClass;
} & {
	checked?: AnyIconFontClass;
	indeterminate?: AnyIconFontClass;
	unchecked: AnyIconFontClass;
};

type RequiredProps = PropLabelWithExpertSlot & {
	value: Stringified<StencilUnknown>;
};
type OptionalProps = {
	alert: boolean;
	accessKey: string;
	disabled: boolean;
	error: string;
	hideLabel: boolean;
	hint: string;
	icon: Stringified<InputCheckboxIcon>;
	name: string;
	on: InputTypeOnDefault;
	required: boolean;
	touched: boolean;
	tabIndex: number;
	/**
	 * @deprecated
	 */
	type: InputCheckboxVariant;
	variant: InputCheckboxVariant;
} & PropChecked &
	PropIndeterminate &
	PropSyncValueBySelector;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	icon: InputCheckboxIcon;
	id: string;
	value: StencilUnknown;
	variant: InputCheckboxVariant;
} & PropChecked &
	PropIndeterminate &
	PropLabelWithExpertSlot;
type OptionalStates = {
	alert: boolean;
	accessKey: string;
	disabled: boolean;
	error: string;
	hideLabel: boolean;
	hint: string;
	name: string;
	on: InputTypeOnDefault;
	required: boolean;
	touched: boolean;
	tabIndex: number;
};

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type Watches = Generic.Element.Watchers<RequiredProps, OptionalProps>;

export type ComponentApi = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
