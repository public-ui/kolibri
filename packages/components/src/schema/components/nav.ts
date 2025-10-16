import type { Generic } from 'adopted-style-sheets';

import type { PropCollapsible, PropHasCompactButton, PropHasIconsWhenExpanded, PropHideLabel, PropLabel } from '../props';
import type { PropOrientation } from '../props/orientation';
import type { ButtonOrLinkOrTextWithChildrenProps, Stringified } from '../types';

type RequiredProps = {
	links: Stringified<ButtonOrLinkOrTextWithChildrenProps[]>;
} & PropLabel;
type OptionalProps = PropCollapsible & PropHasCompactButton & PropHasIconsWhenExpanded & PropHideLabel & PropOrientation;

type RequiredStates = {
	links: ButtonOrLinkOrTextWithChildrenProps[];
	expandedChildren: ButtonOrLinkOrTextWithChildrenProps[][];
} & PropCollapsible &
	PropHasCompactButton &
	PropHasIconsWhenExpanded &
	PropHideLabel &
	PropLabel &
	PropOrientation;
type OptionalStates = NonNullable<unknown>;

export type NavProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type NavStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type NavAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
