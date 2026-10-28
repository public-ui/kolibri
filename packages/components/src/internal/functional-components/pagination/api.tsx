import {
	boundaryCountProp,
	customClassProp,
	optionalLabelProp,
	pageProp,
	pageSizeOptionsProp,
	pageSizeProp,
	paginationCallbacksProp,
	paginationHasButtonsProp,
	paginationMaxProp,
	siblingCountProp,
	tooltipAlignProp,
} from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

/**
 * `page` and `pageSize` hold the clamped page and the page size resolved against the options, not the
 * raw props. Without `_label` the pagination uses the translation `kol-pagination` as the label of
 * its navigation landmark.
 */
export const paginationPropsConfig = {
	required: [pageProp, paginationCallbacksProp, paginationMaxProp],
	optional: [
		boundaryCountProp,
		customClassProp,
		optionalLabelProp,
		pageSizeOptionsProp,
		pageSizeProp,
		paginationHasButtonsProp,
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
