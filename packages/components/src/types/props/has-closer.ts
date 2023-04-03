import { Generic } from '@a11y-ui/core';
import { watchBoolean } from '../../utils/prop.validators';

/* exported types */
/** de
 * Markiert dieses Element als geöffnet, oder dass das verknüpfte Element (aria-controls/aria-owns) geöffnet ist.
 */
/** en
 * Marks this element as open/expanded, or that the connected element (aria-controls/aria-owns) is open/expanded.
 */
export type PropHasCloser = {
	hasCloser?: boolean;
};

/* validator */
export const validateHasCloser = (component: Generic.Element.Component, value?: boolean): void => {
	watchBoolean(component, '_hasCloser', value);
};
