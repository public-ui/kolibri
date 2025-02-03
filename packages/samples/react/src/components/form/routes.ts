import { Routes } from '../../shares/types';
import { FormBasic } from './basic';
import { FormErrorList } from './error-list';

export const FORM_ROUTES: Routes = {
	form: {
		basic: FormBasic,
		'error-list': FormErrorList,
	},
};
