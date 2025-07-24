import { Routes } from '../../shares/types';
import { InputPasswordBasic } from './basic';
import { InputPasswordHideLabel } from './hide-label';
import { InputPasswordShowPassword } from './show-password';

export const INPUT_PASSWORD_ROUTES: Routes = {
	'input-password': {
		basic: InputPasswordBasic,
		'hide-label': InputPasswordHideLabel,
		'show-password': InputPasswordShowPassword,
	},
};
