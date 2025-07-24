import { Routes } from '../../shares/types';
import { InputRangeBasic } from './basic';
import { InputRangeHideLabel } from './hide-label';

export const INPUT_RANGE_ROUTES: Routes = {
	'input-range': {
		basic: InputRangeBasic,
		'hide-label': InputRangeHideLabel,
	},
};
