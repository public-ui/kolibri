import {
	boundaryCountProp,
	customClassProp,
	labelProp,
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
 *
 * The required slot means per prop (see ARC42, "Requiredness semantics per prop"): `_max` warns about
 * an unset value, without a rescuing fallback — 0 stays the honest empty state of no entries. `_page`
 * and `_on` are a type contract only: an unset `_page` starts on the first page, an unset `_on` keeps
 * the DOM events working, and the empty callbacks object is type-valid, so a warning could not tell
 * the two apart.
 */
export const paginationPropsConfig = {
	required: [labelProp, pageProp, paginationCallbacksProp, paginationMaxProp],
	optional: [boundaryCountProp, customClassProp, pageSizeOptionsProp, pageSizeProp, paginationHasButtonsProp, siblingCountProp, tooltipAlignProp],
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
