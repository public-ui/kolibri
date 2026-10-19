import type { Routes } from '../../shares/types';
import { SingleSelectBasic } from './basic';
import { SingleSelectOnInputOnChange } from './get-value';
import { SingleSelectLazyLoaded } from './lazy-loaded';
import { SingleSelectOptionValues } from './option-values';

export const SINGLE_SELECT_ROUTES: Routes = {
	'single-select': {
		basic: SingleSelectBasic,
		'get-value': SingleSelectOnInputOnChange,
		'lazy-loaded': SingleSelectLazyLoaded,
		'option-values': SingleSelectOptionValues,
	},
};
