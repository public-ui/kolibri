import { boundaryCountProp } from '../../props/boundary-count';
import { customClassProp } from '../../props/custom-class';
import { pageProp } from '../../props/page';
import { pageSizeProp } from '../../props/page-size';
import { pageSizeOptionsProp } from '../../props/page-size-options';
import { paginationCallbacksProp } from '../../props/pagination-callbacks';
import { paginationHasButtonsProp } from '../../props/pagination-has-buttons';
import { paginationLabelProp } from '../../props/pagination-label';
import { paginationMaxProp } from '../../props/pagination-max';
import { siblingCountProp } from '../../props/sibling-count';
import { tooltipAlignProp } from '../../props/tooltip-align';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

/**
 * `page` and `pageSize` hold the clamped page and the page size resolved against the options, not the
 * raw props.
 */
export const paginationPropsConfig = {
	required: [pageProp, paginationCallbacksProp, paginationMaxProp],
	optional: [
		boundaryCountProp,
		customClassProp,
		pageSizeOptionsProp,
		pageSizeProp,
		paginationHasButtonsProp,
		paginationLabelProp,
		siblingCountProp,
		tooltipAlignProp,
	],
} as const satisfies PropsConfigShape;

export type PaginationApi = ApiFromConfig<
	typeof paginationPropsConfig,
	{
		Callbacks: {
			/** A page button or a navigation button was clicked; `page` is its target page. */
			pageClick: (event: Event, page: number) => void;
			/** The page size select changed. */
			pageSizeChange: (event: Event, value: unknown) => void;
		};
	}
>;
