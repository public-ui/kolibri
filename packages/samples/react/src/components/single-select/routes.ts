import type { Routes } from '../../shares/types';
import { SingleSelectBasic } from './basic';
import { SingleSelectLazyLoaded } from './lazy-loaded';

export const SINGLE_SELECT_ROUTES: Routes = {
	'single-select': {
		basic: SingleSelectBasic,
		'lazy-loaded': SingleSelectLazyLoaded,
	},
};
