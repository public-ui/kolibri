import type { Generic } from 'adopted-style-sheets';

import type {
	ButtonProps,
	KoliBriHorizontalIcons,
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
	Stringified,
} from '@public-ui/schema';

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

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
