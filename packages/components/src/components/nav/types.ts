import { Generic } from '@a11y-ui/core';

import { ButtonOrLinkOrTextWithChildrenProps } from '../../types/button-link-text';
import { Stringified } from '../../types/common';
import { Orientation } from '../../types/orientation';
import { AriaCurrentPropType } from '../../types/props/aria-current';
import { PropCollapsible } from '../../types/props/collapsible';
import { PropHideLabel } from '../../types/props/hide-label';
import { PropLabel } from '../../types/props/label';

type RequiredProps = {
	links: Stringified<ButtonOrLinkOrTextWithChildrenProps[]>;
} & PropLabel;
type OptionalProps = {
	ariaCurrentValue: AriaCurrentPropType;
	orientation: Orientation;
} & PropCollapsible &
	PropHideLabel;
// type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	ariaCurrentValue: AriaCurrentPropType;
	links: ButtonOrLinkOrTextWithChildrenProps[];
	orientation: Orientation;
} & PropCollapsible &
	PropLabel &
	PropHideLabel;
type OptionalStates = NonNullable<unknown>;
export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
