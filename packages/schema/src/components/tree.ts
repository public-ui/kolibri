import type { Generic } from 'adopted-style-sheets';
import type { PropLabel } from '../props';

type RequiredProps = PropLabel;
type OptionalProps = unknown;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;

export type TreeProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type TreeStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type TreeAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
