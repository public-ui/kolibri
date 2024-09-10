import { Routes } from '../../shares/types';
import { InputTextBasic } from './basic';
import { InputTextHideErrors } from './hide-errors';
import { InputTextFormatterDemo } from './text-formatter';

export const INPUT_TEXT_ROUTES: Routes = {
	'input-text': {
		basic: InputTextBasic,
		'hide-errors': InputTextHideErrors,
		'text-formatter': InputTextFormatterDemo,
	},
};
