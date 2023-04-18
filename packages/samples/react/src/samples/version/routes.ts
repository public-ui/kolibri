import { Routes } from '../../shares/types';

import { VersionBasic } from './basic';

import { VersionContext } from './context';

export const VERSION_ROUTES: Routes = {
	version: {
		basic: VersionBasic,
		context: VersionContext,
	},
};
