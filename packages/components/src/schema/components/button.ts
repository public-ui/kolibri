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
	VariantClassNamePropType,
} from '../props';
import type { KoliBriAllIcons, StencilUnknown } from '../types';

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
	VariantClassNamePropType &
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

export type RequiredButtonStates = RequiredButtonProps &
	PropButtonType & {
		icons: KoliBriAllIcons;
	};
export type OptionalButtonStates = Omit<RequiredButtonProps & OptionalButtonProps, keyof RequiredButtonStates> & {
	variant: VariantClassNamePropType;
};

export type ButtonProps = Generic.Element.Members<RequiredButtonProps, OptionalButtonProps>;
export type ButtonStates = Generic.Element.Members<RequiredButtonStates, OptionalButtonStates>;
export type ButtonAPI = Generic.Element.ComponentApi<RequiredButtonProps, OptionalButtonProps, RequiredButtonStates, OptionalButtonStates>;

export type InternalButtonProps = RequiredButtonProps & OptionalButtonProps;
export type InternalButtonAPI = Omit<ButtonAPI, 'validateVariant'>;
