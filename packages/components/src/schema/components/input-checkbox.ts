import type { Generic } from 'adopted-style-sheets';

import type {
	PropAccessKey,
	PropChecked,
	PropDisabled,
	PropHideLabel,
	PropHideMsg,
	PropHint,
	PropIconsInputCheckbox,
	PropIndeterminate,
	PropLabelAlign,
	PropLabelWithExpertSlot,
	PropMsg,
	PropName,
	PropRequired,
	PropShortKey,
	PropSyncValueBySelector,
	PropTouched,
	PropVariantInputCheckbox,
	InputCheckboxIconsState,
} from '../props';
import type { InputTypeOnDefault, StencilUnknown } from '../types';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	on: InputTypeOnDefault;
	value: StencilUnknown;
} & PropAccessKey &
	PropChecked &
	PropDisabled &
	PropHideMsg &
	PropHideLabel &
	PropIconsInputCheckbox &
	PropIndeterminate &
	PropName &
	PropRequired &
	PropShortKey &
	PropSyncValueBySelector &
	PropTouched &
	PropLabelAlign &
	PropVariantInputCheckbox &
	PropHint &
	PropMsg;

type RequiredStates = {
	icons: InputCheckboxIconsState;
	id: string;
	value: StencilUnknown;
} & PropChecked &
	PropHideMsg &
	PropIndeterminate &
	PropLabelWithExpertSlot &
	PropVariantInputCheckbox;
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
