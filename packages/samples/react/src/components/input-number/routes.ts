import { Routes } from '../../shares/types';
import { InputNumberBasic } from './basic';
import { InputNumberYearFormatter } from './year-formatter';

export const INPUT_NUMBER_ROUTES: Routes = {
	'input-number': {
		basic: InputNumberBasic,
		'year-formatter': InputNumberYearFormatter,
	},
};
