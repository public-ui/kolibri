import type { Generic } from 'adopted-style-sheets';

import type { HeadingLevel, PropLabelWithExpertSlot } from '../props';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	secondaryHeadline: string;
	level: HeadingLevel;
};

type RequiredStates = RequiredProps & {
	level: HeadingLevel;
};
type OptionalStates = {
	secondaryHeadline: string;
};
export type HeadingProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type HeadingStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type HeadingAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
