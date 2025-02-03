import type { Generic } from 'adopted-style-sheets';
import type { PropDetailsCallbacks } from '../props';
import type * as CollapsibleTypes from './collapsible';

type RequiredProps = CollapsibleTypes.RequiredProps;
type OptionalProps = CollapsibleTypes.OptionalProps & PropDetailsCallbacks<boolean>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;

export type DetailsProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type DetailsStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type DetailsAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
