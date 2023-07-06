import { Generic } from '@a11y-ui/core';

import { HeadingLevel } from '../../types/heading-level';
import { PropLabelWithExpertSlot } from '../../types/props/label';

type RequiredProps = PropLabelWithExpertSlot;
type OptionalProps = {
	secondaryHeadline: string;
	level: HeadingLevel;
};
export type KoliBriHeadingProps = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	level: HeadingLevel;
} & PropLabelWithExpertSlot;
type OptionalStates = {
	secondaryHeadline: string;
};
export type KoliBriHeadingStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriHeadingAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
