import type { Generic } from 'adopted-style-sheets';

import type {
	MsgPropType,
	PropChecked,
	PropDisabled,
	PropHideMsg,
	PropHideLabel,
	PropHint,
	PropIndeterminate,
	PropLabelAlign,
	PropLabelWithExpertSlot,
	PropMsg,
	PropName,
	PropRequired,
	PropSyncValueBySelector,
	PropTouched,
	PropShortKey,
	PropAccessKey,
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
	icons: Stringified<InputCheckboxIconsProp>;
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	value: StencilUnknown;
	variant: InputCheckboxVariant;
} & PropAccessKey &
	PropChecked &
	PropDisabled &
	PropHideMsg &
	PropHideLabel &
	PropHint &
	PropIndeterminate &
	PropName &
	PropRequired &
	PropShortKey &
	PropSyncValueBySelector &
	PropTouched &
	PropLabelAlign;

type RequiredStates = {
	icons: InputCheckboxIconsState;
	id: string;
	value: StencilUnknown;
	variant: InputCheckboxVariant;
} & PropChecked &
	PropHideMsg &
	PropIndeterminate &
	PropLabelWithExpertSlot;
type OptionalStates = {
	on: InputTypeOnDefault;
} & PropAccessKey &
	PropDisabled &
	PropHideLabel &
	PropHint &
	PropMsg &
	PropName &
	PropRequired &
	PropShortKey &
	PropTouched &
	PropLabelAlign;

export type InputCheckboxProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type InputCheckboxStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type InputCheckboxWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type InputCheckboxAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
