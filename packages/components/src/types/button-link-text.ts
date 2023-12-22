import type { Generic } from 'adopted-style-sheets';

import { PropHideLabel } from './props/hide-label';
import { PropHref } from './props/href';
import { PropIcons } from './props/icons';
import { PropLabel } from './props/label';
import { StencilUnknown } from './unknown';
import { PropButtonCallbacks } from './props/button-callbacks';
import { PropLinkTarget } from './props/link-target';

/**
 * This types specifies the props of a link or button in navigations.
 * We will support a mixin of link and button inside a navigation.
 * Not all possible props of a link or button are relevant and supported.
 */

type RequiredButtonProps = PropLabel & PropButtonCallbacks<StencilUnknown>;
type RequiredLinkProps = PropHref;
type RequiredTextProps = PropLabel;

type OptionalButtonOrLinkOrTextProps = PropHideLabel & {
	active: boolean; // TODO: realy needed?
	// tabIndex: number; // possible, but sensible ?! -> Ticket?
	// tooltipAlign: Alignment; // possible, but sensible ?! -> Ticket?
} & PropIcons &
	PropLinkTarget;
type OptionalButtonProps = OptionalButtonOrLinkOrTextProps & {
	disabled: boolean;
};
// type ButtonProps = Generic.Element.Members<RequiredButtonProps, OptionalButtonProps>;
// type LinkProps = Generic.Element.Members<RequiredLinkProps, OptionalButtonOrLinkOrTextProps>;
// type TextProps = Generic.Element.Members<RequiredTextProps, OptionalButtonOrLinkOrTextProps>;
// type ButtonOrLinkOrTextProps = ButtonProps | LinkProps | TextProps;

type OptionalButtonOrLinkOrTextWithChildrenProps = OptionalButtonOrLinkOrTextProps & {
	children: ButtonOrLinkOrTextWithChildrenProps[];
} & PropLabel;
type OptionalButtonWithChildrenProps = OptionalButtonProps & {
	children: ButtonOrLinkOrTextWithChildrenProps[];
};
export type ButtonWithChildrenProps = Generic.Element.Members<RequiredButtonProps, OptionalButtonWithChildrenProps>;
export type LinkWithChildrenProps = Generic.Element.Members<RequiredLinkProps, OptionalButtonOrLinkOrTextWithChildrenProps>;
export type TextWithChildrenProps = Generic.Element.Members<RequiredTextProps, OptionalButtonOrLinkOrTextWithChildrenProps>;
export type ButtonOrLinkOrTextWithChildrenProps = ButtonWithChildrenProps | LinkWithChildrenProps | TextWithChildrenProps;
