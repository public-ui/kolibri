import { Routes } from '../../shares/types';
import { InputNumberBasic } from './basic';
import { InputNumberWholeNumberFormatter } from './whole-number-formatter';

export const INPUT_NUMBER_ROUTES: Routes = {
	'input-number': {
		basic: InputNumberBasic,
		'whole-number-formatter': InputNumberWholeNumberFormatter,
	},
};
