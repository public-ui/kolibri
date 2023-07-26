import { Generic } from '@a11y-ui/core';

import { ButtonOrLinkOrTextWithChildrenProps } from '../../types/button-link-text';
import { Stringified } from '../../types/common';
import { Orientation } from '../../types/orientation';
import { AriaCurrent } from '../../types/props/aria-current';
import { PropAriaLabel } from '../../types/props/aria-label';
import { PropCollapsible } from '../../types/props/collapsible';
import { PropCompact } from '../../types/props/compact';
import { PropHasCompactButton } from '../../types/props/has-compact-button';
import { PropLabel } from '../../types/props/label';
import { KoliBriNavVariant } from './component';
import { PropHideLabel } from '../../types/props/hide-label';

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
	/**
	 * @deprecated Use hideLabel.
	 */
	PropCompact &
	PropHasCompactButton &
	PropLabel &
	PropHideLabel;
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
	PropLabel &
	PropHideLabel;
type OptionalStates = PropCompact;
export type KoliBriNavStates = Generic.Element.Members<RequiredStates, OptionalStates>;

export type KoliBriNavAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
