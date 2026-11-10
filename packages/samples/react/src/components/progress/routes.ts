import type { Routes } from '../../shares/types';
import { ProgressBasic } from './basic';
import { ProgressChanging } from './changing';
import { ProgressDynamic } from './dynamic';

export const PROGRESS_ROUTES: Routes = {
	progress: {
		basic: ProgressBasic,
		changing: ProgressChanging,
		dynamic: ProgressDynamic,
	},
};
