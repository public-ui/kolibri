/* types */
import type { Generic } from 'adopted-style-sheets';
import { watchValidator } from '../utils';

const orientationPropTypeOptions = ['horizontal', 'vertical'] as const;
export type OrientationPropType = (typeof orientationPropTypeOptions)[number];

/**
 * Defines whether the orientation of the component is horizontal or vertical.
 */
export type PropOrientation = {
	orientation: OrientationPropType;
};

/* validator */
export const validateOrientation = (
	component: Generic.Element.Component,
	value?: OrientationPropType,
	defaultValue: OrientationPropType = 'horizontal',
): void => {
	watchValidator(
		component,
		`_orientation`,
		(value) => typeof value === 'string' && orientationPropTypeOptions.includes(value),
		new Set([`KoliBriOrientation {${orientationPropTypeOptions.join(', ')}`]),
		value,
		{
			defaultValue,
		},
	);
};
