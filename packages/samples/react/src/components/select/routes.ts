import type { Routes } from '../../shares/types';
import { SelectBasic } from './basic';
import { SelectPicklist } from './picklist';

export const SELECT_ROUTES: Routes = {
	select: {
		basic: SelectBasic,
		picklist: SelectPicklist,
	},
};
