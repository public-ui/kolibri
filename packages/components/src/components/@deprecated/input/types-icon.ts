import { Generic } from '@a11y-ui/core';

import { Stringified } from '../../../types/common';
import { KoliBriHorizontalIcons } from '../../../types/icons';
import { PropLabelWithExpertSlot } from '../../../types/props/label';

type RequiredProps = NonNullable<unknown>;
type OptionalProps = PropLabelWithExpertSlot & {
	icon: Stringified<KoliBriHorizontalIcons>;
	icons: Stringified<KoliBriHorizontalIcons>;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
export type Watches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
