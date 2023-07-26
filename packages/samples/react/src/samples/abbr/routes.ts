import { Routes } from '../../shares/types';
import { AbbrAvatar } from './avatar';

import { AbbrBasic } from './basic';

export const ABBR_ROUTES: Routes = {
	abbr: {
		basic: AbbrBasic,
		avatar: AbbrAvatar,
	},
};
