import type { Routes } from '../../shares/types';
import { InputEmailBasic } from './basic';
import { InputEmailOnInputOnChange } from './on-input-on-change';

export const INPUT_EMAIL_ROUTES: Routes = {
	'input-email': {
		'on-input-on-change': InputEmailOnInputOnChange,
		basic: InputEmailBasic,
	},
};
