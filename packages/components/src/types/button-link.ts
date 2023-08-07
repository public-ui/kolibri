import { Generic } from '@a11y-ui/core';

import { Events } from '../enums/events';
import { EventValueOrEventCallback } from './callbacks';
import { Stringified } from './common';
import { KoliBriAllIcon, KoliBriIconProp } from './icon';
import { AlignPropType } from './props/align';
import { PropAriaControls } from './props/aria-controls';
import { PropAriaCurrent, PropListenAriaCurrent } from './props/aria-current';
import { AriaExpandedPropType, PropAriaExpanded } from './props/aria-expanded';
import { PropAriaLabel } from './props/aria-label';
import { PropAriaSelected } from './props/aria-selected';
import { PropDisabled } from './props/disabled';
import { PropDownload } from './props/download';
import { PropHideLabel } from './props/hide-label';
import { PropHref } from './props/href';
import { PropId } from './props/id';
import { PropLabelWithExpertSlot } from './props/label';
import { PropName } from './props/name';
import { PropStealth } from './props/stealth';
import { StencilUnknown } from './unknown';
import { PropButtonCallbacks } from './props/button-callbacks';
import { PropAlternativeButtonLinkRole } from './props/alternative-button-link-role';
import { PropTooltipAlign } from './props/tooltip-align';
import { PropButtonType } from './props/button-type';
import { PropButtonVariant } from './props/button-variant';
import { PropCustomClass } from './props/custom-class';
import { PropLinkTarget } from './props/link-target';

/**
 * https://twitter.com/housecor/status/1541037184622403584?t=HoUiOAZEcXFeuDl-VWAEZg
 * https://mui.com/material-ui/react-link/#accessibility
 * https://mui.com/material-ui/react-button/#text-button
 */
type OptionalButtonAndLinkProps = {
	/**
	 * @deprecated Will be removed for all link components.
	 */
	ariaControls: string;
	/**
	 * @deprecated Will be removed for all link components.
	 */
	ariaExpanded: AriaExpandedPropType;
	/**
	 * @deprecated Will be removed for all link components.
	 */
	ariaSelected: boolean;
	/**
	 * @deprecated Will be removed for all link components.
	 */
	disabled: boolean;
	icon: Stringified<KoliBriIconProp>;
	/**
	 * @deprecated
	 */
	iconAlign: AlignPropType;
	/**
	 * @deprecated
	 */
	iconOnly: boolean;
	tabIndex: number;
} & PropAriaCurrent &
	PropAriaLabel &
	PropHideLabel &
	PropAlternativeButtonLinkRole &
	PropTooltipAlign;

type RequiredButtonAndLinkStates = {
	icon: KoliBriAllIcon;
};
type OptionalButtonAndLinkStates = {
	/**
	 * @deprecated Will be removed for all link components.
	 */
	ariaControls: string;
	/**
	 * @deprecated Will be removed for all link components.
	 */
	ariaExpanded: AriaExpandedPropType;
	/**
	 * @deprecated Will be removed for all link components.
	 */
	ariaSelected: boolean;
	/**
	 * @deprecated Will be removed for all link components.
	 */
	disabled: boolean;
	/**
	 * @deprecated
	 */
	iconAlign: AlignPropType;
	/**
	 * @deprecated
	 */
	iconOnly: boolean;
	tabIndex: number;
	tooltipAlign: AlignPropType;
} & PropAlternativeButtonLinkRole &
	PropAriaCurrent &
	PropHideLabel;

/**
 * API ButtonLink
 */
export type RequiredButtonLinkProps = unknown;
export type OptionalButtonLinkProps = OptionalButtonAndLinkProps & {
	/**
	 * @deprecated Zweck?!
	 */
	accessKey: string;
	syncValueBySelector: string;
	value: Stringified<StencilUnknown>;
} & PropDisabled &
	PropId &
	PropLabelWithExpertSlot &
	PropName &
	PropButtonType &
	PropButtonCallbacks<StencilUnknown>;
export type ButtonLinkProps = Generic.Element.Members<RequiredButtonProps, OptionalButtonProps>;

