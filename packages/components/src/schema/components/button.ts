import type { Generic } from 'adopted-style-sheets';

import type {
	AriaExpandedPropType,
	PropAccessKey,
	PropAlternativeButtonLinkRole,
	PropAriaControls,
	PropAriaDescription,
	PropAriaSelected,
	PropButtonCallbacks,
	PropButtonType,
	PropButtonVariant,
	PropCustomClass,
	PropDisabled,
	PropHideLabel,
	PropIcons,
	PropId,
	PropLabelWithExpertSlot,
	PropName,
	PropShortKey,
	PropSyncValueBySelector,
	PropTooltipAlign,
} from '../props';
import type { KoliBriAllIcons, StencilUnknown, Stringified } from '../types';

export type RequiredButtonProps = PropLabelWithExpertSlot;
export type OptionalButtonProps = {
	tabIndex: number;
	value: Stringified<StencilUnknown>;
	/**
	 * @deprecated
	 */
	ariaExpanded: AriaExpandedPropType;
} & PropAccessKey &
	PropAlternativeButtonLinkRole &
	PropAriaControls &
	PropAriaDescription &
	PropAriaSelected &
	PropButtonCallbacks<StencilUnknown> &
	PropButtonType &
	PropButtonVariant &
	PropCustomClass &
	PropDisabled &
	PropHideLabel &
	PropIcons &
	PropId &
	PropName &
	PropShortKey &
	PropSyncValueBySelector &
	PropTooltipAlign;

export type RequiredButtonStates = RequiredButtonProps &
	PropButtonType &
	PropButtonVariant & {
		icons: KoliBriAllIcons;
	};
export type OptionalButtonStates = Omit<RequiredButtonProps & OptionalButtonProps, keyof RequiredButtonStates>;

export type ButtonProps = Generic.Element.Members<RequiredButtonProps, OptionalButtonProps>;
export type ButtonStates = Generic.Element.Members<RequiredButtonStates, OptionalButtonStates>;
export type ButtonAPI = Generic.Element.ComponentApi<RequiredButtonProps, OptionalButtonProps, RequiredButtonStates, OptionalButtonStates>;
