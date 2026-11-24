import type { Generic } from 'adopted-style-sheets';

import { watchValidator } from '../utils';

/* types */
export const autoCompleteOptions = ['on', 'off'] as const;
export type AutoCompletePropType = (typeof autoCompleteOptions)[number] | string;

/**
 * Defines the auto-complete behavior for an element.
 */
export type PropAutoComplete = {
	autoComplete: AutoCompletePropType;
};

/* validator */
export const validateAutoComplete = (component: Generic.Element.Component, value?: AutoCompletePropType): void => {
	watchValidator(
		component,
		'_autoComplete',
		(value): boolean => autoCompleteOptions.includes(value as (typeof autoCompleteOptions)[number]) || (typeof value === 'string' && value.length > 0),
		new Set(autoCompleteOptions),
		value,
		{
			defaultValue: 'off',
		},
	);
};
