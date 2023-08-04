import { Generic } from '@a11y-ui/core';
import { PropLabelWithExpertSlot } from '../../types/props/label';
import { PropAriaControls } from '../../types/props/aria-controls';
import { PropAriaExpanded } from '../../types/props/aria-expanded';
import { PropAriaSelected } from '../../types/props/aria-selected';
import { PropDisabled } from '../../types/props/disabled';
import { KoliBriAllIcon, KoliBriIconProp } from '../../types/icon'; //FIXME
import { StencilUnknown } from '../../types/unknown';
import { PropId } from '../../types/props/id';
import { PropName } from '../../types/props/name';
import { AlignPropType } from '../../types/props/align';
import { PropAriaCurrent } from '../../types/props/aria-current';
import { PropHideLabel } from '../../types/props/hide-label';
import { Stringified } from '../../types/common';
import { AlternativButtonLinkRole, KoliBriButtonCallbacks, KoliBriButtonType, KoliBriButtonVariant } from '../../types/button-link';
import { PropAriaLabel } from '../../types/props/aria-label';
import { PropCustomClass } from '../../types/props/custom-class';

export type RequiredButtonProps = PropLabelWithExpertSlot;
export type OptionalButtonProps = {
	icon: Stringified<KoliBriIconProp>;
	on: KoliBriButtonCallbacks<StencilUnknown>;
	role: AlternativButtonLinkRole;
	syncValueBySelector: string;
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
} & PropAriaControls &
	PropAriaCurrent &
	PropAriaExpanded &
	PropAriaLabel &
	PropAriaSelected &
	PropCustomClass &
	PropDisabled &
	PropHideLabel &
	PropId &
	PropName;
export type ButtonProps = Generic.Element.Members<RequiredButtonProps, OptionalButtonProps>;

export type RequiredButtonStates = PropLabelWithExpertSlot & {
	variant: KoliBriButtonVariant;
	type: KoliBriButtonType;
	icon: KoliBriAllIcon;
};
export type OptionalButtonStates = {
	on: KoliBriButtonCallbacks<StencilUnknown>;
	role: AlternativButtonLinkRole;
	syncValueBySelector: string;
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
} & PropAriaCurrent &
	PropAriaExpanded &
	PropAriaSelected &
	PropCustomClass &
	PropDisabled &
	PropHideLabel &
	PropId &
	PropName;

export type Props = Generic.Element.Members<RequiredButtonProps, OptionalButtonProps>;
export type States = Generic.Element.Members<RequiredButtonStates, OptionalButtonStates>;
export type API = Generic.Element.ComponentApi<RequiredButtonProps, OptionalButtonProps, RequiredButtonStates, OptionalButtonStates>;
