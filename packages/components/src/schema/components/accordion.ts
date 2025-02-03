import type { Generic } from 'adopted-style-sheets';
import type { PropAccordionCallbacks } from '../props';
import type * as CollapsibleTypes from './collapsible';

type RequiredProps = CollapsibleTypes.RequiredProps;
type OptionalProps = CollapsibleTypes.OptionalProps & PropAccordionCallbacks<boolean>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;

export type AccordionProps = Generic.Element.Members<RequiredProps, OptionalProps>;
export type AccordionStates = Generic.Element.Members<RequiredStates, OptionalStates>;
export type AccordionAPI = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;
