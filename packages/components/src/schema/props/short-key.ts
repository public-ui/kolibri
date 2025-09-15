import type { Generic } from 'adopted-style-sheets';
import { watchString } from '../utils';

/* types */
export type ShortKeyPropType = string;

/**
 * Adds a visual shortcut hint after the label and instructs the screen reader to read the shortcut aloud.
 */
export type PropShortKey = {
	shortKey: ShortKeyPropType;
};

/* validator */
export const validateShortKey = (component: Generic.Element.Component, value?: ShortKeyPropType): void => {
	watchString(component, '_shortKey', value);
};
