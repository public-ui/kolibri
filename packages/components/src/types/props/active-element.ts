import { Generic } from '@a11y-ui/core';
import { watchValidator } from '../../utils/prop.validators';

/* types */
/** de
 * Übergibt eine Referenz auf das öffnende HTML-Element, wodurch der Dialog geöffnet wird. "null" um zu schließen.
 */
/** en
 * Sets the opening element for the dialog, which opens the dialog. Passing "null" closes the dialog.
 */
export type PropActiveElement = {
	activeElement: boolean;
};

/* validator */
function validate(value?: HTMLElement | null): boolean {
	return typeof value === 'object' || value === null;
}
export const validateActiveElement = (component: Generic.Element.Component, value?: HTMLElement | null): void => {
	watchValidator(component, '_activeElement', validate, new Set(['HTMLElement', 'null']), value, { defaultValue: null });
};
