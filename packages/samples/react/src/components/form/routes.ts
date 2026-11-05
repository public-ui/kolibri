import type { Routes } from '../../shares/types';
import { FormBasic } from './basic';
import { FormErrorList } from './error-list';
import { FormErrorListScroll } from './error-list-scroll';
import { FormResetConfirmation } from './reset-confirmation';
import { FormSuccess } from './success';

export const FORM_ROUTES: Routes = {
	form: {
		basic: FormBasic,
		'error-list': FormErrorList,
		'error-list-scroll': FormErrorListScroll,
		'reset-confirmation': FormResetConfirmation,
		success: FormSuccess,
	},
};
