import type { Routes } from '../../shares/types';
import { InputNumberBasic } from './basic';
import { InputNumberOnInputOnChange } from './get-value';
import { InputNumberNumberFormatter } from './number-formatter';

export const INPUT_NUMBER_ROUTES: Routes = {
	'input-number': {
		basic: InputNumberBasic,
		'get-value': InputNumberOnInputOnChange,
		'number-formatter': InputNumberNumberFormatter,
	},
};
