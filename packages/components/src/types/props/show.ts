import { Generic } from '@a11y-ui/core';

import { watchBoolean, WatchBooleanOptions } from '../../utils/prop.validators';

/* types */
export type ShowPropType = boolean;

/**
 * Makes the element show up.
 */
export type PropShow = {
	show: ShowPropType;
};

/* validator */
export const validateShow = (component: Generic.Element.Component, value?: ShowPropType, hooks?: WatchBooleanOptions): void => {
	watchBoolean(component, '_show', value, hooks);
};
