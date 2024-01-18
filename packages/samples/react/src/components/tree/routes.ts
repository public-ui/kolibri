import { Routes } from '../../shares/types';

import { TreeBasic } from './basic';

export const TREE_ROUTES: Routes = {
	tree: {
		'basic/:subPage': TreeBasic,
	},
};
