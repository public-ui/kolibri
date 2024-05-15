import type { Generic } from 'adopted-style-sheets';

import { ButtonOrLinkOrTextWithChildrenProps } from '../../types/button-link-text';
import { Stringified } from '../../types/common';
import { Orientation } from '../../types/orientation';
import { AriaCurrentPropType } from '../../types/props/aria-current';
import { PropAriaLabel } from '../../types/props/aria-label';
import { PropCollapsible } from '../../types/props/collapsible';
import { PropCompact } from '../../types/props/compact';
import { HasCompactButtonPropType, PropHasCompactButton } from '../../types/props/has-compact-button';
import { PropHideLabel } from '../../types/props/hide-label';
import { PropLabel } from '../../types/props/label';
import { KoliBriNavVariant } from './shadow';

type RequiredProps = {
	links: Stringified<ButtonOrLinkOrTextWithChildrenProps[]>;
};
type OptionalProps = {
	ariaCurrentValue: AriaCurrentPropType;
	orientation: Orientation;
	/**
	 * @deprecated
	 */
	variant: KoliBriNavVariant;
} & PropAriaLabel &
	PropCollapsible &
	/**
	 * @deprecated Use hideLabel.
	 */
	PropCompact &
	PropHasCompactButton &
	PropLabel &
	PropHideLabel;
// type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	ariaCurrentValue: AriaCurrentPropType;
	/**
	 * @deprecated Version 2
	 */
	hasCompactButton: HasCompactButtonPropType;
	links: ButtonOrLinkOrTextWithChildrenProps[];
	orientation: Orientation;
	/**
	 * @deprecated
	 */
	variant: KoliBriNavVariant;
} & PropCollapsible &
	PropHasCompactButton &
	PropLabel &
	PropHideLabel;
type OptionalStates = PropCompact;
export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
