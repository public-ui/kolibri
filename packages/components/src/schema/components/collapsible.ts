import type { Generic } from 'adopted-style-sheets';
import type { HeadingLevel, PropCollapsibleCallbacks, PropDisabled, PropLabel, PropOpen } from '../props';

type RequiredProps = PropLabel;
type OptionalProps = {
	level: HeadingLevel;
} & PropDisabled &
	PropOpen &
	PropCollapsibleCallbacks<boolean>;

type RequiredStates = RequiredProps & PropLabel;
type OptionalStates = OptionalProps;

export type CollapsibleProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type CollapsibleStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type CollapsibleAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
