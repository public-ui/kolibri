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
import { BaseWebComponent } from '../base-web-component';
import type { PaginationApi } from './api';
import { paginationPropsConfig } from './api';
import type { PaginationFCProps } from './component';
import { clampPage, getPageCount, resolvePageSize } from './model';

/**
 * Shared orchestrator implementation of `kol-pagination` and the transitional `kol-pagination-wc`.
 *
 * Page, page size, page size options and the number of entries depend on each other: every change of
 * one of them clamps the current page to the available pages, and a clamped page is reported through
 * `onChangePage` and `changepage` with the `StateChange` event. Without a value, `_page`, `_pageSize`
 * and `_max` keep the current one. The concrete element keeps what Stencil has to see in the
 * component class itself (DD16).
 */
export abstract class BasePaginationWebComponent extends BaseWebComponent<PaginationApi> {
	/** The custom element; declared with `@Element()` by the concrete class. It receives the events. */
	protected abstract readonly host?: HTMLElement;

	private readonly translatePagination = translate('kol-pagination');

	/** The `_pageSize` value of the element; a page size change is compared against it. */
	protected abstract getPageSizeValue(): number | undefined;

	/** Takes over a page size chosen in the select, as if `_pageSize` had been set to it. */
	protected abstract applyChosenPageSize(value: number): void;

	protected initPagination(): void {
		this.initRenderProps(paginationPropsConfig);
		this.setRenderProp('label', this.translatePagination);
	}

	// --- Prop application (the concrete element's watchers delegate here) ---

	protected applyBoundaryCount(value?: number): void {
		boundaryCountProp.apply(value, (v) => this.setRenderProp('boundaryCount', v));
	}

	protected applyCustomClass(value?: CustomClassPropType): void {
		customClassProp.apply(value, (v) => this.setRenderProp('customClass', v));
	}

	/** An object sets single buttons and keeps the others. */
	protected applyHasButtons(value?: boolean | Stringified<PaginationHasButton>): void {
		paginationHasButtonsProp.apply(value, (v) => this.setRenderProp('hasButtons', { ...this.getRenderProp('hasButtons'), ...v }));
	}

	/** Navigation labels are registered to warn about duplicates; `initial` skips removing the previous one. */
	protected applyLabel(value?: string, initial = false): void {
		if (!initial) {
			removeNavLabel(this.getRenderProp('label'));
		}
		paginationLabelProp.apply(value ?? this.translatePagination, (v) => this.setRenderProp('label', v));
		addNavLabel(this.getRenderProp('label'));
	}

	protected applyMax(value?: number): void {
		if (value === undefined || value === null) {
			return;
		}
		paginationMaxProp.apply(value, (max) => {
			this.setRenderProp('max', max);
			this.syncPage(this.getRenderProp('page'), this.getRenderProp('pageSize'), max);
		});
	}

	protected applyOn(value?: KoliBriPaginationButtonCallbacks): void {
		paginationCallbacksProp.apply(value, (v) => this.setRenderProp('on', v));
	}

	protected applyPage(value?: number): void {
		if (value === undefined || value === null) {
			return;
		}
		pageProp.apply(value, (page) => {
			this.setRenderProp('page', page);
			this.syncPage(page, this.getRenderProp('pageSize'), this.getRenderProp('max'));
		});
	}

	protected applyPageSize(value?: number): void {
		if (value === undefined || value === null) {
			return;
		}
		pageSizeProp.apply(value, (pageSize) => {
			const resolved = resolvePageSize(pageSize, this.getRenderProp('pageSizeOptions'));
			this.setRenderProp('pageSize', resolved);
			this.syncPage(this.getRenderProp('page'), resolved, this.getRenderProp('max'));
		});
	}

	/** Without options the page is clamped as if each entry were one page. */
	protected applyPageSizeOptions(value?: Stringified<number[]>): void {
		pageSizeOptionsProp.apply(value, (options) => {
			this.setRenderProp('pageSizeOptions', options);
			let pageSize: number | undefined;
			if (options.length > 0) {
				pageSize = resolvePageSize(this.getRenderProp('pageSize'), options);
				this.setRenderProp('pageSize', pageSize);
			}
			this.syncPage(this.getRenderProp('page'), pageSize, this.getRenderProp('max'));
		});
	}

	protected applySiblingCount(value?: number): void {
		siblingCountProp.apply(value, (v) => this.setRenderProp('siblingCount', v));
	}

	/** Pagination buttons show the tooltip on top by default; the shared prop defaults to `'right'`. */
	protected applyTooltipAlign(value?: TooltipAlignPropType): void {
		tooltipAlignProp.apply(value ?? 'top', (v) => this.setRenderProp('tooltipAlign', v));
	}

	protected disconnectPagination(): void {
		removeNavLabel(this.getRenderProp('label'));
	}

	private syncPage(page: number, pageSize: number | undefined, max: number): void {
		const clamped = clampPage(page, pageSize, max);
		if (clamped !== undefined) {
			this.setRenderProp('page', clamped);
			this.reportPageChange(STATE_CHANGE_EVENT, clamped);
		}
	}

	// --- Events ---

	private reportPageChange(event: Event, page: number): void {
		setTimeout(() => {
			this.getRenderProp('on').onChangePage?.(event, page);
			if (this.host) {
				dispatchDomEvent(this.host, KolEvent.changePage, page);
			}
		});
	}

	private readonly handlePageClick = (event: Event, page: number): void => {
		this.getRenderProp('on').onClick?.(event, page);
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.click, page);
		}
		this.reportPageChange(event, page);
	};

	private readonly handlePageSizeChange = (event: Event, value: unknown): void => {
		const pageSize = parseInt(value as string);
		if (pageSize > 0 && this.getPageSizeValue() !== pageSize) {
			this.applyChosenPageSize(pageSize);
			// Reports the page size of the element when the timeout runs; it is the chosen one unless `_pageSize` changed meanwhile.
			setTimeout(() => {
				const current = this.getPageSizeValue() as number;
				this.getRenderProp('on').onChangePageSize?.(event, current);
				if (this.host) {
					dispatchDomEvent(this.host, KolEvent.changePageSize, current);
				}
			});
		}
	};

	/** The targets are read when the button is clicked, from the current page and number of pages. */
	private readonly navigationCallbacks: PaginationFCProps['navigationCallbacks'] = {
		first: { onClick: (event: Event) => this.handlePageClick(event, 1) },
		last: { onClick: (event: Event) => this.handlePageClick(event, getPageCount(this.getRenderProp('max'), this.getRenderProp('pageSize'))) },
		next: { onClick: (event: Event) => this.handlePageClick(event, this.getRenderProp('page') + 1) },
		previous: { onClick: (event: Event) => this.handlePageClick(event, this.getRenderProp('page') - 1) },
	};

	// --- Render ---

	protected getPaginationProps(): PaginationFCProps {
		return {
			boundaryCount: this.getRenderProp('boundaryCount'),
			customClass: this.getRenderProp('customClass'),
			handlePageClick: this.handlePageClick,
			handlePageSizeChange: this.handlePageSizeChange,
			hasButtons: this.getRenderProp('hasButtons'),
			label: this.getRenderProp('label'),
			max: this.getRenderProp('max'),
			navigationCallbacks: this.navigationCallbacks,
			on: this.getRenderProp('on'),
			page: this.getRenderProp('page'),
			pageSize: this.getRenderProp('pageSize'),
			pageSizeOptions: this.getRenderProp('pageSizeOptions'),
			siblingCount: this.getRenderProp('siblingCount'),
			tooltipAlign: this.getRenderProp('tooltipAlign'),
		};
	}
}
