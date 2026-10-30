import { boundaryCountProp } from '../../props/boundary-count';
import { customClassProp } from '../../props/custom-class';
import { labelProp } from '../../props/label';
import { pageProp } from '../../props/page';
import { pageSizeProp } from '../../props/page-size';
import { pageSizeOptionsProp } from '../../props/page-size-options';
import { paginationCallbacksProp } from '../../props/pagination-callbacks';
import { paginationHasButtonsProp } from '../../props/pagination-has-buttons';
import { paginationMaxProp } from '../../props/pagination-max';
import { siblingCountProp } from '../../props/sibling-count';
import { tooltipAlignProp } from '../../props/tooltip-align';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

/**
 * `page` and `pageSize` hold the clamped page and the page size resolved against the options, not the
 * raw props. Without `_label` the pagination uses the translation `kol-pagination` as the label of
 * its navigation landmark.
 */
export const paginationPropsConfig = {
	required: [pageProp, paginationCallbacksProp, paginationMaxProp],
	optional: [boundaryCountProp, customClassProp, labelProp, pageSizeOptionsProp, pageSizeProp, paginationHasButtonsProp, siblingCountProp, tooltipAlignProp],
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
