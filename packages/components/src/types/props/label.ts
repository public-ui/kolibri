import { Generic } from '@a11y-ui/core';
import { a11yHint, uiUxHint } from '../../utils/a11y.tipps';
import { watchString, WatchStringOptions } from '../../utils/prop.validators';
import { isEmptyOrPrefixOf } from '../../utils/validator';

/* types */

/**
 * This is a regular expression that matches all readable characters.
 *
 * Interesting: https://stackoverflow.com/questions/150033/regular-expression-to-match-non-english-characters
 */
const READABLE_CHARS = /[a-zA-Z0-9äöüÄÖÜß]/g;

/**
 * This is a regular expression that matches only numbers.
 */
const ONLY_NUMBERS = /^\d+$/;

/**
 * This function counts the number of readable characters in a string.
 * @param str The string to count.
 * @returns The number of readable characters in the string.
 */
function countReadableChars(str: string): number {
	return typeof str === 'string' ? str.match(READABLE_CHARS)?.length || 0 : 0;
}

/**
 * This function checks if a string has at least a certain number of readable characters.
 * @param str The string to check.
 * @param min The minimum number of readable characters.
 * @returns True if the string has at least the minimum number of readable characters, false otherwise.
 */
export function hasEnoughReadableChars(str: string, min = 1): boolean {
	return countReadableChars(str) >= min;
}

/**
 * This function checks if a string contains only numbers.
 * @param str The string to check.
 * @returns True if the string contains only numbers, false otherwise.
 */
export function containsOnlyNumbers(str: string): boolean {
	return ONLY_NUMBERS.test(str);
}

/** de
 * Das Label dient der Beschriftung unterschiedlicher Elemente.
 * - Button -> label text
 * - Heading -> headline text
 * - Input, Select und Textarea -> label text
 * - Summary -> summary text
 * - Table -> caption text
 * - etc.
 *
 * Das Label ist häufig ein Pflichtattribut und kann leer gesetzt werden,
 * wenn man das Label mittels dem Expert-Slot überschreiben will.
 */
/** en
 * The label is used to label different elements.
 * -Button -> label text
 * -Heading -> headline text
 * -Input, Select and Textarea -> label text
 * -Summary -> summary text
 * -Table -> caption text
 * -Etc.
 *
 * The label is often a mandatory attribute and can be set empty,
 * if you want to overwrite the label using the expert slot.
 */
export type PropLabel = {
	label: string;
};

export type LabelProp = Generic.Element.Members<PropLabel, unknown>;

/* validator */
/**
 * Ein abweichendes Aria-Label muss aus Gründern der Barrierefreiheit für
 * die Sprachsteuerung mit dem Label-Text beginnen.
 */
const syncAriaLabelBeforePatch: Generic.Element.NextStateHooksCallback = (_nextValue, nextState, component: Generic.Element.Component, key): void => {
	const ariaLabel: string | undefined = nextState.has('_ariaLabel') ? (nextState.get('_ariaLabel') as string) : (component.state._ariaLabel as string);
	if (typeof ariaLabel === 'string') {
		const label: string = nextState.has('_label') ? (nextState.get('_label') as string) : (component.state._label as string);
		if (isEmptyOrPrefixOf(label, ariaLabel) === false) {
			if (key === '_ariaLabel') {
				nextState.set('_label', ariaLabel);
				// smartSetTimeout(() => ((component as Generic.Element.Component & { _label: string })._label = ariaLabel), 50);
			} else {
				nextState.set('_ariaLabel', undefined);
				// smartSetTimeout(() => ((component as Generic.Element.Component & { _ariaLabel: string })._ariaLabel = label), 50);
			}
			a11yHint(
				`The different Aria label is not barrier-free. A different Aria label must start with the label text for reasons of accessibility for voice control.`
			);
		}
	}
};

const validateAriaLabel = (component: Generic.Element.Component, value?: string, options: WatchStringOptions = {}): void => {
	watchString(component, '_ariaLabel', value, {
		hooks: {
			afterPatch: (value, state, component, key) => {
				if (typeof options.hooks?.afterPatch === 'function') {
					options.hooks?.afterPatch(value, state, component, key);
				}
				if (typeof value === 'string' && value.length > 0 && hasEnoughReadableChars(value, 3) === false && containsOnlyNumbers(value) === false) {
					a11yHint(`The different aria label ("${value}") is not accessible. A different aria label should consist of at least three readable characters.`);
				}
			},
			beforePatch: options.hooks?.beforePatch,
		},
	});
};

export const validateAriaLabelWithLabel = (component: Generic.Element.Component, value?: string): void => {
	validateAriaLabel(component, value, {
		hooks: {
			beforePatch: syncAriaLabelBeforePatch,
		},
	});
};

export const validateLabel = (component: Generic.Element.Component, value?: string, options: WatchStringOptions = {}): void => {
	watchString(component, '_label', value, {
		hooks: {
			afterPatch: (value, state, component, key) => {
				if (typeof options.hooks?.afterPatch === 'function') {
					options.hooks?.afterPatch(value, state, component, key);
				}
				if (typeof value === 'string' && hasEnoughReadableChars(value, 3) === false && containsOnlyNumbers(value) === false) {
					a11yHint(`The heading or label ("${value}") is not accessible. A label should consist of at least three readable characters.`);
				}
				if (typeof value === 'string' && value.length > 80) {
					uiUxHint(`A heading or label should not be longer than 80 characters.`);
				}
			},
			beforePatch: options.hooks?.beforePatch,
		},
		required: true,
	});
};

export const validateLabelWithAriaLabel = (component: Generic.Element.Component, value?: string): void => {
	validateLabel(component, value, {
		hooks: {
			beforePatch: syncAriaLabelBeforePatch,
		},
	});
};
