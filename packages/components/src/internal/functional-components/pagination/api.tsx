import {
	boundaryCountProp,
	customClassProp,
	pageProp,
	pageSizeOptionsProp,
	pageSizeProp,
	paginationCallbacksProp,
	paginationHasButtonsProp,
	paginationLabelProp,
	paginationMaxProp,
	siblingCountProp,
	tooltipAlignProp,
} from '../../props';
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
