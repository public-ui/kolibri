import { Generic } from '@a11y-ui/core';
import { watchBoolean } from '../../utils/prop.validators';

/* types */
/** de
 * Setzt die Navigation auf Hamburger-Modus.
 */
/** en
 * Puts the navigation in hamburger mode.
 */
export type PropIsHamburgerMenu = {
	isHamburgerMenu: boolean;
};

/* validator */
export const validateIsHamburgerMenu = (component: Generic.Element.Component, value?: boolean): void => {
	watchBoolean(component, '_isHamburgerMenu', value);
};
