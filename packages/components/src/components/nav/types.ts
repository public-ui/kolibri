import { Generic } from 'adopted-style-sheets';

import { ButtonOrLinkOrTextWithChildrenProps } from '../../types/button-link-text';
import { Stringified } from '../../types/common';
import { Orientation } from '../../types/orientation';
import { PropCollapsible } from '../../types/props/collapsible';
import { PropHasCompactButton } from '../../types/props/has-compact-button';
import { PropHideLabel } from '../../types/props/hide-label';
import { PropLabel } from '../../types/props/label';

type RequiredProps = {
	links: Stringified<ButtonOrLinkOrTextWithChildrenProps[]>;
} & PropLabel;
type OptionalProps = {
	orientation: Orientation;
} & PropCollapsible &
	PropHasCompactButton &
	PropHideLabel;
// type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	links: ButtonOrLinkOrTextWithChildrenProps[];
	orientation: Orientation;
} & PropCollapsible &
	PropHasCompactButton &
	PropLabel &
	PropHideLabel;
type OptionalStates = NonNullable<unknown>;
export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
