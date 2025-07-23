import type { Generic } from 'adopted-style-sheets';

import type {
	PropAccessKey,
	PropAdjustHeight,
	PropCurrentLength,
	PropDisabled,
	PropHasCounter,
	PropHasValue,
	PropHideLabel,
	PropHideMsg,
	PropHint,
	PropHorizontalIcons,
	PropId,
	PropLabelWithExpertSlot,
	PropMaxLength,
	PropMaxLengthBehavior,
	PropMsg,
	PropName,
	PropPlaceholder,
	PropReadOnly,
	PropRequired,
	PropResizeTextarea,
	PropRows,
	PropShortKey,
	PropSpellCheck,
	PropSyncValueBySelector,
	PropTouched,
} from '../props';
import type { InputTypeOnDefault, KoliBriHIcons } from '../types';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	on: InputTypeOnDefault;
	value: string;
} & PropAccessKey &
	PropAdjustHeight &
	PropDisabled &
	PropHasCounter &
	PropHideLabel &
	PropHideMsg &
	PropHorizontalIcons &
	PropId &
	PropMaxLengthBehavior &
	PropName &
	PropReadOnly &
	PropRequired &
	PropRows &
	PropShortKey &
	PropSpellCheck &
	PropSyncValueBySelector &
	PropTouched &
	PropHint &
	PropMaxLength &
	PropMsg &
	PropPlaceholder &
	PropResizeTextarea;

type RequiredStates = {
	adjustHeight: boolean;
	currentLengthDebounced: number;
} & PropAdjustHeight &
	PropCurrentLength &
	PropHasValue &
	PropHideMsg &
	PropId &
	PropLabelWithExpertSlot &
	PropResizeTextarea;

type OptionalStates = {
	on: InputTypeOnDefault;
	value: string;
} & PropAccessKey &
	KoliBriHIcons &
	PropDisabled &
	PropHasCounter &
	PropHideLabel &
	PropHint &
	PropMaxLength &
	PropMaxLengthBehavior &
	PropMsg &
	PropName &
	PropPlaceholder &
	PropReadOnly &
	PropRequired &
	PropRows &
	PropShortKey &
	PropSpellCheck &
	PropTouched;

export type TextareaProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type TextareaStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type TextareaWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
export type TextareaAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
