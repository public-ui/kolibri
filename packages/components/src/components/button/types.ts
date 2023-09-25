import { Generic } from '@a11y-ui/core';

import { Stringified } from '../../types/common';
import { KoliBriAllIcon } from '../../types/icon';
import { AlignPropType } from '../../types/props/align';
import { PropAlternativeButtonLinkRole } from '../../types/props/alternative-button-link-role';
import { PropAriaControls } from '../../types/props/aria-controls';
import { PropAriaCurrent } from '../../types/props/aria-current';
import { PropAriaExpanded } from '../../types/props/aria-expanded';
import { PropAriaLabel } from '../../types/props/aria-label';
import { PropAriaSelected } from '../../types/props/aria-selected';
import { PropButtonCallbacks } from '../../types/props/button-callbacks';
import { PropButtonType } from '../../types/props/button-type';
import { PropButtonVariant } from '../../types/props/button-variant';
import { PropCustomClass } from '../../types/props/custom-class';
import { PropDisabled } from '../../types/props/disabled';
import { PropHideLabel } from '../../types/props/hide-label';
import { PropIcon } from '../../types/props/icon';
import { PropId } from '../../types/props/id';
import { PropLabelWithExpertSlot } from '../../types/props/label';
import { PropName } from '../../types/props/name';
import { PropSyncValueBySelector } from '../../types/props/sync-value-by-selector';
import { PropTooltipAlign } from '../../types/props/tooltip-align';
import { StencilUnknown } from '../../types/unknown';

export type RequiredButtonProps = PropLabelWithExpertSlot;
export type OptionalButtonProps = {
	tabIndex: number;
	value: Stringified<StencilUnknown>;
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
	PropButtonType &
	PropButtonVariant &
	PropCustomClass &
	PropDisabled &
	PropHideLabel &
	PropIcon &
	PropId &
	PropName &
	PropSyncValueBySelector &
	PropTooltipAlign;
export type ButtonProps = Generic.Element.Members<RequiredButtonProps, OptionalButtonProps>;

export type RequiredButtonStates = RequiredButtonProps &
	PropButtonType &
	PropButtonVariant & {
		icon: KoliBriAllIcon;
	};
export type OptionalButtonStates = Omit<RequiredButtonProps & OptionalButtonProps, keyof RequiredButtonStates>;

export type Props = Generic.Element.Members<RequiredButtonProps, OptionalButtonProps>;
export type States = Generic.Element.Members<RequiredButtonStates, OptionalButtonStates>;
export type API = Generic.Element.ComponentApi<RequiredButtonProps, OptionalButtonProps, RequiredButtonStates, OptionalButtonStates>;
