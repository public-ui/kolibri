import type { Routes } from '../../shares/types';
import { SingleSelectBasic } from './basic';
import { SingleSelectLazyLoaded } from './lazy-loaded';
import { SingleSelectOnInputOnChange } from './on-input-on-change';

export const SINGLE_SELECT_ROUTES: Routes = {
	'single-select': {
		'on-input-on-change': SingleSelectOnInputOnChange,
		basic: SingleSelectBasic,
		'lazy-loaded': SingleSelectLazyLoaded,
	},
};
