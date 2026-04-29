import type { Routes } from '../../shares/types';
import { InputNumberBasic } from './basic';
import { InputNumberNumberFormatter } from './number-formatter';
import { InputNumberOnInputOnChange } from './on-input-on-change';

export const INPUT_NUMBER_ROUTES: Routes = {
	'input-number': {
		'on-input-on-change': InputNumberOnInputOnChange,
		basic: InputNumberBasic,
		'number-formatter': InputNumberNumberFormatter,
	},
};
