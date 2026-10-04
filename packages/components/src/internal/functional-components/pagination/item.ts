import { translate } from '../../../i18n';
import type { CustomClassPropType, KoliBriPaginationButtonCallbacks, PaginationHasButton, Stringified, TooltipAlignPropType } from '../../../schema';
import { STATE_CHANGE_EVENT } from '../../../schema';
import { dispatchDomEvent, KolEvent } from '../../../utils/events';
import { addNavLabel, removeNavLabel } from '../../../utils/unique-nav-labels';
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
import { buildDefaultPropsFromConfig } from '../props-from-config';
import { paginationPropsConfig } from './api';
import type { PaginationFCProps } from './component';
import { clampPage, getPageCount, resolvePageSize } from './model';

/** The render props of the pagination, as `PaginationFC` receives them. */
export type PaginationRenderProps = Omit<PaginationFCProps, 'handlePageClick' | 'handlePageSizeChange' | 'navigationCallbacks'>;

/** Where the item keeps its render props; `kol-pagination` passes its own render props. */
export type PaginationPropsStore = {
	get<K extends keyof PaginationRenderProps>(key: K): PaginationRenderProps[K];
	set<K extends keyof PaginationRenderProps>(key: K, value: PaginationRenderProps[K]): void;
};

/** The `_`-props of a pagination, without the underscore. */
export type PaginationInput = {
	boundaryCount?: number;
	customClass?: CustomClassPropType;
	hasButtons?: boolean | Stringified<PaginationHasButton>;
	label?: string;
	max?: number;
	on?: KoliBriPaginationButtonCallbacks;
	page?: number;
	pageSize?: number;
	pageSizeOptions?: Stringified<number[]>;
	siblingCount?: number;
	tooltipAlign?: TooltipAlignPropType;
};

/**
 * The order in which `update` applies changed inputs: the attribute order in which `kol-table-stateful`
 * passes them. Within one update, an earlier input clamps the page before a later one is applied.
 */
const UPDATE_ORDER: (keyof PaginationInput)[] = [
	'boundaryCount',
	'customClass',
	'hasButtons',
	'on',
	'page',
	'pageSize',
	'pageSizeOptions',
	'siblingCount',
	'tooltipAlign',
	'max',
	'label',
];

export type PaginationItem = {
	applyBoundaryCount: (value?: number) => void;
	applyCustomClass: (value?: CustomClassPropType) => void;
	/** An object sets single buttons and keeps the others. */
	applyHasButtons: (value?: boolean | Stringified<PaginationHasButton>) => void;
	applyLabel: (value?: string) => void;
	applyMax: (value?: number) => void;
	applyOn: (value?: KoliBriPaginationButtonCallbacks) => void;
	applyPage: (value?: number) => void;
	/** Applies `_pageSize`; it also becomes the page size a choice in the select is compared against. */
	applyPageSize: (value?: number) => void;
	applyPageSizeOptions: (value?: Stringified<number[]>) => void;
	applySiblingCount: (value?: number) => void;
	applyTooltipAlign: (value?: TooltipAlignPropType) => void;
	/**
	 * Applies all inputs in the load order of the element. The page is applied again last: only then are
	 * page size and number of entries known to clamp it, so a clamped page is reported twice.
	 */
	load: (input: PaginationInput) => void;
	/**
	 * Applies the inputs that differ from the last passed ones, like the props of a child element in a
	 * render: a value passed again unchanged is not applied, even if the item changed it meanwhile.
	 */
	update: (input: PaginationInput) => void;
	/** Fully resolved props for `PaginationFC` and `PaginationContentFC`. */
	getFcProps: () => PaginationFCProps;
	/** Removes the navigation label from the register of unique labels. */
	destroy: () => void;
};

export type PaginationItemOptions = {
	/** Element the `click`, `changepage` and `changepagesize` events are dispatched on. */
	getEventTarget: () => HTMLElement | undefined;
	/** Renders the embedding element again after a page size was chosen in the select. */
	requestRender: () => void;
	/** Keeps the render props; without it the item keeps them itself. */
	store?: PaginationPropsStore;
};

