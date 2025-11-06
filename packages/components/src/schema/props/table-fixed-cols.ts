import type { Generic } from 'adopted-style-sheets';
import { watchValidator } from '../utils';

export type FixedColsPropType = [number, number];
export type PropFixedCols = {
	fixedCols: FixedColsPropType;
};

export const validateFixedCols = (component: Generic.Element.Component, value?: FixedColsPropType): void => {
	watchValidator(
		component,
		'_fixedCols',
		(value) =>
			Array.isArray(value) &&
			value.length === 2 &&
			typeof value[0] === 'number' &&
			typeof value[1] === 'number' &&
			Number.isInteger(value[0]) &&
			Number.isInteger(value[1]),
		new Set(['FixedColsPropType [leftFixed: number, rightFixed: number]']),
		value,
	);
};
