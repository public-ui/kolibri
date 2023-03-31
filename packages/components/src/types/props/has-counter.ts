import { Generic } from '@a11y-ui/core';
import { watchBoolean } from '../../utils/prop.validators';

/* exported types */
/** de
 * Zeigt die Zeichenanzahlanzeige am unteren Rand des EIngabefeldes.
 */
/** en
 * Shows the the character count on the lower border of the input.
 */
export type PropHasCounter = {
	hasCounter?: boolean;
};

/* validator */
export const validateHasCounter = (component: Generic.Element.Component, value?: boolean): void => {
	watchBoolean(component, '_hasCounter', value);
};
