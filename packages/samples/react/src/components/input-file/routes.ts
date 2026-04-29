import type { Routes } from '../../shares/types';
import { InputFileBasic } from './basic';
import { InputFileOnInputOnChange } from './get-value';

export const INPUT_FILE_ROUTES: Routes = {
	'input-file': {
		basic: InputFileBasic,
		'get-value': InputFileOnInputOnChange,
	},
};
