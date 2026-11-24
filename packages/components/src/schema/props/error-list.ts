import type { KolFocusOptions } from '../interfaces';
import type { EventCallback } from '../types';

/* types */
export type ErrorListPropType = {
	message: string;
	selector: string | EventCallback<Event>;
	options?: KolFocusOptions;
};

export type PropErrorList = {
	errorList: ErrorListPropType[];
};
