import type { Generic } from 'adopted-style-sheets';

import type { WatchStringOptions } from '../utils';
import { watchValidator } from '../utils';
import { a11yHint, uiUxHint } from '../utils/a11y.tipps';

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

/**
 * Trims a label value and returns it as a single string.
 *
 * - If `label` is a string, leading and trailing whitespace is removed.
 * - If `label` is an array of label segments,  all segments are concatenated
 * and leading and trailing whitespace is removed.
 *
 * @param label The label value as a LabelPropType (string or an array of label segments).
 * @returns The normalized label as a trimmed string.
 */
export function trimLabel(label: LabelPropType): string {
	if (typeof label === 'string') {
		return label.trim();
	}

	return label
		.map((item) => item.text)
		.join('')
		.trim();
}

/**
 * Defines segments of a label with language attributes
 */
export type LabelSegment = {
	text: string;
	lang?: string;
};

/**
 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
 */
export type LabelPropType = string | LabelSegment[];

/**
 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
 */
export type LabelWithExpertSlotPropType = LabelPropType | '';

/**
 * The label property is used to label different elements:
 * - abbr -> title text
 * - button -> label text
 * - heading -> headline text
 * - input, select and textarea -> label text
 * - summary -> summary text
 * - quote, table -> caption text
 * - version -> version text
 * - etc.
 *
 * The label is often a mandatory attribute. If the value of the label is false,
 * the expert-slot will be used. Otherwise, the value of the label must be a string
 * and the expert-slot will be ignored.
 */
export type PropLabel = {
	label: LabelPropType;
};
export type PropLabelWithExpertSlot = {
	label: LabelWithExpertSlotPropType;
};

export type LabelProp = Generic.Element.Members<PropLabel, unknown>;
// type LabelWithExpertSlotProp = Generic.Element.Members<PropLabelWithExpertSlot, unknown>;

function isLabelSegment(value: unknown): value is LabelSegment {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const v = value as Record<string, unknown>;
	const keys = Object.keys(v);

	// only text & lang are allowed
	if (!keys.every((k) => k === 'text' || k === 'lang')) {
		return false;
	}

	// text is mandatory
	if (typeof v.text !== 'string') {
		return false;
	}

	//lang is optional
	if (v.lang !== undefined && typeof v.lang !== 'string') {
		return false;
	}

	return true;
}

function getValidationOptions(options: WatchStringOptions): WatchStringOptions {
	return {
		...options,
		hooks: {
			afterPatch: (value, state, component, key) => {
				if (typeof options.hooks?.afterPatch === 'function') {
					options.hooks?.afterPatch(value, state, component, key);
				}
				if (typeof value === 'string' && hasEnoughReadableChars(value, 3) === false && containsOnlyNumbers(value) === false) {
					a11yHint(`The heading or label ("${value}") is inaccessible. A label should consist of at least three readable characters.`);
				}
				if (typeof value === 'string' && value.length > 80) {
					uiUxHint(`A heading or label should not be longer than 80 characters.`);
				}
				if (Array.isArray(value) && !value.every(isLabelSegment)) {
					uiUxHint(`Label segments have to be { text: string, lang?: string }`);
				}
			},
			beforePatch: options.hooks?.beforePatch,
		},
	};
}

const LABEL_VALUES = new Set(['string']);
export const validateLabel = (component: Generic.Element.Component, value?: LabelPropType, options: WatchStringOptions = {}): void => {
	watchValidator(component, '_label', (value) => typeof value === 'string' || Array.isArray(value), LABEL_VALUES, value, getValidationOptions(options));
};

/**
 * This method name helps to differentiate between the label
 * and the label with expert slot usage.
 */
export const validateLabelWithExpertSlot = validateLabel;
