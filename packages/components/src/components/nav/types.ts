import { Generic } from '@a11y-ui/core';
import { AriaCurrent, ButtonOrLinkOrTextWithChildrenProps, KoliBriNavVariant, Orientation, Stringified } from '../../components';
import { PropCollapsible, PropCompact, PropHasCompactButton } from '../../types/props';

type RequiredProps = {
	label: string;
	links: Stringified<ButtonOrLinkOrTextWithChildrenProps[]>;
};
type OptionalProps = {
	/**
	 * @deprecated
	 */
	ariaLabel: string;
	ariaCurrentValue: AriaCurrent;
	orientation: Orientation;
	/**
	 * @deprecated
	 */
	variant: KoliBriNavVariant;
} & PropCollapsible &
	PropCompact &
	PropHasCompactButton;
// type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	ariaCurrentValue: AriaCurrent;
	collapsible: boolean;
	/**
	 * @deprecated Version 2
	 */
	hasCompactButton: boolean;
	label: string;
	links: ButtonOrLinkOrTextWithChildrenProps[];
	orientation: Orientation;
	/**
	 * @deprecated
	 */
	variant: KoliBriNavVariant;
} & PropCollapsible &
	PropHasCompactButton;
type OptionalStates = PropCompact;
export type KoliBriNavStates = Generic.Element.Members<RequiredStates, OptionalStates>;

export type KoliBriNavAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
