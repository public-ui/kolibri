import type { Generic } from 'adopted-style-sheets';

import type {
	PropChecked,
	PropDisabled,
	PropHideError,
	PropHideLabel,
	PropIndeterminate,
	PropLabelWithExpertSlot,
	PropMsg,
	PropName,
	PropRequired,
	PropSyncValueBySelector,
	PropTouched,
	PropLabelAlign,
} from '../props';
import type { AnyIconFontClass, InputTypeOnDefault, StencilUnknown, Stringified } from '../types';

export const inputCheckboxVariantOptions = ['button', 'default', 'switch'] as const;
export type InputCheckboxVariant = (typeof inputCheckboxVariantOptions)[number];

export type InputCheckboxIconsProp =
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

export type InputCheckboxIconsState = {
	checked: AnyIconFontClass;
	indeterminate: AnyIconFontClass;
	unchecked: AnyIconFontClass;
};

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	accessKey: string;
	alert: boolean;
	/**
	 * @deprecated Will be removed in v3. Use `msg` instead.
	 */
	error: string;
	hint: string;
	icons: Stringified<InputCheckboxIconsProp>;
	on: InputTypeOnDefault;
	tabIndex: number;
	value: Stringified<StencilUnknown>;
	variant: InputCheckboxVariant;
} & PropChecked &
	PropDisabled &
	PropHideError &
	PropHideLabel &
	PropIndeterminate &
	PropMsg &
	PropName &
	PropRequired &
	PropSyncValueBySelector &
	PropTouched &
	PropLabelAlign;

type RequiredStates = {
	icons: InputCheckboxIconsState;
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
	hint: string;
	on: InputTypeOnDefault;
	tabIndex: number;
} & PropDisabled &
	PropHideLabel &
	PropMsg &
	PropName &
	PropRequired &
	PropTouched &
	PropLabelAlign;

export type InputCheckboxProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type InputCheckboxStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type InputCheckboxWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type InputCheckboxAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
