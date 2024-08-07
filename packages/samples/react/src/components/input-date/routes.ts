import { Routes } from '../../shares/types';
import { InputDateBasic } from './basic';
import { InputDateReset } from './reset';

export const INPUT_DATE_ROUTES: Routes = {
	'input-date': {
		basic: InputDateBasic,
		reset: InputDateReset,
	},
};
