import type { Routes } from '../../shares/types';
import { ProgressBasic } from './basic';
import { ProgressChanging } from './changing';

export const PROGRESS_ROUTES: Routes = {
	progress: {
		basic: ProgressBasic,
		changing: ProgressChanging,
	},
};
