import { Generic } from '@a11y-ui/core';
import { HeadingLevel } from '../../components';
import { PropLabel } from '../../types/props';

type RequiredProps = PropLabel;
type OptionalProps = {
	secondaryHeadline: string;
	level: HeadingLevel;
};
export type KoliBriHeadingProps = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	level: HeadingLevel;
} & PropLabel;
type OptionalStates = {
	secondaryHeadline: string;
};
export type KoliBriHeadingStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriHeadingAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
