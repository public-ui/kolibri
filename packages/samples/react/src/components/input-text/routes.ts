import { Routes } from '../../shares/types';
import { InputTextBasic } from './basic';
import { InputTextBlur } from './blur';
import { InputTextFocus } from './focus';
import { InputTextHideErrors } from './hide-errors';

export const INPUT_TEXT_ROUTES: Routes = {
	'input-text': {
		basic: InputTextBasic,
		blur: InputTextBlur,
		focus: InputTextFocus,
		'hide-errors': InputTextHideErrors,
	},
};
