import { Generic } from '@a11y-ui/core';

import { HeadingLevel } from '../../types/heading-level';
import { PropLabelWithExpertSlot } from '../../types/props/label';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	secondaryHeadline: string;
	level: HeadingLevel;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps & {
	level: HeadingLevel;
};
type OptionalStates = {
	secondaryHeadline: string;
};
export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
export type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
