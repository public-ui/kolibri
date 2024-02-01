import { Routes } from '../../shares/types';
import { InputPasswordBasic } from './basic';
import { InputPasswordShowPassword } from './show-password';

export const INPUT_PASSWORD_ROUTES: Routes = {
	'input-password': {
		basic: InputPasswordBasic,
		'show-password': InputPasswordShowPassword,
	},
};
