import { Routes } from '../../shares/types';

import { InputTextBasic } from './basic';

import { InputTextHiddenLabel } from './hidden-label';

export const INPUT_TEXT_ROUTES: Routes = {
	'input-text': {
		basic: InputTextBasic,
		'hidden-label': InputTextHiddenLabel,
	},
};
