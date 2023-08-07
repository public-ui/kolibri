import { Generic } from '@a11y-ui/core';
import { PropLabelWithExpertSlot } from '../../types/props/label';
import { PropAriaControls } from '../../types/props/aria-controls';
import { PropAriaExpanded } from '../../types/props/aria-expanded';
import { PropAriaSelected } from '../../types/props/aria-selected';
import { PropDisabled } from '../../types/props/disabled';
import { KoliBriAllIcon } from '../../types/icon';
import { StencilUnknown } from '../../types/unknown';
import { PropId } from '../../types/props/id';
import { PropName } from '../../types/props/name';
import { AlignPropType } from '../../types/props/align';
import { PropAriaCurrent } from '../../types/props/aria-current';
import { PropHideLabel } from '../../types/props/hide-label';
import { Stringified } from '../../types/common';
import { KoliBriButtonType, KoliBriButtonVariant } from '../../types/button-link';
import { PropAriaLabel } from '../../types/props/aria-label';
import { PropCustomClass } from '../../types/props/custom-class';
import { PropIcon } from '../../types/props/icon';
import { PropButtonCallbacks } from '../../types/props/button-callbacks';
import { PropAlternativeButtonLinkRole } from '../../types/props/alternative-button-link-role';
import { SyncValueBySelectorPropType } from '../../types/props/sync-value-by-selector';

export type RequiredButtonProps = PropLabelWithExpertSlot;
export type OptionalButtonProps = {
	syncValueBySelector: SyncValueBySelectorPropType;
	tabIndex: number;
	tooltipAlign: AlignPropType;
	type: KoliBriButtonType;
	value: Stringified<StencilUnknown>;
	variant: KoliBriButtonVariant;
	/**
	 * @deprecated Zweck?!
	 */
	accessKey: string;
	/**
	 * @deprecated
	 */
	iconAlign: AlignPropType;
	/**
	 * @deprecated
	 */
	iconOnly: boolean;
} & PropAlternativeButtonLinkRole &
	PropAriaControls &
	PropAriaCurrent &
	PropAriaExpanded &
	PropAriaLabel &
	PropAriaSelected &
	PropButtonCallbacks<StencilUnknown> &
	PropCustomClass &
	PropDisabled &
	PropHideLabel &
	PropIcon &
	PropId &
	PropName;
export type ButtonProps = Generic.Element.Members<RequiredButtonProps, OptionalButtonProps>;

export type RequiredButtonStates = PropLabelWithExpertSlot & {
	variant: KoliBriButtonVariant;
	type: KoliBriButtonType;
	icon: KoliBriAllIcon;
};
export type OptionalButtonStates = {
	syncValueBySelector: SyncValueBySelectorPropType;
	tabIndex: number;
	tooltipAlign: AlignPropType;
	value: StencilUnknown;
	/**
	 * @deprecated Zweck?!
	 */
	accessKey: string;
	/**
	 * @deprecated Will be removed for all link components.
	 */
	ariaControls: string;
	/**
	 * @deprecated
	 */
	iconAlign: AlignPropType;
	/**
	 * @deprecated
	 */
	iconOnly: boolean;
} & PropAlternativeButtonLinkRole &
	PropAriaCurrent &
	PropAriaExpanded &
	PropAriaSelected &
	PropButtonCallbacks<StencilUnknown> &
	PropCustomClass &
	PropDisabled &
	PropHideLabel &
	PropId &
	PropName;

export type Props = Generic.Element.Members<RequiredButtonProps, OptionalButtonProps>;
export type States = Generic.Element.Members<RequiredButtonStates, OptionalButtonStates>;
export type API = Generic.Element.ComponentApi<RequiredButtonProps, OptionalButtonProps, RequiredButtonStates, OptionalButtonStates>;
