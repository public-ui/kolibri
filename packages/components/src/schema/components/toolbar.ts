import type { Generic } from 'adopted-style-sheets';
import type { PropLabel, PropToolbarItems } from '../props';
import type { PropOrientation } from '../props/orientation';

type RequiredProps = PropLabel & PropToolbarItems;
type OptionalProps = PropOrientation;

export type ToolbarProps = Generic.Element.Members<RequiredProps, OptionalProps>;
