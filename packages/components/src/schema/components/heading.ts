import type { Generic } from 'adopted-style-sheets';

import type { HeadingLevel, PropLabelWithExpertSlot } from '../props';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	secondaryHeadline: string;
	level: HeadingLevel;
};
export type HeadingProps = Generic.Element.Members<RequiredProps, OptionalProps>;
