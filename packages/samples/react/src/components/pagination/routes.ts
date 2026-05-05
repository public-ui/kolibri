import type { Routes } from '../../shares/types';
import { PaginationBasic } from './basic';
import { PaginationButtonVisibility } from './button-visibility';
import { PaginationSiblingBoundary } from './sibling-boundary';

export const PAGINATION_ROUTES: Routes = {
	pagination: {
		basic: PaginationBasic,
		'button-visibility': PaginationButtonVisibility,
		'sibling-boundary': PaginationSiblingBoundary,
	},
};
