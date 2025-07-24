import { Routes } from '../../shares/types';
import { InputFileBasic } from './basic';
import { InputFileHideLabel } from './hide-label';

export const INPUT_FILE_ROUTES: Routes = {
	'input-file': {
		basic: InputFileBasic,
		'hide-label': InputFileHideLabel,
	},
};
