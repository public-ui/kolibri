import type { Generic } from 'adopted-style-sheets';

import type { HeadingLevel, PropLabelWithExpertSlot } from '../props';
import type { Members } from '../types/members';

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
export type HeadingProps = Members<RequiredProps, OptionalProps>;
export type HeadingStates = Members<RequiredStates, OptionalStates>;
export type HeadingAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
