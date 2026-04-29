import type { Routes } from '../../shares/types';
import { SelectBasic } from './basic';
import { SelectOnInputOnChange } from './get-value';

export const SELECT_ROUTES: Routes = {
	select: {
		basic: SelectBasic,
		'get-value': SelectOnInputOnChange,
	},
};
