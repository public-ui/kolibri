import type { Routes } from '../../shares/types';
import { InputRangeBasic } from './basic';
import { InputRangeOnInputOnChange } from './on-input-on-change';

export const INPUT_RANGE_ROUTES: Routes = {
	'input-range': {
		'on-input-on-change': InputRangeOnInputOnChange,
		basic: InputRangeBasic,
	},
};
