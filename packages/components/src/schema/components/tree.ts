import type { Generic } from 'adopted-style-sheets';
import type { PropLabel } from '../props';
import type { Members } from '../types/members';

type RequiredProps = PropLabel;
type OptionalProps = unknown;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;

export type TreeProps = Members<RequiredProps, OptionalProps>;
export type TreeStates = Members<RequiredStates, OptionalStates>;
export type TreeAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
