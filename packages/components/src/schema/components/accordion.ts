import type { Generic } from 'adopted-style-sheets';
import type { PropCollapsibleCallbacks } from '../props';
import type { Members } from '../types/members';
import type * as CollapsibleTypes from './collapsible';

type RequiredProps = CollapsibleTypes.RequiredProps;
type OptionalProps = CollapsibleTypes.OptionalProps & PropCollapsibleCallbacks<boolean>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;

export type AccordionProps = Members<RequiredProps, OptionalProps>;
export type AccordionStates = Members<RequiredStates, OptionalStates>;
export type AccordionAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
