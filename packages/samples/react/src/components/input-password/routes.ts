import type { Routes } from '../../shares/types';
import { InputPasswordBasic } from './basic';
import { InputPasswordOnInputOnChange } from './get-value';
import { InputPasswordShowPassword } from './show-password';

export const INPUT_PASSWORD_ROUTES: Routes = {
	'input-password': {
		basic: InputPasswordBasic,
		'get-value': InputPasswordOnInputOnChange,
		'show-password': InputPasswordShowPassword,
	},
};
