import type { Generic } from 'adopted-style-sheets';

import type { Stringified } from '../types';
import type { WatchOptions } from '../utils';
import { watchValidator } from '../utils';

/**
 * Defines the backgroundColor and foregroundColor.
 */
export type ColorPair = {
	backgroundColor: string;
	foregroundColor: string;
};

export type PropColor = ColorPair;

type typeOfColorType = 'string' | 'ColorPair' | null;

const HEX_REGEX = /^#((\d|[a-f]){8}|(\d|[a-f]){6}|(\d|[a-f]){3,4})$/i;
function isHexString(value: string): boolean {
	return HEX_REGEX.test(value);
}
/* checks if the string is valid JSON and if the resulting object is a valid ColorPair and returns it, or null if invalid. */
function isColorObjectString(value: string): { type: typeOfColorType; value: PropColor | null } {
	if (value.startsWith('{')) {
		try {
			const parsed = JSON.parse(value) as unknown;
			if (isValidColorPair(parsed as ColorPair)) return { type: 'ColorPair', value: parsed as ColorPair };
		} catch {
			return { type: null, value: null };
		}
	}
	return { type: null, value: null };
}

function typeOfColor(value?: unknown): { type: typeOfColorType; valid: boolean; value: PropColor | string } {
	if (value) {
		if (typeof value === 'string') {
			if (isHexString(value)) return { type: 'string', valid: true, value: value };
			else {
				const colorObject = isColorObjectString(value);
				if (colorObject.value) return { type: colorObject.type, valid: true, value: colorObject.value };
			}
		} else {
			const asColorPair = value as ColorPair;
			if (isValidColorPair(asColorPair)) return { type: 'ColorPair', valid: true, value: asColorPair };
		}
	}
	return { type: null, valid: false, value: '' };
}

/* validate different color options */
function isValidColorPair(value: ColorPair): boolean {
	return !!(typeof value === 'object' && value && typeof value.backgroundColor === 'string' && typeof value.foregroundColor === 'string');
}

function validatorFunction(value?: Stringified<PropColor>): boolean {
	const valueType = typeOfColor(value);
	switch (valueType.type) {
		case null:
			return false;
		case 'string':
		case 'ColorPair':
			return valueType.valid;
	}
}

export const validateColor = (component: Generic.Element.Component, value?: Stringified<PropColor>, options?: WatchOptions): void => {
	watchValidator(component, '_color', validatorFunction, new Set(['rgb in hex', 'ColorPair']), value, options);
};
