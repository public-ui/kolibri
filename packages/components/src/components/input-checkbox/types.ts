import { Generic } from '@a11y-ui/core';

import { Stringified } from '../../types/common';
import { AnyIconFontClass } from '../../types/icon';
import { InputTypeOnDefault } from '../../types/input/types';
import { PropChecked } from '../../types/props/checked';
import { PropDisabled } from '../../types/props/disabled';
import { PropHideError } from '../../types/props/hide-error';
import { PropHideLabel } from '../../types/props/hide-label';
import { PropIndeterminate } from '../../types/props/indeterminate';
import { PropLabelWithExpertSlot } from '../../types/props/label';
import { PropName } from '../../types/props/name';
import { PropRequired } from '../../types/props/required';
import { PropSyncValueBySelector } from '../../types/props/sync-value-by-selector';
import { PropTouched } from '../../types/props/touched';
import { StencilUnknown } from '../../types/unknown';

export type InputCheckboxVariant =
	| 'button'
	| 'checkbox' //deprecated
	| 'default'
	| 'switch';

export type InputCheckboxIconProp =
	| {
			checked: AnyIconFontClass;
			indeterminate?: AnyIconFontClass;
			unchecked?: AnyIconFontClass;
	  }
	| {
			checked?: AnyIconFontClass;
			indeterminate: AnyIconFontClass;
			unchecked?: AnyIconFontClass;
	  }
	| {
			checked?: AnyIconFontClass;
			indeterminate?: AnyIconFontClass;
			unchecked: AnyIconFontClass;
	  };

export type InputCheckboxIconState = {
	checked: AnyIconFontClass;
	indeterminate: AnyIconFontClass;
	unchecked: AnyIconFontClass;
};

type RequiredProps = NonNullable<unknown>;
type OptionalProps = {
	accessKey: string;
	alert: boolean;
	error: string;
	hint: string;
	icon: Stringified<InputCheckboxIconProp>;
	on: InputTypeOnDefault;
	tabIndex: number;
	/**
	 * @deprecated
	 */
	type: InputCheckboxVariant;
	value: Stringified<StencilUnknown>;
	variant: InputCheckboxVariant;
} & PropChecked &
	PropDisabled &
	PropHideError &
	PropHideLabel &
	PropIndeterminate &
	PropLabelWithExpertSlot &
	PropName &
	PropRequired &
	PropSyncValueBySelector &
	PropTouched;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	icon: InputCheckboxIconState;
	id: string;
	value: StencilUnknown;
	variant: InputCheckboxVariant;
} & PropChecked &
	PropHideError &
	PropIndeterminate &
	PropLabelWithExpertSlot;
type OptionalStates = {
	accessKey: string;
	alert: boolean;
	error: string;
	hint: string;
	on: InputTypeOnDefault;
	tabIndex: number;
} & PropDisabled &
	PropHideLabel &
	PropName &
	PropRequired &
	PropTouched;

export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type Watches = Generic.Element.Watchers<RequiredProps, OptionalProps>;

export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
