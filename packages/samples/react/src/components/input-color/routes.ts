import { Routes } from '../../shares/types';
import { InputColorBasic } from './basic';
import { InputColorHideLabel } from './hide-label';

export const INPUT_COLOR_ROUTES: Routes = {
	'input-color': {
		basic: InputColorBasic,
		'hide-label': InputColorHideLabel,
	},
};
