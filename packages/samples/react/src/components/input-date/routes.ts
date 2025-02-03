import { Routes } from '../../shares/types';
import { InputDateBasic } from './basic';
import { InputDateReset } from './reset';
import { InputDateShowHideMsg } from './show-hide-msg';

export const INPUT_DATE_ROUTES: Routes = {
	'input-date': {
		basic: InputDateBasic,
		reset: InputDateReset,
		'show-hide-msg': InputDateShowHideMsg,
	},
};
