import { TooltipAlignment } from '../components/tooltip/component';
import { Events } from '../enums/events';
import { Generic } from '@public-ui/core';
import { watchValidator } from '../utils/prop.validators';
import { EventCallback } from './callbacks';
import { Alignment, KoliBriCustomIcon, KoliBriIconProp } from './icon';
import { Stringified } from './common';

/**
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current#values
 */
export type AriaCurrent = boolean | 'page' | 'step' | 'location' | 'date' | 'time';

/**
 * https://twitter.com/housecor/status/1541037184622403584?t=HoUiOAZEcXFeuDl-VWAEZg
 * https://mui.com/material-ui/react-link/#accessibility
 * https://mui.com/material-ui/react-button/#text-button
 */
type RequiredButtonAndLinkProps = unknown;
type OptionalButtonAndLinkProps = {
	ariaControls: string;
	ariaCurrent: AriaCurrent;
	ariaExpanded: boolean;
	ariaLabel: string;
	// ariaSelected: boolean; DON'T DO - https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected
	disabled: boolean;
	icon: Stringified<KoliBriIconProp>;
	/**
	 * @deprecated
	 */
	iconAlign: Alignment;
	iconOnly: boolean;
	tabIndex: number;
	tooltipAlign: TooltipAlignment;
};

type RequiredButtonAndLinkStates = {
	ariaLabel: string;
	icon: {
		top?: KoliBriCustomIcon;
		right?: KoliBriCustomIcon;
		bottom?: KoliBriCustomIcon;
		left?: KoliBriCustomIcon;
	};
	/**
	 * @deprecated
	 */
	iconAlign: Alignment;
};
type OptionalButtonAndLinkStates = {
	ariaControls: string;
	ariaCurrent: AriaCurrent;
	ariaExpanded: boolean;
	disabled: boolean;
	iconOnly: boolean;
	tabIndex: number;
	tooltipAlign: TooltipAlignment;
};

/* Button */

export type KoliBriButtonType = 'button' | 'reset' | 'submit';
export type KoliBriButtonVariant = 'primary' | 'secondary' | 'normal' | 'danger' | 'ghost' | 'custom';

export type KoliBriButtonCallbacks = {
	[Events.onClick]?: EventCallback<PointerEvent>;
	[Events.onMouseDown]?: EventCallback<MouseEvent>;
};

export type KoliBriButtonVariantCustomClass = {
	customClass: string;
	variant: KoliBriButtonVariant;
};

/**
 * API ButtonLink
 */
export type RequiredButtonLinkProps = RequiredButtonAndLinkProps & {
	label: string;
};
export type OptionalButtonLinkProps = OptionalButtonAndLinkProps & {
	/**
	 * @deprecated Zweck?!
	 */
	accessKey: string;
	id: string;
	on: KoliBriButtonCallbacks;
	type: KoliBriButtonType;
};
// type ButtonLinkProps = Generic.Element.Members<RequiredButtonProps, OptionalButtonProps>;

export type RequiredButtonLinkStates = RequiredButtonAndLinkStates & {
	label: string;
	type: KoliBriButtonType;
};
export type OptionalButtonLinkStates = OptionalButtonAndLinkStates &
	KoliBriButtonVariantCustomClass & {
		/**
		 * @deprecated Zweck?!
		 */
		accessKey: string;
		id: string;
		on: KoliBriButtonCallbacks;
	};
// type ButtonLinkStates = Generic.Element.Members<RequiredButtonStates, OptionalButtonStates>;

/**
 * API Button
 */
export type RequiredButtonProps = RequiredButtonLinkProps;
export type OptionalButtonProps = OptionalButtonLinkProps & KoliBriButtonVariantCustomClass;
export type ButtonProps = Generic.Element.Members<RequiredButtonProps, OptionalButtonProps>;

export type RequiredButtonStates = RequiredButtonLinkStates;
export type OptionalButtonStates = OptionalButtonLinkStates & KoliBriButtonVariantCustomClass;
export type ButtonStates = Generic.Element.Members<RequiredButtonStates, OptionalButtonStates>;

/* LINK */

export type LinkOnCallbacks = {
	[Events.onClick]?: EventCallback<Event>;
};

// https://www.w3schools.com/tags/att_a_target.asp
export type LinkTarget = '_blank' | '_parent' | '_self' | '_top' | string;

export type LinkUseCase = 'text' | 'image' | 'nav';

/**
 * API Link
 */
export type RequiredLinkProps = RequiredButtonAndLinkProps;
export type OptionalLinkProps = OptionalButtonAndLinkProps & {
	ariaSelected: boolean;
	fill: boolean;
	href: string;
	/**
	 * @deprecated Verwende stattdessen einen Button _showAs=link.
	 */
	on: LinkOnCallbacks;
	part: string;
	selector: string;
	stealth: boolean;
	target: LinkTarget;
	targetDescription: string;
	underline: boolean;
	useCase: LinkUseCase;
};
export type LinkProps = Generic.Element.Members<RequiredLinkProps, OptionalLinkProps>;

export type RequiredLinkStates = RequiredButtonAndLinkStates;
export type OptionalLinkStates = OptionalButtonAndLinkStates & {
	ariaSelected: boolean;
	fill: boolean;
	href: string;
	/**
	 * @deprecated Verwende stattdessen einen Button _showAs=link.
	 */
	on: LinkOnCallbacks;
	part: string;
	selector: string;
	stealth: boolean;
	target: LinkTarget;
	targetDescription: string;
	underline: boolean;
	useCase: LinkUseCase;
};
export type LinkStates = Generic.Element.Members<RequiredLinkStates, OptionalLinkStates>;

/**
 * API LinkButton
 */
export type RequiredLinkButtonProps = RequiredLinkProps & {
	label: string;
};
export type OptionalLinkButtonProps = OptionalLinkProps & KoliBriButtonVariantCustomClass;
// type LinkButtonProps = Generic.Element.Members<RequiredLinkButtonProps, OptionalLinkButtonProps>;

export type RequiredLinkButtonStates = RequiredLinkStates & {
	label: string;
};
export type OptionalLinkButtonStates = OptionalLinkStates & KoliBriButtonVariantCustomClass;
export type LinkButtonStates = Generic.Element.Members<RequiredLinkButtonStates, OptionalLinkButtonStates>;

export const watchTooltipAlignment = (component: Generic.Element.Component, propName: string, value?: TooltipAlignment): void => {
	watchValidator(
		component,
		propName,
		(value) => value === 'top' || value === 'right' || value === 'bottom' || value === 'left',
		new Set(['TooltipAlignment {top, right, buttom, left}']),
		value,
		{
			defaultValue: 'top',
		}
	);
};
