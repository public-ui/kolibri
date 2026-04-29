import type { Routes } from '../../shares/types';
import { InputColorBasic } from './basic';
import { InputColorOnInputOnChange } from './get-value';

export const INPUT_COLOR_ROUTES: Routes = {
	'input-color': {
		basic: InputColorBasic,
		'get-value': InputColorOnInputOnChange,
	},
};
