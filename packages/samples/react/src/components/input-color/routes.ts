import type { Routes } from '../../shares/types';
import { InputColorBasic } from './basic';
import { InputColorOnInputOnChange } from './on-input-on-change';

export const INPUT_COLOR_ROUTES: Routes = {
	'input-color': {
		'on-input-on-change': InputColorOnInputOnChange,
		basic: InputColorBasic,
	},
};
