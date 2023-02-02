import { Generic } from '@a11y-ui/core';

/**
 * API
 */
export type RequiredProps = {
	label: string;
};
export type OptionalProps = unknown;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

export type RequiredStates = RequiredProps;
export type OptionalStates = OptionalProps;
export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
