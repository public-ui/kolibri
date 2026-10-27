import type { Generic } from 'adopted-style-sheets';

import type { PropCollapsible, PropHasCompactButton, PropHasIconsWhenExpanded, PropHideLabel, PropLabel } from '../props';
import type { ButtonOrLinkOrTextWithChildrenProps, Stringified } from '../types';

type RequiredProps = {
	links: Stringified<ButtonOrLinkOrTextWithChildrenProps[]>;
} & PropLabel;
type OptionalProps = PropCollapsible & PropHasCompactButton & PropHasIconsWhenExpanded & PropHideLabel;

export type NavProps = Generic.Element.Members<RequiredProps, OptionalProps>;
