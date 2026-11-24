import type { ComponentPropsOptional, ComponentPropsRequired } from '../../internal/functional-components/generic-types';
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

export type ButtonProps = ComponentPropsRequired<RequiredButtonProps> & ComponentPropsOptional<OptionalButtonProps>;
export type InternalButtonProps = ComponentPropsRequired<RequiredButtonProps> & ComponentPropsOptional<OptionalButtonProps>;
