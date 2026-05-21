import type { Routes } from '../../shares/types';
import { AbbrBasic } from './basic';
import { AbbrFocusable } from './focusable';

export const ABBR_ROUTES: Routes = {
	abbr: {
		basic: AbbrBasic,
		focusable: AbbrFocusable,
	},
};
