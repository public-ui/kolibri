import { Generic } from '@a11y-ui/core';
import { PropLabel } from '../../types/props/label';

type RequiredProps = PropLabel;
type OptionalProps = NonNullable<unknown>;

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
