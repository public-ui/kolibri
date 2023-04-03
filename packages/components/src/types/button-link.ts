import { Generic } from '@a11y-ui/core';
import { Events } from '../enums/events';
import { watchValidator } from '../utils/prop.validators';
import { EventCallback, EventValueOrEventCallback } from './callbacks';
import { Stringified } from './common';
import { KoliBriAllIcon, KoliBriIconProp } from './icon';
import { PropAlignment, PropAriaCurrent, PropAriaExpanded, PropAriaSelected, PropDisabled, PropStealth } from './props';
import { PropLabel } from './props/label';

export type AlternativButtonLinkRole = 'button' | 'link' | 'tab';

/**
 * https://twitter.com/housecor/status/1541037184622403584?t=HoUiOAZEcXFeuDl-VWAEZg
 * https://mui.com/material-ui/react-link/#accessibility
 * https://mui.com/material-ui/react-button/#text-button
 */
type RequiredButtonAndLinkProps = PropLabel;
type OptionalButtonAndLinkProps = {
	ariaControls: string;
	ariaLabel: string;
	icon: Stringified<KoliBriIconProp>;
	/**
	 * @deprecated
	 */
	iconAlign: PropAlignment;
	iconOnly: boolean;
	role: AlternativButtonLinkRole;
	tabIndex: number;
	tooltipAlign: PropAlignment;
} & PropAriaCurrent &
	PropAriaExpanded &
	PropAriaSelected &
	PropDisabled;

type RequiredButtonAndLinkStates = {
	icon: KoliBriAllIcon;
	label: string;
};
type OptionalButtonAndLinkStates = {
	ariaLabel: string;
	ariaControls: string;
	/**
	 * @deprecated
	 */
	iconAlign: PropAlignment;
	iconOnly: boolean;
	role: AlternativButtonLinkRole;
	tabIndex: number;
	tooltipAlign: PropAlignment;
} & PropAriaCurrent &
	PropAriaExpanded &
	PropAriaSelected &
	PropDisabled;

/**
 * Button
 */
export type KoliBriButtonType = 'button' | 'reset' | 'submit';
export type KoliBriButtonVariant = 'primary' | 'secondary' | 'normal' | 'danger' | 'ghost' | 'custom';

export type KoliBriButtonCallbacks<T> = {
	[Events.onClick]?: EventValueOrEventCallback<MouseEvent, T>;
	[Events.onMouseDown]?: EventCallback<MouseEvent>;
};

export type KoliBriButtonVariantPropState = {
	variant: KoliBriButtonVariant;
};
export type KoliBriButtonCustomClassPropState = {
	customClass: string;
};

/**
 * API ButtonLink
 */
export type RequiredButtonLinkProps = RequiredButtonAndLinkProps;
export type OptionalButtonLinkProps = OptionalButtonAndLinkProps & {
	/**
	 * @deprecated Zweck?!
	 */
	accessKey: string;
	disabled: boolean;
	id: string;
	on: KoliBriButtonCallbacks<unknown>;
	type: KoliBriButtonType;
	value: Stringified<unknown>;
};
// type ButtonLinkProps = Generic.Element.Members<RequiredButtonProps, OptionalButtonProps>;

type RequiredButtonLinkStates = RequiredButtonAndLinkStates &
	KoliBriButtonVariantPropState & {
		type: KoliBriButtonType;
	};
type OptionalButtonLinkStates = OptionalButtonAndLinkStates &
	KoliBriButtonCustomClassPropState & {
		/**
		 * @deprecated Zweck?!
		 */
		accessKey: string;
		disabled: boolean;
		id: string;
		on: KoliBriButtonCallbacks<unknown>;
		value: unknown;
	};
// type ButtonLinkStates = Generic.Element.Members<RequiredButtonStates, OptionalButtonStates>;

/**
 * API Button
 */
export type RequiredButtonProps = RequiredButtonLinkProps;
export type OptionalButtonProps = OptionalButtonLinkProps & KoliBriButtonVariantPropState & KoliBriButtonCustomClassPropState;
export type ButtonProps = Generic.Element.Members<RequiredButtonProps, OptionalButtonProps>;

export type RequiredButtonStates = RequiredButtonLinkStates & KoliBriButtonVariantPropState;
export type OptionalButtonStates = OptionalButtonLinkStates & KoliBriButtonCustomClassPropState;
export type ButtonStates = Generic.Element.Members<RequiredButtonStates, OptionalButtonStates>;

/* LINK */

/**
 * @deprecated Link should not use the on-click event. Use a button instead.
 */
export type LinkOnCallbacks = {
	[Events.onClick]?: EventValueOrEventCallback<Event, string>;
};

// https://www.w3schools.com/tags/att_a_target.asp
export type LinkTarget = '_blank' | '_parent' | '_self' | '_top' | string;

export type LinkUseCase = 'text' | 'image' | 'nav';

/**
 * API Link
 */
export type RequiredLinkProps = RequiredButtonAndLinkProps & {
	href: string;
};
export type OptionalLinkProps = OptionalButtonAndLinkProps & {
	/**
	 * @deprecated A link could never be disabled. Use a button instead.
	 */
	disabled: boolean;
	/**
	 * @deprecated We use the on-click event only on buttons styled as link.
	 */
	on: LinkOnCallbacks;
	/**
	 * @deprecated Das Styling sollte stets über CSS erfolgen.
	 */
	selector: string;
	/**
	 * @deprecated Das Styling sollte stets über CSS erfolgen.
	 */
	target: LinkTarget;
	targetDescription: string;
	/**
	 * @deprecated Das Styling sollte stets über CSS erfolgen.
	 */
	useCase: LinkUseCase;
} & PropStealth;
export type LinkProps = Generic.Element.Members<RequiredLinkProps, OptionalLinkProps>;

export type RequiredLinkStates = RequiredButtonAndLinkStates & {
	href: string;
};
export type OptionalLinkStates = OptionalButtonAndLinkStates & {
	ariaSelected: boolean;
	/**
	 * @deprecated We use the on-click event only on buttons styled as link.
	 */
	on: LinkOnCallbacks;
	/**
	 * @deprecated Das Styling sollte stets über CSS erfolgen.
	 */
	selector: string;
	/**
	 * @deprecated Das Styling sollte stets über CSS erfolgen.
	 */
	target: LinkTarget;
	targetDescription: string;
	/**
	 * @deprecated Das Styling sollte stets über CSS erfolgen.
	 */
	useCase: LinkUseCase;
} & PropAriaSelected &
	PropStealth;
export type LinkStates = Generic.Element.Members<RequiredLinkStates, OptionalLinkStates>;

/**
 * API LinkButton
 */
export type RequiredLinkButtonProps = RequiredLinkProps;
export type OptionalLinkButtonProps = OptionalLinkProps & KoliBriButtonVariantPropState & KoliBriButtonCustomClassPropState;
// type LinkButtonProps = Generic.Element.Members<RequiredLinkButtonProps, OptionalLinkButtonProps>;

// type RequiredLinkButtonStates = KoliBriButtonVariantPropState;
// type OptionalLinkButtonStates = KoliBriButtonCustomClassPropState;
// type LinkButtonStates = Generic.Element.Members<RequiredLinkButtonStates, OptionalLinkButtonStates>;

export const watchTooltipAlignment = (component: Generic.Element.Component, propName: string, value?: PropAlignment): void => {
	watchValidator(
		component,
		propName,
		(value) => value === 'top' || value === 'right' || value === 'bottom' || value === 'left',
		new Set(['Alignment {top, right, buttom, left}']),
		value,
		{
			defaultValue: 'top',
		}
	);
};
