import type { Generic } from 'adopted-style-sheets';
import type { PropCollapsibleCallbacks } from '../props';
import type * as CollapsibleTypes from './collapsible';

type RequiredProps = CollapsibleTypes.RequiredProps;
type OptionalProps = CollapsibleTypes.OptionalProps & PropCollapsibleCallbacks<boolean>;

export type AccordionProps = Generic.Element.Members<RequiredProps, OptionalProps>;
