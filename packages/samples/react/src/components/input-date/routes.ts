import type { Routes } from '../../shares/types';
import { InputDateBasic } from './basic';
import { InputDateCopyPaste } from './copy-paste';
import { InputDateOnInputOnChange } from './on-input-on-change';
import { InputDateReset } from './reset';
import { InputDateShowHideMsg } from './show-hide-msg';

export const INPUT_DATE_ROUTES: Routes = {
	'input-date': {
		'on-input-on-change': InputDateOnInputOnChange,
		basic: InputDateBasic,
		'copy-paste': InputDateCopyPaste,
		reset: InputDateReset,
		'show-hide-msg': InputDateShowHideMsg,
	},
};
