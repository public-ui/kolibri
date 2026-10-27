import type { Generic } from 'adopted-style-sheets';
import type { PropActive, PropHref, PropLabel, PropOpen } from '../props';

type RequiredProps = PropLabel & PropHref;
type OptionalProps = PropOpen & PropActive;

export type TreeItemProps = Generic.Element.Members<RequiredProps, OptionalProps>;
