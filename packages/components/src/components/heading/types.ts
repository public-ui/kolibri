import { Generic } from '@a11y-ui/core';

import { HeadingLevel } from '../../types/heading-level';
import { PropLabelWithExpertSlot } from '../../types/props/label';
import { PropHeadingVariant } from '../../types/props/heading-variant';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = PropHeadingVariant & {
	secondaryHeadline: string;
	level: HeadingLevel;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps & {
	level: HeadingLevel;
};
type OptionalStates = PropHeadingVariant & {
	secondaryHeadline: string;
};
export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
