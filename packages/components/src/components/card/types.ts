import { Generic } from '@a11y-ui/core';

import { HeadingLevel } from '../../types/heading-level';
import { PropHasFooter } from '../../types/props/has-footer';

type RequiredProps = {
	heading: string;
};
type OptionalProps = {
	/**
	 * @deprecated Use _heading instead
	 */
	headline: string;
	level: HeadingLevel;
} & PropHasFooter;
export type koliBriCardProps = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;

export type KoliBriCardStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriCardAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
