import type { Generic } from 'adopted-style-sheets';

/**
 * API
 */
export type RequiredProps = {
	heading: string;
};
export type OptionalProps = unknown;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

export type RequiredStates = RequiredProps;
export type OptionalStates = OptionalProps;
export type States = Generic.Element.Members<RequiredStates, OptionalStates>;
