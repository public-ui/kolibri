import type { Generic } from 'adopted-style-sheets';

import { watchBoolean } from '../utils';

/* types */
export type SpellCheckPropType = boolean;

/**
 * Defines whether the browser should check the spelling and grammar.
 */
export type PropSpellCheck = {
	spellCheck: SpellCheckPropType;
};

/* validator */
export const validateSpellCheck = (component: Generic.Element.Component, value?: SpellCheckPropType): void => {
	watchBoolean(component, '_spellCheck', value, {
		defaultValue: undefined,
	});
};
