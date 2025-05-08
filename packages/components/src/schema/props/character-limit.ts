import type { Generic } from 'adopted-style-sheets';

import { watchNumber } from '../utils';

/* types */
export type CharacterLimitPropType = number;

/**
 * When defined, a remaining characters counter is shown. The field is marked as invalid when the character limit has been exceeded.
 */
export type PropCharacterLimit = {
	characterLimit: CharacterLimitPropType;
};

/* validator */
export const validateCharacterLimit = (component: Generic.Element.Component, value?: CharacterLimitPropType): void => {
	watchNumber(component, `_characterLimit`, value, { min: 1 });
};
