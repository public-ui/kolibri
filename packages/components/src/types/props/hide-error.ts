import type { Generic } from 'adopted-style-sheets';

import { watchBoolean, WatchBooleanOptions } from '../../utils/prop.validators';

/* types */
export type HideErrorPropType = boolean;

/**
 * Hides the error message but leaves it in the DOM for the input's aria-describedby.
 */
export type PropHideError = {
	hideError: HideErrorPropType;
};

/* validator */
export const validateHideError = (component: Generic.Element.Component, value?: HideErrorPropType, options?: WatchBooleanOptions): void => {
	watchBoolean(component, '_hideError', value, options);
};
