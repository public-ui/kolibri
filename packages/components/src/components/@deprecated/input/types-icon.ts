import type { KoliBriHorizontalIcons, PropLabelWithExpertSlot, Stringified } from '../../../schema';
import type { Generic } from 'adopted-style-sheets';

type RequiredProps = NonNullable<unknown>;
type OptionalProps = PropLabelWithExpertSlot & {
	icons: Stringified<KoliBriHorizontalIcons>;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
export type Watches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
