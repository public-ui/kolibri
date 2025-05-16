import type { Generic } from 'adopted-style-sheets';

import type {
	PropAccessKey,
	PropDisabled,
	PropHasCounter,
	PropHideMsg,
	PropHideLabel,
	PropId,
	PropLabelWithExpertSlot,
	PropMsg,
	PropReadOnly,
	PropRequired,
	PropSuggestions,
	PropSyncValueBySelector,
	PropTooltipAlign,
	PropTouched,
} from '../props';
import type { KoliBriHIcons, Stringified } from '../types';
import type { ButtonProps } from './button';

type RequiredProps = PropId & PropLabelWithExpertSlot;
type OptionalProps = {
	currentLength: number;
	hint: string;
	maxLength: number;
	slotName: string;
	smartButton: Stringified<ButtonProps>;
} & PropAccessKey &
	PropDisabled &
	PropHasCounter &
	PropHideMsg &
	PropHideLabel &
	KoliBriHIcons &
	PropMsg &
	PropReadOnly &
	PropRequired &
	PropSuggestions &
	PropSyncValueBySelector &
	PropTooltipAlign &
	PropTouched;

export type InputProps = Generic.Element.Members<RequiredProps, OptionalProps>;
