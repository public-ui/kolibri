import type { Routes } from '../../shares/types';
import { InputRangeBasic } from './basic';
import { InputRangeList } from './list';

export const INPUT_RANGE_ROUTES: Routes = {
	'input-range': {
		basic: InputRangeBasic,
		list: InputRangeList,
	},
};
