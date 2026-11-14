import type { Generic } from 'adopted-style-sheets';

import { watchBoolean } from '../utils';

/* types */
export type HasSettingsMenuPropType = boolean;

/**
 * Defines whether the element shows a settings menu.
 */
export type PropHasSettingsMenu = {
	hasSettingsMenu: HasSettingsMenuPropType;
};

/* validator */
export const validateHasSettingsMenu = (component: Generic.Element.Component, value?: HasSettingsMenuPropType): void => {
	watchBoolean(component, '_hasSettingsMenu', value);
};
