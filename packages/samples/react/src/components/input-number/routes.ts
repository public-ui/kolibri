import { Routes } from '../../shares/types';
import { InputNumberBasic } from './basic';
import { InputNumberHideLabel } from './hide-label';

export const INPUT_NUMBER_ROUTES: Routes = {
	'input-number': {
		basic: InputNumberBasic,
		'hide-label': InputNumberHideLabel,
	},
};
