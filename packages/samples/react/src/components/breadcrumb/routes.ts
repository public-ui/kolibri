import type { Routes } from '../../shares/types';
import { BreadcrumbBasic } from './basic';
import { BreadcrumbJsonLinks } from './json-links';

export const BREADCRUMB_ROUTES: Routes = {
	breadcrumb: {
		basic: BreadcrumbBasic,
		'json-links': BreadcrumbJsonLinks,
	},
};
