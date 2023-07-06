import { Generic } from '@a11y-ui/core';

import { ButtonOrLinkOrTextWithChildrenProps } from '../../types/button-link-text';

type RequiredProps = {
	link: ButtonOrLinkOrTextWithChildrenProps;
};
type OptionalProps = {
	hasChildren: boolean;
	hideLabel: boolean;
	selected: boolean;
};

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
