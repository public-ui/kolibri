import type { Routes } from '../../shares/types';
import { AbbrBasic } from './basic';
import { AbbrLongForm } from './long-form';
import { AbbrVariants } from './variants';

export const ABBR_ROUTES: Routes = {
	abbr: {
		basic: AbbrBasic,
		'long-form': AbbrLongForm,
		variants: AbbrVariants,
	},
};
