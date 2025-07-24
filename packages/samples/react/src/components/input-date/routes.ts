import { Routes } from '../../shares/types';
import { InputDateBasic } from './basic';
import { InputDateHideLabel } from './hide-label';
import { InputDateMinMax } from './min-max';
import { InputDateReset } from './reset';
import { InputDateShowHideMsg } from './show-hide-msg';

export const INPUT_DATE_ROUTES: Routes = {
	'input-date': {
		basic: InputDateBasic,
		'hide-label': InputDateHideLabel,
		'min-max': InputDateMinMax,
		reset: InputDateReset,
		'show-hide-msg': InputDateShowHideMsg,
	},
};
