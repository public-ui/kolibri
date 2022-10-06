import { Generic } from '@public-ui/core';
import { Icofont } from '../../types/icofont';
import { watchValidator } from '../../utils/prop.validators';

export const watchIcofont = (component: Generic.Element.Component, value?: Icofont): void => {
	watchValidator(
		component,
		'_icon',
		(value): boolean => {
			return typeof value === 'string';
		},
		new Set(['Icofont']),
		value,
		{
			required: true,
		}
	);
};
