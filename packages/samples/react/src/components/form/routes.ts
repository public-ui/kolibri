import type { Routes } from '../../shares/types';
import { FormBasic } from './basic';
import { FormErrorList } from './error-list';
import { FormErrorListScroll } from './error-list-scroll';

export const FORM_ROUTES: Routes = {
	form: {
		basic: FormBasic,
		'error-list': FormErrorList,
		'error-list-scroll': FormErrorListScroll,
	},
};
