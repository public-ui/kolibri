import type { Generic } from 'adopted-style-sheets';
import type { KolFocusOptions } from '../interfaces';
import type { EventCallback } from '../types';
import { watchValidator } from '../utils';

/* types */
export type ErrorListPropType = {
	message: string;
	selector: string | EventCallback<Event>;
	options?: KolFocusOptions;
};

export type PropErrorList = {
	errorList: ErrorListPropType[];
};

/* validator */
const isErrorListEntry = (value: unknown): boolean => {
	if (typeof value !== 'object' || value === null) {
		return false;
	}
	const { message, selector } = value as Partial<ErrorListPropType>;
	return typeof message === 'string' && (typeof selector === 'string' || typeof selector === 'function');
};

export const validateErrorList = (component: Generic.Element.Component, value?: ErrorListPropType[]): void => {
	watchValidator(
		component,
		'_errorList',
		(value): boolean => Array.isArray(value) && value.every(isErrorListEntry),
		new Set(['{ message: string, selector: string | function, options?: KolFocusOptions }[]']),
		value,
	);
};
