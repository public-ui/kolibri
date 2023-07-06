import { Generic } from '@a11y-ui/core';

import { Stringified } from '../../../types/common';
import { KoliBriHorizontalIcon } from '../../../types/icon';
import { PropLabelWithExpertSlot } from '../../../types/props/label';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	icon: Stringified<KoliBriHorizontalIcon>;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
export type Watches = Generic.Element.Watchers<RequiredProps, OptionalProps>;
