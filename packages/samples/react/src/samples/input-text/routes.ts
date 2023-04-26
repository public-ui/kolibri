import { Routes } from '../../shares/types';

import { InputTextBasic } from './basic';
import { InputTextBlur } from './blur';
import { InputTextFocus } from './focus';

import { InputTextHiddenLabel } from './hidden-label';

export const INPUT_TEXT_ROUTES: Routes = {
	'input-text': {
		basic: InputTextBasic,
		'hidden-label': InputTextHiddenLabel,
		blur: InputTextBlur,
		focus: InputTextFocus,
	},
};
