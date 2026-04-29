import type { Routes } from '../../shares/types';
import { InputFileBasic } from './basic';
import { InputFileOnInputOnChange } from './on-input-on-change';

export const INPUT_FILE_ROUTES: Routes = {
	'input-file': {
		'on-input-on-change': InputFileOnInputOnChange,
		basic: InputFileBasic,
	},
};