type RequiredButtonLinkStates = RequiredButtonAndLinkStates & PropLabelWithExpertSlot & PropButtonVariant & PropButtonType;
type OptionalButtonLinkStates = {
	/**
	 * @deprecated Zweck?!
	 */
	accessKey: string;
	syncValueBySelector: string;
	value: StencilUnknown;
} & PropCustomClass &
	OptionalButtonAndLinkStates &
	PropButtonCallbacks<StencilUnknown> &
	PropDisabled &
	PropId &
	PropName;
export type ButtonLinkStates = Generic.Element.Members<RequiredButtonStates, OptionalButtonStates>;

/**
 * API Button
 */
export type RequiredButtonProps = RequiredButtonLinkProps & PropLabelWithExpertSlot;
export type OptionalButtonProps = OptionalButtonLinkProps &
	PropAriaControls &
	PropAriaExpanded &
	PropAriaSelected &
	PropDisabled &
	PropButtonVariant &
	PropCustomClass;

export type RequiredButtonStates = RequiredButtonLinkStates & PropButtonVariant & PropLabelWithExpertSlot;
export type OptionalButtonStates = OptionalButtonLinkStates & PropAriaControls & PropAriaExpanded & PropAriaSelected & PropDisabled & PropCustomClass;

/* LINK */

/**
 * @deprecated Link should not use the on-click event. Use a button instead.
 */
export type LinkOnCallbacks = {
	[Events.onClick]?: EventValueOrEventCallback<Event, string>;
};

/**
 * @deprecated Will be removed in next major release.
 */
export type LinkUseCase = 'text' | 'image' | 'nav';

/**
 * API Link
 */
type RequiredLinkProps = PropHref;
type OptionalLinkProps = OptionalButtonAndLinkProps & {
	/**
	 * @deprecated We use the on-click event only on buttons styled as link.
	 */
	on: LinkOnCallbacks;
	/**
	 * @deprecated Das Styling sollte stets über CSS erfolgen.
	 */
	selector: string;
	targetDescription: string;
	/**
	 * @deprecated Das Styling sollte stets über CSS erfolgen.
	 */
	useCase: LinkUseCase;
} & PropDownload &
	PropLabelWithExpertSlot &
	PropListenAriaCurrent &
	PropStealth &
	PropLinkTarget;
export type LinkProps = Generic.Element.Members<RequiredLinkProps, OptionalLinkProps>;

type RequiredLinkStates = RequiredButtonAndLinkStates & PropHref & PropLabelWithExpertSlot;
type OptionalLinkStates = OptionalButtonAndLinkStates & {
	/**
	 * @deprecated We use the on-click event only on buttons styled as link.
	 */
	on: LinkOnCallbacks;
	/**
	 * @deprecated Das Styling sollte stets über CSS erfolgen.
	 */
	selector: string;
	targetDescription: string;
	/**
	 * @deprecated Das Styling sollte stets über CSS erfolgen.
	 */
	useCase: LinkUseCase;
} & PropDownload &
	PropListenAriaCurrent &
	PropStealth &
	PropLinkTarget;
export type LinkStates = Generic.Element.Members<RequiredLinkStates, OptionalLinkStates>;
export type KoliBriLinkAPI = Generic.Element.ComponentApi<RequiredLinkProps, OptionalLinkProps, RequiredLinkStates, OptionalLinkStates>;

/**
 * API LinkButton
 */
// type RequiredLinkButtonProps = RequiredLinkProps;
// type OptionalLinkButtonProps = OptionalLinkProps & KoliBriButtonVariantPropState & KoliBriButtonCustomClassPropState;
// type LinkButtonProps = Generic.Element.Members<RequiredLinkButtonProps, OptionalLinkButtonProps>;

// type RequiredLinkButtonStates = KoliBriButtonVariantPropState;
// type OptionalLinkButtonStates = KoliBriButtonCustomClassPropState;
// type LinkButtonStates = Generic.Element.Members<RequiredLinkButtonStates, OptionalLinkButtonStates>;
