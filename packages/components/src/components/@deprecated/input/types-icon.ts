import type { PropHorizontalIcons, PropLabelWithExpertSlot } from '../../../schema';
import type { Generic } from 'adopted-style-sheets';

type RequiredProps = NonNullable<unknown>;
type OptionalProps = PropLabelWithExpertSlot & PropHorizontalIcons;

export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
export type Watches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
