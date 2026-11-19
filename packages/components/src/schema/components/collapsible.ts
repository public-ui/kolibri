import type { HeadingLevel, PropDisabled, PropLabelLangSegments, PropOpen } from '../props';

export type RequiredProps = PropLabelLangSegments;
export type OptionalProps = {
	level: HeadingLevel;
} & PropDisabled &
	PropOpen;

export type RequiredStates = RequiredProps & PropLabelLangSegments;
export type OptionalStates = OptionalProps;
