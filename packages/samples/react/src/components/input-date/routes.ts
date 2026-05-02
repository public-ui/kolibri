import type { Routes } from '../../shares/types';
import { InputDateBasic } from './basic';
import { InputDateCopyPaste } from './copy-paste';
import { InputDateOnInputOnChange } from './get-value';
import { InputDateReset } from './reset';
import { InputDateShowHideMsg } from './show-hide-msg';

export const INPUT_DATE_ROUTES: Routes = {
	'input-date': {
		basic: InputDateBasic,
		'get-value': InputDateOnInputOnChange,
		'copy-paste': InputDateCopyPaste,
		reset: InputDateReset,
		'show-hide-msg': InputDateShowHideMsg,
	},
};
