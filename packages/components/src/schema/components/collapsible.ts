import type { HeadingLevel, PropDisabled, PropLabel, PropOpen } from '../props';

export type RequiredProps = PropLabel;
export type OptionalProps = {
	level: HeadingLevel;
} & PropDisabled &
	PropOpen;
