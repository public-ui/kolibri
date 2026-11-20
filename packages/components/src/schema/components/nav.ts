import type { Generic } from 'adopted-style-sheets';

import type { PropCollapsible, PropHasCompactButton, PropHasIconsWhenExpanded, PropHideLabel, PropLabel } from '../props';
import type { ButtonOrLinkOrTextWithChildrenProps, Stringified } from '../types';
import type { Members } from '../types/members';

type RequiredProps = {
	links: Stringified<ButtonOrLinkOrTextWithChildrenProps[]>;
} & PropLabel;
type OptionalProps = PropCollapsible & PropHasCompactButton & PropHasIconsWhenExpanded & PropHideLabel;

type RequiredStates = {
	links: ButtonOrLinkOrTextWithChildrenProps[];
	expandedChildren: ButtonOrLinkOrTextWithChildrenProps[][];
} & PropCollapsible &
	PropHasCompactButton &
	PropHasIconsWhenExpanded &
	PropHideLabel &
	PropLabel;
type OptionalStates = NonNullable<unknown>;

export type NavProps = Members<RequiredProps, OptionalProps>;
export type NavStates = Members<RequiredStates, OptionalStates>;
export type NavAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
