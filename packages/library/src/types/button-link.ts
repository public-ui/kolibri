import { TooltipAlignment } from '../components/tooltip/component';
import { Events } from '../enums/events';
import { Generic } from '@public-ui/core';
import { watchValidator } from '../utils/prop.validators';
import { EventCallback } from './callbacks';
import { Alignment, KoliBriCustomIcon, KoliBriIconProp } from './icon';

export type AriaCurrent = boolean | 'page' | 'step' | 'location' | 'date' | 'time';

/**
 * https://twitter.com/housecor/status/1541037184622403584?t=HoUiOAZEcXFeuDl-VWAEZg
 */

export type KoliBriButtonLinkShowAs = 'button' | 'link';

type RequiredButtonLinkProps = unknown;
type OptionalButtonLinkProps = {
	ariaControls: string;
	ariaCurrent: AriaCurrent;
	ariaExpanded: boolean;
	ariaLabel: string;
	disabled: boolean;
	icon: KoliBriIconProp;
	/**
	 * @deprecated
	 */
	iconAlign: Alignment;
	iconOnly: boolean;
	showAs: KoliBriButtonLinkShowAs;
	tooltipAlign: TooltipAlignment;
};

type RequiredButtonLinkStates = {
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
	showAs: KoliBriButtonLinkShowAs;
};
type OptionalButtonLinkStates = {
	ariaControls: string;
	ariaCurrent: AriaCurrent;
	ariaExpanded: boolean;
	disabled: boolean;
	iconOnly: boolean;
	tooltipAlign: TooltipAlignment;
};

/* Button */

export type KoliBriButtonType = 'button' | 'reset' | 'submit';
export type KoliBriButtonVariant = 'primary' | 'secondary' | 'normal' | 'danger' | 'ghost';

export type KoliBriButtonCallbacks = {
	[Events.onClick]?: EventCallback<PointerEvent>;
};

export type KoliBriButtonVariantCustomClass = {
	customClass: string;
	variant: KoliBriButtonVariant;
};

/**
 * API
 */
export type RequiredButtonProps = RequiredButtonLinkProps & {
	label: string;
};
export type OptionalButtonProps = OptionalButtonLinkProps &
	KoliBriButtonVariantCustomClass & {
		/**
		 * @deprecated Zweck?!
		 */
		accessKey: string;
		id: string;
		on: KoliBriButtonCallbacks;
		type: KoliBriButtonType;
	};
export type ButtonProps = Generic.Element.Members<RequiredButtonProps, OptionalButtonProps>;

export type RequiredButtonStates = RequiredButtonLinkStates & {
	label: string;
	type: KoliBriButtonType;
};
export type OptionalButtonStates = OptionalButtonLinkStates &
	KoliBriButtonVariantCustomClass & {
		/**
		 * @deprecated Zweck?!
		 */
		accessKey: string;
		id: string;
		on: KoliBriButtonCallbacks;
	};
export type ButtonStates = Generic.Element.Members<RequiredButtonStates, OptionalButtonStates>;

/* LINK */

export type LinkOnCallbacks = {
	[Events.onClick]?: EventCallback<Event>;
};

// https://www.w3schools.com/tags/att_a_target.asp
export type LinkTarget = '_blank' | '_parent' | '_self' | '_top' | string;

export type LinkUseCase = 'text' | 'image' | 'nav';

/**
 * API
 */
export type RequiredLinkProps = RequiredButtonLinkProps & unknown;
export type OptionalLinkProps = OptionalButtonLinkProps & {
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

export type RequiredLinkStates = RequiredButtonLinkStates & unknown;
export type OptionalLinkStates = OptionalButtonLinkStates & {
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

export const watchShowAs = (component: Generic.Element.Component, value?: KoliBriButtonLinkShowAs): void => {
	watchValidator(component, '_showAs', (value) => value === 'button' || value === 'link', new Set(['String {button, link}']), value);
};

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
