/* types */
import { Generic } from '@a11y-ui/core';
import { watchNumber } from '../../utils/prop.validators';

export type RowsPropType = number;

/**
 * Number of rows of the input element that should be visible at the same time
 */
export type PropRows = {
	rows: RowsPropType;
};

/* validator */
export const validateRows = (component: Generic.Element.Component, value?: RowsPropType): void => {
	watchNumber(component, `_rows`, value, { min: 0 });
};
