import type { Generic } from 'adopted-style-sheets';
import { watchString } from '../utils';

/* types */
export type ShortKeyPropType = string;

/**
 * Defines the elements short key.
 */
export type PropShortKey = {
	shortKey: ShortKeyPropType;
};

/* validator */
export const validateShortKey = (component: Generic.Element.Component, value?: ShortKeyPropType): void => {
	watchString(component, '_shortKey', value);
};
