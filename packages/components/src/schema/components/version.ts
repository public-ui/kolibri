import type { Generic } from 'adopted-style-sheets';

import type { PropLabel } from '../props';

type RequiredProps = PropLabel;
type OptionalProps = NonNullable<unknown>;

export type VersionProps = Generic.Element.Members<RequiredProps, OptionalProps>;
