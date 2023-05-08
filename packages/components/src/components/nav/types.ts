import { Generic } from '@a11y-ui/core';
import { ButtonOrLinkOrTextWithChildrenProps, KoliBriNavVariant, Orientation, Stringified } from '../../components';
import { AriaCurrent, PropCollapsible, PropCompact, PropHasCompactButton } from '../../types/props';
import { PropPaging } from '../../types/props/paging';

type RequiredProps = {
	ariaLabel: string;
	links: Stringified<ButtonOrLinkOrTextWithChildrenProps[]>;
};
type OptionalProps = {
	ariaCurrentValue: AriaCurrent;
	orientation: Orientation;
	/**
	 * @deprecated
	 */
	variant: KoliBriNavVariant;
} & PropCollapsible &
	PropCompact &
	PropHasCompactButton &
	PropPaging;

type RequiredStates = {
	ariaCurrentValue: AriaCurrent;
	ariaLabel: string;
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
	PropHasCompactButton;
type OptionalStates = PropCompact & PropPaging;
export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
