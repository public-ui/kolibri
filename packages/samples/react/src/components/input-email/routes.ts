import type { Routes } from '../../shares/types';
import { InputEmailBasic } from './basic';
import { InputEmailCounter } from './counter';
import { InputEmailOnInputOnChange } from './get-value';

export const INPUT_EMAIL_ROUTES: Routes = {
	'input-email': {
		basic: InputEmailBasic,
		counter: InputEmailCounter,
		'get-value': InputEmailOnInputOnChange,
	},
};
