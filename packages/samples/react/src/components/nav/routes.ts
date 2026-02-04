import type { Routes } from '../../shares/types';
import { NavAriaCurrent } from './aria-current';
import { NavBasic } from './basic';

export const NAV_ROUTES: Routes = {
	nav: {
		basic: NavBasic,
		'aria-current': NavAriaCurrent,
	},
};
