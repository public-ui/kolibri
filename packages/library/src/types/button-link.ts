import { TooltipAlignment } from '../components/tooltip/component';
import { Events } from '../enums/events';
import { Generic } from '@public-ui/core';
import { watchValidator } from '../utils/prop.validators';
import { EventCallback, EventValueCallback } from './callbacks';
import { Alignment, KoliBriCustomIcon, KoliBriIconProp } from './icon';
import { Stringified } from './common';

/**
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current#values
 */
export type AriaCurrent = boolean | 'page' | 'step' | 'location' | 'date' | 'time';
export type AlternativButtonLinkRole = 'tab';

/**
 * https://twitter.com/housecor/status/1541037184622403584?t=HoUiOAZEcXFeuDl-VWAEZg
 * https://mui.com/material-ui/react-link/#accessibility
 * https://mui.com/material-ui/react-button/#text-button
 */
type RequiredButtonAndLinkProps = {
	label: string;
};
type OptionalButtonAndLinkProps = {
	ariaControls: string;
	ariaCurrent: AriaCurrent;
	ariaExpanded: boolean;
	ariaLabel: string;
	ariaSelected: boolean;
	disabled: boolean; // TODO: Link disabled?!
	icon: Stringified<KoliBriIconProp>;
	/**
	 * @deprecated
	 */
	iconAlign: Alignment;
	iconOnly: boolean;
	role: AlternativButtonLinkRole;
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
	label: string;
};
type OptionalButtonAndLinkStates = {
	ariaControls: string;
	ariaCurrent: AriaCurrent;
	ariaExpanded: boolean;
	ariaSelected: boolean;
	disabled: boolean;
	iconOnly: boolean;
	role: AlternativButtonLinkRole;
	tabIndex: number;
	tooltipAlign: TooltipAlignment;
};

/* Button */

export type KoliBriButtonType = 'button' | 'reset' | 'submit';
export type KoliBriButtonVariant = 'primary' | 'secondary' | 'normal' | 'danger' | 'ghost' | 'custom';

export type KoliBriButtonCallbacks<T> = {
	[Events.onClick]?: EventValueCallback<MouseEvent, T>;
	[Events.onMouseDown]?: EventCallback<MouseEvent>;
};

export type KoliBriButtonVariantCustomClass = {
	customClass: string;
	variant: KoliBriButtonVariant;
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
	id: string;
	on: KoliBriButtonCallbacks<unknown>;
	type: KoliBriButtonType;
	value: Stringified<unknown>;
};
// type ButtonLinkProps = Generic.Element.Members<RequiredButtonProps, OptionalButtonProps>;

type RequiredButtonLinkStates = RequiredButtonAndLinkStates & {
	type: KoliBriButtonType;
};
type OptionalButtonLinkStates = OptionalButtonAndLinkStates &
	KoliBriButtonVariantCustomClass & {
		/**
		 * @deprecated Zweck?!
		 */
		accessKey: string;
		id: string;
		on: KoliBriButtonCallbacks<unknown>;
		value: unknown;
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
	[Events.onClick]?: EventValueCallback<Event, string>;
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
	 * @deprecated Das Styling sollte stets über CSS erfolgen.
	 */
	fill: boolean;
	on: LinkOnCallbacks;
	/**
	 * @deprecated Das Styling sollte stets über CSS erfolgen.
	 */
	part: string;
	/**
	 * @deprecated Das Styling sollte stets über CSS erfolgen.
	 */
	selector: string;
	/**
	 * @deprecated Das Styling sollte stets über CSS erfolgen.
	 */
	stealth: boolean;
	target: LinkTarget;
	targetDescription: string;
	/**
	 * @deprecated Das Styling sollte stets über CSS erfolgen.
	 */
	underline: boolean;
	/**
	 * @deprecated Das Styling sollte stets über CSS erfolgen.
	 */
	useCase: LinkUseCase;
};
export type LinkProps = Generic.Element.Members<RequiredLinkProps, OptionalLinkProps>;

export type RequiredLinkStates = RequiredButtonAndLinkStates & {
	href: string;
};
export type OptionalLinkStates = OptionalButtonAndLinkStates & {
	ariaSelected: boolean;
	/**
	 * @deprecated Das Styling sollte stets über CSS erfolgen.
	 */
	fill: boolean;
	on: LinkOnCallbacks;
	/**
	 * @deprecated Das Styling sollte stets über CSS erfolgen.
	 */
	part: string;
	/**
	 * @deprecated Das Styling sollte stets über CSS erfolgen.
	 */
	selector: string;
	/**
	 * @deprecated Das Styling sollte stets über CSS erfolgen.
	 */
	stealth: boolean;
	target: LinkTarget;
	targetDescription: string;
	/**
	 * @deprecated Das Styling sollte stets über CSS erfolgen.
	 */
	underline: boolean;
	/**
	 * @deprecated Das Styling sollte stets über CSS erfolgen.
	 */
	useCase: LinkUseCase;
};
export type LinkStates = Generic.Element.Members<RequiredLinkStates, OptionalLinkStates>;

/**
 * API LinkButton
 */
export type RequiredLinkButtonProps = RequiredLinkProps;
export type OptionalLinkButtonProps = OptionalLinkProps & KoliBriButtonVariantCustomClass;
// type LinkButtonProps = Generic.Element.Members<RequiredLinkButtonProps, OptionalLinkButtonProps>;

export type RequiredLinkButtonStates = unknown;
export type OptionalLinkButtonStates = KoliBriButtonVariantCustomClass;
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
