import type { Generic } from 'adopted-style-sheets';

import type { WatchBooleanOptions } from '../utils';
import { watchBoolean } from '../utils';

/* types */
export type VisibilityTogglePropType = boolean;

/**
 * Activates the show password button.
 */
export type PropVisibilityToggle = {
	visibilityToggle: VisibilityTogglePropType;
};

/* validator */
export const validateVisibilityToggle = (component: Generic.Element.Component, value?: VisibilityTogglePropType, hooks?: WatchBooleanOptions): void => {
	watchBoolean(component, '_visibilityToggle', value, hooks);
};
