import { Generic } from '@a11y-ui/core';
import { PropLabel } from '../../types/props/label';

type RequiredProps = unknown;
type OptionalProps = {
	open: boolean;
	/**
	 * @deprecated Use label.
	 */
	summary: string;
} & PropLabel; // TODO v2: PropLabel will become required
export type KoliBriDetailsProps = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;

export type KoliBriDetailsStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type KoliBriDetailsAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
