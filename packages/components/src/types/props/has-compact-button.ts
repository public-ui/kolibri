import { Generic } from '@a11y-ui/core';
import { watchBoolean } from '../../utils/prop.validators';

/* exported types */
/** de
 * Erzeugt eine Schaltfläche, die _collapsible umschaltet. Nur verfügbar bei _orientation="vertical".
 */
/** en
 * Creates a button below the navigation, that toggles _collapsible. Only available for _orientation="vertical".
 */
export type PropHasCompactButton = {
	hasCompactButton?: boolean;
};

/* validator */
export const validateHasCompactButton = (component: Generic.Element.Component, value?: boolean): void => {
	watchBoolean(component, '_hasCompactButton', value);
};
