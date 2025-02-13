import type { Generic } from 'adopted-style-sheets';
import type { WatchStringOptions } from '../utils';
import { watchValidator } from '../utils';

/* types */
export type MinWidthPropType = string;

/**
 * Defines the technical name of an input field.
 */
export type PropMinWidth = {
	minWidth: MinWidthPropType;
};

/* constants */
/**
 * Regular expression to validate the width of a header cell.
 */
const HEADER_CELL_WIDTH_VALIDATOR = /^\d+(\.\d+)?([a-z]+|%)?$/;

/* validator */
export const validateMinWidth = (component: Generic.Element.Component, value?: MinWidthPropType, options?: WatchStringOptions): void => {
	watchValidator<MinWidthPropType>(
		component,
		'_minWidth',
		(v) => typeof v === 'string' && HEADER_CELL_WIDTH_VALIDATOR.test(v),
		new Set(['String', '/^\\d+(\\.\\d+)?([a-z]+|%)?$/']),
		value,
		options,
	);
};
