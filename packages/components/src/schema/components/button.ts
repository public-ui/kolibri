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
	PropCustomClass,
	PropDisabled,
	PropHideLabel,
	PropIcons,
	PropId,
	PropInline,
	PropLabelWithExpertSlot,
	PropName,
	PropShortKey,
	PropSyncValueBySelector,
	PropTooltipAlign,
	PropVariantClassName,
} from '../props';
import type { StencilUnknown } from '../types';

export type RequiredButtonProps = PropLabelWithExpertSlot;
export type OptionalButtonProps = {
	ariaExpanded: AriaExpandedPropType;
	tabIndex: number;
	value: StencilUnknown;
} & PropAccessKey &
	PropAlternativeButtonLinkRole &
	PropAriaControls &
	PropAriaDescription &
	PropAriaSelected &
	PropButtonCallbacks<StencilUnknown> &
	PropButtonType &
	PropVariantClassName &
	PropCustomClass &
	PropDisabled &
	PropHideLabel &
	PropIcons &
	PropId &
	PropInline &
	PropName &
	PropShortKey &
	PropSyncValueBySelector &
	PropTooltipAlign;

export type RequiredButtonStates = PropIcons & PropLabelWithExpertSlot & PropButtonCallbacks<StencilUnknown> & PropButtonType;
export type OptionalButtonStates = Omit<
	OptionalButtonProps,
	keyof PropIcons | keyof PropLabelWithExpertSlot | keyof PropButtonCallbacks<StencilUnknown> | keyof PropButtonType
>;

export type ButtonProps = Generic.Element.Members<RequiredButtonProps, OptionalButtonProps>;
export type InternalButtonProps = Generic.Element.Members<RequiredButtonProps, OptionalButtonProps>;
export type ButtonStates = Generic.Element.Members<RequiredButtonStates, OptionalButtonStates>;
export type ButtonAPI = Generic.Element.ComponentApi<RequiredButtonProps, OptionalButtonProps, RequiredButtonStates, OptionalButtonStates>;
