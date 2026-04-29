import type { Routes } from '../../shares/types';
import { InputPasswordBasic } from './basic';
import { InputPasswordOnInputOnChange } from './on-input-on-change';
import { InputPasswordShowPassword } from './show-password';

export const INPUT_PASSWORD_ROUTES: Routes = {
	'input-password': {
		'on-input-on-change': InputPasswordOnInputOnChange,
		basic: InputPasswordBasic,
		'show-password': InputPasswordShowPassword,
	},
};
