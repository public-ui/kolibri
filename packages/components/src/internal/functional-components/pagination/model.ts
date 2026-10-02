import type { Option } from '../../../schema';

/** Number of pages; without a page size each entry is one page. */
export const getPageCount = (max: number, pageSize = 1): number => Math.ceil(max / pageSize);

/**
 * The page a page outside the range is clamped to, or `undefined` when the page stays. Without entries
 * (`max` 0 or below) every page stays. An `undefined` page size counts as 1.
 */
export const clampPage = (page: number, pageSize: number | undefined, max: number): number | undefined => {
	if (max > 0) {
		const count = getPageCount(max, pageSize);
		if (count > 0) {
			if (page > count) {
				return count;
			}
			if (page < 1) {
				return 1;
			}
		}
	}
	return undefined;
};

/** With page size options, a page size that is not an option falls back to the first option. */
export const resolvePageSize = (pageSize: number, options: Option<number>[]): number => {
	if (options.length > 0) {
		return options.find((option) => option.value === pageSize)?.value ?? options[0].value;
	}
	return pageSize;
};

export type PageItem = { page: number; selected: boolean } | 'separator' | null;

/**
 * One item per page: a page button for the first and last `boundaryCount` pages and `siblingCount`
 * pages on each side of the current page, a separator for the first hidden page after a shown one, and
 * `null` for the other hidden pages. The `null` items keep the positions of the rendered children
 * stable, so a re-render keeps the navigation buttons after the list (and their focus). A gap before the
 * first shown page has no separator.
 */
export const getPageItems = (page: number, count: number, boundaryCount: number, siblingCount: number): PageItem[] => {
	const items: PageItem[] = [];
	let afterPage = false;
	for (let item = 1; item <= count; item++) {
		if (item <= boundaryCount || item > count - boundaryCount || (item >= page - siblingCount && item <= page + siblingCount)) {
			afterPage = true;
			items.push({ page: item, selected: item === page });
		} else if (afterPage) {
			afterPage = false;
			items.push('separator');
		} else {
			items.push(null);
		}
	}
	return items;
};

/** First and last entry of the current page, numbered from 1. */
export const getVisibleRange = (page: number, pageSize: number, max: number): { start: number; end: number } => {
	const highest = page * pageSize;
	return {
		start: Math.max(0, (page - 1) * pageSize + 1),
		end: max < highest ? max : highest,
	};
};
