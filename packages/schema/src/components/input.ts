import type { Generic } from 'adopted-style-sheets';

import type {
	PropAccessKey,
	PropAlert,
	PropDisabled,
	PropHasCounter,
	PropHideError,
	PropHideLabel,
	PropId,
	PropLabelWithExpertSlot,
	PropReadOnly,
	PropRequired,
	PropSuggestions,
	PropSyncValueBySelector,
	PropTooltipAlign,
	PropTouched,
} from '../props';
import type { KoliBriHorizontalIcons, Stringified } from '../types';
import type { ButtonProps } from './button';

type RequiredProps = PropId & PropLabelWithExpertSlot;
type OptionalProps = {
	currentLength: number;
	error: string;
	hint: string;
	icons: KoliBriHorizontalIcons;
	maxLength: number;
	slotName: string;
	smartButton: Stringified<ButtonProps>;
} & PropAccessKey &
	PropAlert &
	PropDisabled &
	PropHasCounter &
	PropHideError &
	PropHideLabel &
	PropReadOnly &
	PropRequired &
	PropSuggestions &
	PropSyncValueBySelector &
	PropTooltipAlign &
	PropTouched;

export type InputProps = Generic.Element.Members<RequiredProps, OptionalProps>;
