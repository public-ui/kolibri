import { Routes } from '../../shares/types';

import { InputTextBasic } from './basic';
import { InputTextHideErrors } from './hide-errors';
import { InputTextFocus } from './focus';

export const INPUT_TEXT_ROUTES: Routes = {
	'input-text': {
		basic: InputTextBasic,
		focus: InputTextFocus,
		'hide-errors': InputTextHideErrors,
	},
};
