import type { Generic } from 'adopted-style-sheets';
import type { WatchStringOptions } from '../utils';
import { watchValidator } from '../utils';

/**
 * MinWidthPropType is a type alias for a string that represents the minimum width of a whole table.
 */

/**
 * @deprecated Will be calculated by minWidth of each header column definition.
 */
export type MinWidthPropType = string;

/**
 * @deprecated Will be calculated by minWidth of each header column definition.
 */
export type PropMinWidth = {
	/**
	 * @deprecated Will be calculated by minWidth of each header column definition.
	 */
	minWidth: MinWidthPropType;
};

const HEADER_CELL_WIDTH_VALIDATOR = /^\d+(\.\d+)?([a-z]+|%)?$/;

/**
 * @deprecated Will be calculated by minWidth of each header column definition.
 */
export const validateMinWidth = (component: Generic.Element.Component, value?: MinWidthPropType, options?: WatchStringOptions): void => {
	watchValidator(
		component,
		'_minWidth',
		(v) => typeof v === 'string' && HEADER_CELL_WIDTH_VALIDATOR.test(v),
		new Set(['String', '/^\\d+(\\.\\d+)?([a-z]+|%)?$/']),
		value,
		options,
	);
};
