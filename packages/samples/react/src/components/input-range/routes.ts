import type { Routes } from '../../shares/types';
import { InputRangeBasic } from './basic';
import { InputRangeOnInputOnChange } from './get-value';

export const INPUT_RANGE_ROUTES: Routes = {
	'input-range': {
		basic: InputRangeBasic,
		'get-value': InputRangeOnInputOnChange,
	},
};
