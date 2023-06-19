import { Generic } from '@a11y-ui/core';
import { ButtonOrLinkOrTextWithChildrenProps } from '../../components';

type RequiredProps = {
	links: ButtonOrLinkOrTextWithChildrenProps;
	compact: boolean;
};
type OptionalProps = { selected: boolean };

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
