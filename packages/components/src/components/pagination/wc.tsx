import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Prop, Watch } from '@stencil/core';

import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { PaginationApi } from '../../internal/functional-components/pagination/api';
import { BasePaginationWebComponent } from '../../internal/functional-components/pagination/base-web-component';
import { PaginationContentFC } from '../../internal/functional-components/pagination/component';
import type {
	CustomClassPropType,
	KoliBriPaginationButtonCallbacks,
	LabelPropType,
	MaxPropType,
	PaginationHasButton,
	Stringified,
	TooltipAlignPropType,
} from '../../schema';

/**
 * Transitional tag for `kol-table-stateful`, which renders it in its own shadow root. It renders the
 * same pagination without a shadow root of its own, writes a page size chosen in the select to its
 * `_pageSize` prop and is deleted once `kol-table-stateful` renders the pagination itself.
 *
 * @internal
 */
@Component({
	tag: 'kol-pagination-wc',
	shadow: false,
})
export class KolPaginationWc extends BasePaginationWebComponent implements WebComponentInterface<PaginationApi> {
	@Element() protected readonly host?: HTMLKolPaginationWcElement;

	protected getPageSizeValue(): number | undefined {
		return this._pageSize;
	}

	protected applyChosenPageSize(value: number): void {
		this._pageSize = value;
	}

	public render(): JSX.Element {
		return (
			<Host class="kol-pagination">
				<PaginationContentFC {...this.getPaginationProps()} />
			</Host>
		);
	}

	/**
	 * Defines the amount of pages to show next to the outer arrow buttons.
	 */
	@Prop() public _boundaryCount?: number = 1;

	/**
	 * Defines the custom class attribute if _variant="custom" is set.
	 */
	@Prop() public _customClass?: CustomClassPropType;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label?: LabelPropType;

	/**
	 * Defines which navigation buttons to render (first, last, next, previous buttons).
	 */
	@Prop() public _hasButtons?: boolean | Stringified<PaginationHasButton> = true;

	/**
	 * Defines the current page.
	 */
	@Prop() public _page!: number;

	/**
	 * Defines the amount of entries to show per page.
	 */
	@Prop({ mutable: true, reflect: false }) public _pageSize = 1;

	/**
	 * Defines the options for the page-size-select.
	 */
	@Prop() public _pageSizeOptions: Stringified<number[]> = [];

	/**
	 * Gibt an, auf welche Callback-Events reagiert werden.
	 */
	@Prop() public _on!: KoliBriPaginationButtonCallbacks;

	/**
	 * Defines the amount of pages to show next to the current page.
	 */
	@Prop() public _siblingCount?: number = 1;

	/**
	 * Defines where to show the Tooltip preferably: top, right, bottom or left.
	 */
	@Prop() public _tooltipAlign?: TooltipAlignPropType = 'top';

	/**
	 * Defines the maximum value of the element.
	 */
	@Prop() public _max!: MaxPropType;

	// --- Watchers ---

	@Watch('_boundaryCount')
	public watchBoundaryCount(value?: number): void {
		this.applyBoundaryCount(value);
	}

	@Watch('_customClass')
	public watchCustomClass(value?: CustomClassPropType): void {
		this.applyCustomClass(value);
	}

	@Watch('_hasButtons')
	public watchHasButtons(value?: boolean | Stringified<PaginationHasButton>): void {
		this.applyHasButtons(value);
	}

	@Watch('_label')
	public watchLabel(value?: LabelPropType): void {
		this.applyLabel(value);
	}

	@Watch('_max')
	public watchMax(value?: MaxPropType): void {
		this.applyMax(value);
	}

	@Watch('_on')
	public watchOn(value?: KoliBriPaginationButtonCallbacks): void {
		this.applyOn(value);
	}

	@Watch('_page')
	public watchPage(value?: number): void {
		this.applyPage(value);
	}

	@Watch('_pageSize')
	public watchPageSize(value?: number): void {
		this.applyPageSize(value);
	}

	@Watch('_pageSizeOptions')
	public watchPageSizeOptions(value?: Stringified<number[]>): void {
		this.applyPageSizeOptions(value);
	}

	@Watch('_siblingCount')
	public watchSiblingCount(value?: number): void {
		this.applySiblingCount(value);
	}

	@Watch('_tooltipAlign')
	public watchTooltipAlign(value?: TooltipAlignPropType): void {
		this.applyTooltipAlign(value);
	}

	// --- Lifecycle ---

	public componentWillLoad(): void {
		this.initPagination();
		this.watchBoundaryCount(this._boundaryCount);
		this.watchCustomClass(this._customClass);
		this.watchHasButtons(this._hasButtons);
		this.applyLabel(this._label, true);
		this.watchOn(this._on);
		this.watchPage(this._page);
		this.watchPageSize(this._pageSize);
		this.watchPageSizeOptions(this._pageSizeOptions);
		this.watchSiblingCount(this._siblingCount);
		this.watchTooltipAlign(this._tooltipAlign);
		this.watchMax(this._max);
		// The page is applied again last: only now are page size and number of entries known to clamp it.
		this.watchPage(this._page);
	}

	public disconnectedCallback(): void {
		this.disconnectPagination();
	}
}
