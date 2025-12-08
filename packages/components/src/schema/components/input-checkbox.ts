import type { Generic } from 'adopted-style-sheets';

import type {
	InputCheckboxIconsProp,
	InputCheckboxIconsState,
	InputCheckboxVariantPropType,
	MsgPropType,
	PropAccessKey,
	PropChecked,
	PropDisabled,
	PropHideError,
	PropHideLabel,
	PropHideMsg,
	PropHint,
	PropIndeterminate,
	PropLabelAlign,
	PropLabelWithExpertSlot,
	PropMsg,
	PropName,
	PropRequired,
	PropShortKey,
	PropSyncValueBySelector,
	PropTouched,
} from '../props';
import type { InputTypeOnDefault, StencilUnknown, Stringified } from '../types';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	icons: Stringified<InputCheckboxIconsProp>;
	msg: Stringified<MsgPropType>;
	on: InputTypeOnDefault;
	value: StencilUnknown;
	variant: InputCheckboxVariantPropType;
} & PropAccessKey &
	PropChecked &
	PropDisabled &
	PropHideError &
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
	variant: InputCheckboxVariantPropType;
} & PropChecked &
	PropHideError &
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
