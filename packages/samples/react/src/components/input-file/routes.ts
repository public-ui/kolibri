import type { Routes } from '../../shares/types';
import { InputFileBasic } from './basic';
import { InputFileOnInputOnChange } from './get-value';
import { InputFileWithFile } from './with-file';

export const INPUT_FILE_ROUTES: Routes = {
	'input-file': {
		basic: InputFileBasic,
		'get-value': InputFileOnInputOnChange,
		'with-file': InputFileWithFile,
	},
};
