import { Routes } from '../../shares/types';
import { InputEmailBasic } from './basic';
import { InputEmailHideLabel } from './hide-label';

export const INPUT_EMAIL_ROUTES: Routes = {
	'input-email': {
		basic: InputEmailBasic,
		'hide-label': InputEmailHideLabel,
	},
};
