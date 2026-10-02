import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';

import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { PaginationApi } from '../../internal/functional-components/pagination/api';
import { paginationPropsConfig } from '../../internal/functional-components/pagination/api';
import { PaginationFC } from '../../internal/functional-components/pagination/component';
import type { PaginationItem, PaginationPropsStore, PaginationRenderProps } from '../../internal/functional-components/pagination/item';
import { createPaginationItem } from '../../internal/functional-components/pagination/item';
import type {
	CustomClassPropType,
	KoliBriPaginationButtonCallbacks,
	LabelPropType,
	MaxPropType,
	PaginationHasButton,
	PaginationProps,
	Stringified,
	TooltipAlignPropType,
} from '../../schema';

@Component({
	tag: 'kol-pagination',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolPagination extends BaseWebComponent<PaginationApi> implements PaginationProps, WebComponentInterface<PaginationApi> {
	@Element() private readonly host?: HTMLKolPaginationElement;

	/** Renders the element again after a page size was chosen in the select; it does not write `_pageSize`. */
	@State() private renderCount = 0;

	private item!: PaginationItem;

	public render(): JSX.Element {
		return (
			<Host>
				<PaginationFC {...this.item.getFcProps()} />
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
		this.item.applyBoundaryCount(value);
	}

	@Watch('_customClass')
	public watchCustomClass(value?: CustomClassPropType): void {
		this.item.applyCustomClass(value);
	}

	@Watch('_hasButtons')
	public watchHasButtons(value?: boolean | Stringified<PaginationHasButton>): void {
		this.item.applyHasButtons(value);
	}

	@Watch('_label')
	public watchLabel(value?: LabelPropType): void {
		this.item.applyLabel(value);
	}

	@Watch('_max')
	public watchMax(value?: MaxPropType): void {
		this.item.applyMax(value);
	}

	@Watch('_on')
	public watchOn(value?: KoliBriPaginationButtonCallbacks): void {
		this.item.applyOn(value);
	}

	@Watch('_page')
	public watchPage(value?: number): void {
		this.item.applyPage(value);
	}

	@Watch('_pageSize')
	public watchPageSize(value?: number): void {
		this.item.applyPageSize(value);
	}

	@Watch('_pageSizeOptions')
	public watchPageSizeOptions(value?: Stringified<number[]>): void {
		this.item.applyPageSizeOptions(value);
	}

	@Watch('_siblingCount')
	public watchSiblingCount(value?: number): void {
		this.item.applySiblingCount(value);
	}

	@Watch('_tooltipAlign')
	public watchTooltipAlign(value?: TooltipAlignPropType): void {
		this.item.applyTooltipAlign(value);
	}

	// --- Lifecycle ---

	public componentWillLoad(): void {
		this.initRenderProps(paginationPropsConfig);
		const store = {
			get: (key: keyof PaginationRenderProps) => this.getRenderProp(key as never),
			set: (key: keyof PaginationRenderProps, value: unknown) => this.setRenderProp(key as never, value as never),
		} as PaginationPropsStore;
		this.item = createPaginationItem({
			getEventTarget: () => this.host,
			requestRender: () => {
				this.renderCount++;
			},
			store,
		});
		this.item.load({
			boundaryCount: this._boundaryCount,
			customClass: this._customClass,
			hasButtons: this._hasButtons,
			label: this._label,
			max: this._max,
			on: this._on,
			page: this._page,
			pageSize: this._pageSize,
			pageSizeOptions: this._pageSizeOptions,
			siblingCount: this._siblingCount,
			tooltipAlign: this._tooltipAlign,
		});
	}

	public disconnectedCallback(): void {
		this.item.destroy();
	}
}
