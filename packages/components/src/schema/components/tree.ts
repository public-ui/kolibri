import type { Generic } from 'adopted-style-sheets';
import type { PropLabel } from '../props';

type RequiredProps = PropLabel;
type OptionalProps = unknown;

export type TreeProps = Generic.Element.Members<RequiredProps, OptionalProps>;
