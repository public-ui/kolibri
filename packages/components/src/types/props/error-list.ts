import type { Generic } from 'adopted-style-sheets';
import { watchString } from '../../utils/prop.validators';

/* types */
export type ErrorListPropType = {
	message: string;
	selector: string;
};

export type PropErrorList = {
	errorList: ErrorListPropType;
};
