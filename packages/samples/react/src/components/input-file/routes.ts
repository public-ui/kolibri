import type { Routes } from '../../shares/types';
import { InputFileBasic } from './basic';
import { InputFileDragnDrop } from './drag-and-drop';
import { InputFileOnInputOnChange } from './get-value';
import { InputFileWithFile } from './with-file';

export const INPUT_FILE_ROUTES: Routes = {
	'input-file': {
		basic: InputFileBasic,
		'drag-and-drop': InputFileDragnDrop,
		'get-value': InputFileOnInputOnChange,
		'with-file': InputFileWithFile,
	},
};
