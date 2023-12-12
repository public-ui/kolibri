import { Generic } from 'adopted-style-sheets';

import { watchBoolean } from '../../utils/prop.validators';

/* types */
export type ReadOnlyPropType = boolean;

/**
 * Makes the input element read only.
 */
export type PropReadOnly = {
	readOnly: ReadOnlyPropType;
};

/* validator */
export const validateReadOnly = (component: Generic.Element.Component, value?: ReadOnlyPropType): void => {
	watchBoolean(component, '_readOnly', value);
};
