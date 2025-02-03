import type { Generic } from 'adopted-style-sheets';
import { EventCallback } from '../types';
import { watchValidator } from '../utils';

/* types */
export type ErrorListPropType = {
	message: string;
	selector: string | EventCallback<Event>;
};

export type PropErrorList = {
	errorList: ErrorListPropType[];
};

/* validator */
export const validateErrorList = (component: Generic.Element.Component, value?: ErrorListPropType[]): void => {
	watchValidator(
		component,
		'errorList',
		(value): boolean => Array.isArray(value) && value.find((v) => !(typeof v === 'string' || typeof v === 'function')) === undefined,
		new Set(['string', 'function']),
		value,
	);
};
