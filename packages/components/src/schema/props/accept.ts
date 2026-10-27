import type { Generic } from 'adopted-style-sheets';

import type { WatchStringOptions } from '../utils';
import { watchString } from '../utils';

/* types */
export type AcceptPropType = string;

/* validator */
export const validateAccept = (component: Generic.Element.Component, value?: AcceptPropType, options: WatchStringOptions = {}): void => {
	watchString(component, '_accept', value, options);
};
