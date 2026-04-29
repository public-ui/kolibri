import type { Routes } from '../../shares/types';
import { SelectBasic } from './basic';
import { SelectOnInputOnChange } from './on-input-on-change';

export const SELECT_ROUTES: Routes = {
	select: {
		'on-input-on-change': SelectOnInputOnChange,
		basic: SelectBasic,
	},
};