const createLocalStore = (): PaginationPropsStore => {
	const props = buildDefaultPropsFromConfig(paginationPropsConfig) as unknown as PaginationRenderProps;
	return {
		get: (key) => props[key],
		set: (key, value) => {
			props[key] = value;
		},
	};
};

/**
 * One orchestrated pagination: the props, the page clamping and the events of `PaginationFC`. It is a
 * plain object with closures, like `popover-button/item.ts`, so `kol-pagination` and
 * `kol-table-stateful` (which inherits the stateless table) compose it instead of inheriting it.
 *
 * Page, page size, page size options and the number of entries depend on each other: every change of
 * one of them clamps the current page to the available pages, and a clamped page is reported through
 * `onChangePage` and `changepage` with the `StateChange` event. Without a value, `page`, `pageSize` and
 * `max` keep the current one.
 */
export const createPaginationItem = (options: PaginationItemOptions): PaginationItem => {
	const store = options.store ?? createLocalStore();
	const translatePagination = translate('kol-pagination');
	let pageSizeValue: number | undefined = 1;
	let applied: PaginationInput = {};

	store.set('label', translatePagination);

	const reportPageChange = (event: Event, page: number): void => {
		setTimeout(() => {
			store.get('on').onChangePage?.(event, page);
			const target = options.getEventTarget();
			if (target) {
				dispatchDomEvent(target, KolEvent.changePage, page);
			}
		});
	};

	const syncPage = (page: number, pageSize: number | undefined, max: number): void => {
		const clamped = clampPage(page, pageSize, max);
		if (clamped !== undefined) {
			store.set('page', clamped);
			reportPageChange(STATE_CHANGE_EVENT, clamped);
		}
	};

	const applyPageSizeValue = (value?: number): void => {
		if (value === undefined || value === null) {
			return;
		}
		pageSizeProp.apply(value, (pageSize) => {
			const resolved = resolvePageSize(pageSize, store.get('pageSizeOptions'));
			store.set('pageSize', resolved);
			syncPage(store.get('page'), resolved, store.get('max'));
		});
	};

	const applyLabel = (value: string | undefined, initial: boolean): void => {
		if (!initial) {
			removeNavLabel(store.get('label'));
		}
		paginationLabelProp.apply(value ?? translatePagination, (v) => store.set('label', v));
		addNavLabel(store.get('label'));
	};

	const handlePageClick = (event: Event, page: number): void => {
		store.get('on').onClick?.(event, page);
		const target = options.getEventTarget();
		if (target) {
			dispatchDomEvent(target, KolEvent.click, page);
		}
		reportPageChange(event, page);
	};

	const handlePageSizeChange = (event: Event, value: unknown): void => {
		const pageSize = parseInt(value as string);
		if (pageSize > 0 && pageSizeValue !== pageSize) {
			applyPageSizeValue(pageSize);
			pageSizeValue = pageSize;
			options.requestRender();
			// Reports the page size of the element when the timeout runs; it is the chosen one unless `_pageSize` changed meanwhile.
			setTimeout(() => {
				const current = pageSizeValue as number;
				store.get('on').onChangePageSize?.(event, current);
				const target = options.getEventTarget();
				if (target) {
					dispatchDomEvent(target, KolEvent.changePageSize, current);
				}
			});
		}
	};

	/** The targets are read when the button is clicked, from the current page and number of pages. */
	const navigationCallbacks: PaginationFCProps['navigationCallbacks'] = {
		first: { onClick: (event: Event) => handlePageClick(event, 1) },
		last: { onClick: (event: Event) => handlePageClick(event, getPageCount(store.get('max'), store.get('pageSize'))) },
		next: { onClick: (event: Event) => handlePageClick(event, store.get('page') + 1) },
		previous: { onClick: (event: Event) => handlePageClick(event, store.get('page') - 1) },
	};

	const item: PaginationItem = {
		applyBoundaryCount: (value) => boundaryCountProp.apply(value, (v) => store.set('boundaryCount', v)),
		applyCustomClass: (value) => customClassProp.apply(value, (v) => store.set('customClass', v)),
		applyHasButtons: (value) => paginationHasButtonsProp.apply(value, (v) => store.set('hasButtons', { ...store.get('hasButtons'), ...v })),
		applyLabel: (value) => applyLabel(value, false),
		applyMax: (value) => {
			if (value === undefined || value === null) {
				return;
			}
			paginationMaxProp.apply(value, (max) => {
				store.set('max', max);
				syncPage(store.get('page'), store.get('pageSize'), max);
			});
		},
		applyOn: (value) => paginationCallbacksProp.apply(value, (v) => store.set('on', v)),
		applyPage: (value) => {
			if (value === undefined || value === null) {
				return;
			}
			pageProp.apply(value, (page) => {
				store.set('page', page);
				syncPage(page, store.get('pageSize'), store.get('max'));
			});
		},
		applyPageSize: (value) => {
			applyPageSizeValue(value);
			pageSizeValue = value;
		},
		/** Without options the page is clamped as if each entry were one page. */
		applyPageSizeOptions: (value) =>
			pageSizeOptionsProp.apply(value, (pageSizeOptions) => {
				store.set('pageSizeOptions', pageSizeOptions);
				let pageSize: number | undefined;
				if (pageSizeOptions.length > 0) {
					pageSize = resolvePageSize(store.get('pageSize'), pageSizeOptions);
					store.set('pageSize', pageSize);
				}
				syncPage(store.get('page'), pageSize, store.get('max'));
			}),
		applySiblingCount: (value) => siblingCountProp.apply(value, (v) => store.set('siblingCount', v)),
		/** Pagination buttons show the tooltip on top by default; the shared prop defaults to `'right'`. */
		applyTooltipAlign: (value) => tooltipAlignProp.apply(value ?? 'top', (v) => store.set('tooltipAlign', v)),
		load: (input) => {
			applied = { ...input };
			item.applyBoundaryCount(input.boundaryCount);
			item.applyCustomClass(input.customClass);
			item.applyHasButtons(input.hasButtons);
			applyLabel(input.label, true);
			item.applyOn(input.on);
			item.applyPage(input.page);
			item.applyPageSize(input.pageSize);
			item.applyPageSizeOptions(input.pageSizeOptions);
			item.applySiblingCount(input.siblingCount);
			item.applyTooltipAlign(input.tooltipAlign);
			item.applyMax(input.max);
			item.applyPage(input.page);
		},
		update: (input) => {
			for (const key of UPDATE_ORDER) {
				if (input[key] !== applied[key]) {
					applied = { ...applied, [key]: input[key] };
					// A page size chosen in the select is the current one: passing it again changes nothing.
					if (key !== 'pageSize' || input.pageSize !== pageSizeValue) {
						appliers[key](input[key] as never);
					}
				}
			}
		},
		getFcProps: () => ({
			boundaryCount: store.get('boundaryCount'),
			customClass: store.get('customClass'),
			handlePageClick,
			handlePageSizeChange,
			hasButtons: store.get('hasButtons'),
			label: store.get('label'),
			max: store.get('max'),
			navigationCallbacks,
			on: store.get('on'),
			page: store.get('page'),
			pageSize: store.get('pageSize'),
			pageSizeOptions: store.get('pageSizeOptions'),
			siblingCount: store.get('siblingCount'),
			tooltipAlign: store.get('tooltipAlign'),
		}),
		destroy: () => removeNavLabel(store.get('label')),
	};

	const appliers: { [K in keyof PaginationInput]-?: (value: PaginationInput[K]) => void } = {
		boundaryCount: item.applyBoundaryCount,
		customClass: item.applyCustomClass,
		hasButtons: item.applyHasButtons,
		label: item.applyLabel,
		max: item.applyMax,
		on: item.applyOn,
		page: item.applyPage,
		pageSize: item.applyPageSize,
		pageSizeOptions: item.applyPageSizeOptions,
		siblingCount: item.applySiblingCount,
		tooltipAlign: item.applyTooltipAlign,
	};

	return item;
};
