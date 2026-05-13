import type { Routes } from '../../shares/types';
import { SingleSelectBasic } from './basic';
import { SingleSelectOnInputOnChange } from './get-value';
import { SingleSelectLazyLoaded } from './lazy-loaded';

export const SINGLE_SELECT_ROUTES: Routes = {
	'single-select': {
		basic: SingleSelectBasic,
		'get-value': SingleSelectOnInputOnChange,
		'lazy-loaded': SingleSelectLazyLoaded,
	},
};
