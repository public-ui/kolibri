import type { Generic } from 'adopted-style-sheets';
import { watchValidator } from '../../utils/prop.validators';

/* types */
export type ErrorListPropType = {
	message: string;
	selector: string;
};

export type PropErrorList = {
	errorList: ErrorListPropType[];
};

/* validator */
export const validateErrorList = (component: Generic.Element.Component, value?: ErrorListPropType[]): void => {
	watchValidator(component, 'errorList', (value): boolean => typeof value === 'object', new Set(['Object']), value);
};
