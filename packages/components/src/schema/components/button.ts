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
	PropButtonVariant &
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

export type RequiredButtonStates = PropIcons & PropLabelWithExpertSlot & PropButtonCallbacks<StencilUnknown> & PropButtonType & PropButtonVariant;
export type OptionalButtonStates = Omit<
	OptionalButtonProps,
	keyof PropIcons | keyof PropLabelWithExpertSlot | keyof PropButtonCallbacks<StencilUnknown> | keyof PropButtonType | keyof PropButtonVariant
>;

export type ButtonProps = Generic.Element.Members<RequiredButtonProps, OptionalButtonProps>;
export type InternalButtonProps = Generic.Element.Members<RequiredButtonProps, Omit<OptionalButtonProps, keyof PropButtonVariant> & PropVariantClassName>;
export type ButtonStates = Generic.Element.Members<RequiredButtonStates, OptionalButtonStates>;
export type ButtonAPI = Generic.Element.ComponentApi<
	RequiredButtonProps,
	Omit<OptionalButtonProps, keyof PropButtonVariant> & PropVariantClassName,
	RequiredButtonStates,
	OptionalButtonStates
>;
