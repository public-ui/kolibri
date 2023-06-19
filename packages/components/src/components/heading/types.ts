import { Generic } from '@a11y-ui/core';
import { HeadingLevel } from '../../components';

type RequiredProps = {
	label: string;
};
type OptionalProps = {
	secondaryHeadline: string;
	level: HeadingLevel;
};

type RequiredStates = {
	label: string;
	level: HeadingLevel;
};
type OptionalStates = {
	secondaryHeadline: string;
};
export type KoliBriHeadingStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriHeadingAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
