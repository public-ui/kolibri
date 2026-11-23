import type { ComponentPropsOptional, ComponentPropsRequired } from '../../internal/functional-components/generic-types';
import type { PropButtonCallbacks, PropHideLabel, PropHref, PropIcons, PropLabelLangSegments, PropLinkTarget } from '../props';
import type { StencilUnknown } from './unknown';

/**
 * This types specifies the props of a link or button in navigations.
 * We will support a mixin of link and button inside a navigation.
 * Not all possible props of a link or button are relevant and supported.
 */

type RequiredButtonProps = PropLabelLangSegments & PropButtonCallbacks<StencilUnknown>;
type RequiredLinkProps = PropHref;
type RequiredTextProps = PropLabelLangSegments;

type OptionalButtonOrLinkOrTextProps = PropHideLabel & {
	active: boolean; // TODO: realy needed?
	// tabIndex: number; // possible, but sensible ?! -> Ticket?
	// tooltipAlign: Alignment; // possible, but sensible ?! -> Ticket?
} & PropIcons &
	PropLinkTarget;
type OptionalButtonProps = OptionalButtonOrLinkOrTextProps & {
	disabled: boolean;
};

type OptionalButtonOrLinkOrTextWithChildrenProps = OptionalButtonOrLinkOrTextProps & {
	children: ButtonOrLinkOrTextWithChildrenProps[];
} & PropLabelLangSegments;
type OptionalButtonWithChildrenProps = OptionalButtonProps & {
	children: ButtonOrLinkOrTextWithChildrenProps[];
};
export type ButtonWithChildrenProps = ComponentPropsRequired<RequiredButtonProps> & ComponentPropsOptional<OptionalButtonWithChildrenProps>;
export type LinkWithChildrenProps = ComponentPropsRequired<RequiredLinkProps> & ComponentPropsOptional<OptionalButtonOrLinkOrTextWithChildrenProps>;
type TextWithChildrenProps = ComponentPropsRequired<RequiredTextProps> & ComponentPropsOptional<OptionalButtonOrLinkOrTextWithChildrenProps>;
export type ButtonOrLinkOrTextWithChildrenProps = ButtonWithChildrenProps | LinkWithChildrenProps | TextWithChildrenProps;
