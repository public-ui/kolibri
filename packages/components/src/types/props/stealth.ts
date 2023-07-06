import { Generic } from '@a11y-ui/core';

import { watchBoolean } from '../../utils/prop.validators';

/**
 * Hides the link und makes it appear on focus.
 *
 * @deprecated will be removed in v2
 */
export type PropStealth = {
	stealth: boolean;
};

/**
 * @deprecated will be removed in v2
 */
export const validateStealth = (component: Generic.Element.Component, value?: boolean): void => {
	watchBoolean(component, '_stealth', value);
};
