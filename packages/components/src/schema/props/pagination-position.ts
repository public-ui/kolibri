/* types */
import type { Generic } from 'adopted-style-sheets';
import { watchValidator } from '../utils/prop.validators';

const paginationPositionPropTypeOptions = ['top', 'bottom', 'both'] as const;
export type PaginationPositionPropType = (typeof paginationPositionPropTypeOptions)[number];

/* validator */
export const validatePaginationPosition = (component: Generic.Element.Component, value?: PaginationPositionPropType): void => {
	watchValidator(
		component,
		`_paginationPosition`,
		(value) => typeof value === 'string' && paginationPositionPropTypeOptions.includes(value),
		new Set([`PaginationPositionPropType {${paginationPositionPropTypeOptions.join(', ')}`]),
		value,
		{
			defaultValue: 'bottom',
		},
	);
};
