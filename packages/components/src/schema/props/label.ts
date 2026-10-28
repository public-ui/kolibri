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
 * @returns The number of readable characters.
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
 * - `undefined` becomes the empty string, so call sites with an optional label
 * do not need a guard.
 *
 * @param label The label value as a LabelPropType (string or an array of label segments).
 * @returns The normalized label as a trimmed string.
 */
export function trimLabel(label: LabelLangSegmentsPropType | undefined): string {
	if (typeof label === 'string') {
		return label.trim();
	}
	if (Array.isArray(label)) {
		return label
			.map((item) => item.text)
			.join('')
			.trim();
	}
	return '';
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
export type LabelPropType = string;

/**
 * Defines the visible or semantic label with segments in different languages (so screenreader know how to pronounce every segment) of the component (e.g. aria-label, label, headline, caption, summary, etc.).
 */
export type LabelLangSegmentsPropType = LabelPropType | LabelSegment[];

/**
 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
 * Segments in different languages let screen readers pronounce every language run. Set to `''` to enable the expert slot.
 */
export type LabelWithExpertSlotPropType = LabelLangSegmentsPropType | '';

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
 * The label is often a mandatory attribute. If the value of the label is the empty
 * string, the expert-slot will be used. Otherwise, the value of the label must be a
 * valid label string or a list of label segments and the expert-slot will be ignored.
 */
export type PropLabel = {
	label: LabelPropType;
};
export type PropLabelLangSegments = {
	label: LabelLangSegmentsPropType;
};
export type PropLabelWithExpertSlot = {
	label: LabelWithExpertSlotPropType;
};

export type LabelProp = Generic.Element.Members<PropLabel, unknown>;
export type LabelLangSegmentsProp = Generic.Element.Members<PropLabelLangSegments, unknown>;

export function isLabelSegment(value: unknown): value is LabelSegment {
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

/**
 * A label string is at least two characters long. Numbers-only labels are exempt from the minimum
 * length — generated labels like page numbers are valid label texts. This is the single predicate
 * behind every label validator, here and in the internal prop definitions.
 */
export const isValidLabelString = (value: string): boolean => value.length >= 2 || containsOnlyNumbers(value);

/**
 * A label value is valid when it is a valid label string or a well-formed segment list: every entry
 * is a label segment and the joined text passes the label string predicate — the minimum length
 * applies to the label as a whole, not to each language run.
 */
export function isValidLabelSegments(value: unknown): boolean {
	if (typeof value === 'string') {
		return isValidLabelString(value);
	}
	if (Array.isArray(value)) {
		return value.length > 0 && value.every(isLabelSegment) && isValidLabelString(trimLabel(value));
	}
	return false;
}

function getValidationOptions(options: WatchStringOptions): WatchStringOptions {
	return {
		...options,
		hooks: {
			afterPatch: (value, state, component, key) => {
				if (typeof options.hooks?.afterPatch === 'function') {
					options.hooks?.afterPatch(value, state, component, key);
				}
				const text = typeof value === 'string' ? value : Array.isArray(value) ? trimLabel(value) : undefined;
				if (typeof text === 'string' && text !== '' && hasEnoughReadableChars(text, 3) === false && containsOnlyNumbers(text) === false) {
					a11yHint(`The heading or label ("${text}") is inaccessible. A label should consist of at least three readable characters.`);
				}
				if (typeof text === 'string' && text.length > 80) {
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
const LABEL_SEGMENT_VALUES = new Set(['string', 'LabelSegment[]']);
/**
 * This validator validates the label of a component without an expert slot: the empty string is
 * invalid — it is the expert-slot sentinel of `LabelWithExpertSlotPropType` only.
 */
export const validateLabel = (component: Generic.Element.Component, value?: LabelPropType, options: WatchStringOptions = {}): void => {
	watchValidator(component, '_label', (value) => typeof value === 'string' && isValidLabelString(value), LABEL_VALUES, value, getValidationOptions(options));
};

/**
 * This validator validates the label of a component that renders its label and supports language
 * segments: the empty string is invalid (the expert-slot sentinel belongs to
 * `validateLabelWithExpertSlot`), a segment list must be well-formed with a valid joined text.
 */
export const validateLabelLangSegments = (component: Generic.Element.Component, value?: LabelLangSegmentsPropType, options: WatchStringOptions = {}): void => {
	watchValidator(component, '_label', (value) => isValidLabelSegments(value), LABEL_SEGMENT_VALUES, value, getValidationOptions(options));
};

/**
 * This validator validates the label of a component with an expert slot: the empty string enables
 * the expert slot, everything else follows `validateLabelLangSegments`.
 */
export const validateLabelWithExpertSlot = (
	component: Generic.Element.Component,
	value?: LabelWithExpertSlotPropType,
	options: WatchStringOptions = {},
): void => {
	watchValidator(component, '_label', (value) => value === '' || isValidLabelSegments(value), LABEL_SEGMENT_VALUES, value, getValidationOptions(options));
};
