import { Generic } from '@a11y-ui/core';
import { AriaCurrent, ButtonOrLinkOrTextWithChildrenProps, KoliBriNavVariant, Orientation, Stringified } from '../../components';
import { PropCollapsible, PropCompact, PropHasCompactButton, PropLabel } from '../../types/props';
import { PropAriaLabel } from '../../types/props';

type RequiredProps = {
	links: Stringified<ButtonOrLinkOrTextWithChildrenProps[]>;
};
type OptionalProps = {
	ariaCurrentValue: AriaCurrent;
	orientation: Orientation;
	/**
	 * @deprecated
	 */
	variant: KoliBriNavVariant;
} & PropAriaLabel &
	PropCollapsible &
	PropCompact &
	PropHasCompactButton &
	PropLabel;
// type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	ariaCurrentValue: AriaCurrent;
	collapsible: boolean;
	/**
	 * @deprecated Version 2
	 */
	hasCompactButton: boolean;
	links: ButtonOrLinkOrTextWithChildrenProps[];
	orientation: Orientation;
	/**
	 * @deprecated
	 */
	variant: KoliBriNavVariant;
} & PropCollapsible &
	PropHasCompactButton &
	PropLabel;
type OptionalStates = PropCompact;
export type KoliBriNavStates = Generic.Element.Members<RequiredStates, OptionalStates>;

export type KoliBriNavAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
