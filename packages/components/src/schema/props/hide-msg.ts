import type { Generic } from 'adopted-style-sheets';

import type { WatchBooleanOptions } from '../utils';
import { watchBoolean } from '../utils';

/* types */
export type HideMsgPropType = boolean;

/**
 * Hides the message but leaves it in the DOM for the input's aria-describedby.
 */
export type PropHideMsg = {
	hideMsg: HideMsgPropType;
};

/* validator */
export const validateHideMsg = (component: Generic.Element.Component, value?: HideMsgPropType, options?: WatchBooleanOptions): void => {
	watchBoolean(component, '_hideMsg', value, options);
};
