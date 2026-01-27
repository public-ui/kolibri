import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Prop, Watch } from '@stencil/core';
import type { KoliBriPaginationButtonCallbacks, PaginationHasButton, Stringified, TooltipAlignPropType } from '../../schema';
import { dispatchDomEvent } from '../../utils/events';
import { PaginationFC } from '../_skeleton/internal/functional-components/pagination/component';
import { PaginationController } from '../_skeleton/internal/functional-components/pagination/controller';
import type { BoundaryCountPropType } from '../_skeleton/internal/schema/props/boundary-count';
import type { CustomClassPropType } from '../_skeleton/internal/schema/props/custom-class';
import type { LabelPropType } from '../_skeleton/internal/schema/props/label';
import type { MaxPropType } from '../_skeleton/internal/schema/props/max';
import type { PagePropType } from '../_skeleton/internal/schema/props/page';
import type { PageSizePropType } from '../_skeleton/internal/schema/props/page-size';
import type { SiblingCountPropType } from '../_skeleton/internal/schema/props/sibling-count';

@Component({
	tag: 'kol-pagination-wc',
	shadow: false,
})
export class KolPaginationWc {
	@Element() private readonly host?: HTMLKolPaginationElement;

	private readonly ctrl = new PaginationController({
		dispatchEvent: (type, value) => {
			if (this.host) {
				dispatchDomEvent(this.host, type, value);
			}
		},
		setPageSize: (value) => {
			this._pageSize = value;
		},
	});

	public render(): JSX.Element {
		const props = this.ctrl.getRenderProps();
		return (
			<Host class="kol-pagination">
				<PaginationFC
					{...props}
					handleChangePageSize={this.ctrl.handleChangePageSize}
					handleGoBackward={this.ctrl.handleGoBackward}
					handleGoForward={this.ctrl.handleGoForward}
					handleGoToEnd={this.ctrl.handleGoToEnd}
					handleGoToFirst={this.ctrl.handleGoToFirst}
					handleSelectPage={this.ctrl.handleSelectPage}
					instanceId={this.ctrl.instanceId}
					translateEntriesPerSite={this.ctrl.translateEntriesPerSite}
					translatePage={this.ctrl.translatePage}
					translatePageBack={this.ctrl.translatePageBack}
					translatePageFirst={this.ctrl.translatePageFirst}
					translatePageLast={this.ctrl.translatePageLast}
					translatePageNext={this.ctrl.translatePageNext}
				/>
			</Host>
		);
	}

	/**
	 * Defines the amount of pages to show next to the outer arrow buttons.
	 */
	@Prop() public _boundaryCount?: BoundaryCountPropType = 1;

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
	@Prop() public _page!: PagePropType;

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
	@Prop() public _siblingCount?: SiblingCountPropType = 1;

	/**
	 * Defines where to show the Tooltip preferably: top, right, bottom or left.
	 */
	@Prop() public _tooltipAlign?: TooltipAlignPropType = 'top';

	/**
	 * Defines the maximum value of the element.
	 */
	@Prop() public _max!: MaxPropType;

	@Watch('_boundaryCount')
	public watchBoundaryCount(value?: BoundaryCountPropType): void {
		this.ctrl.watchBoundaryCount(value);
	}

	@Watch('_customClass')
	public watchCustomClass(value?: CustomClassPropType): void {
		this.ctrl.watchCustomClass(value);
	}

	@Watch('_label')
	public watchLabel(value?: LabelPropType): void {
		this.ctrl.watchLabel(value);
	}

	@Watch('_hasButtons')
	public watchHasButtons(value?: boolean | Stringified<PaginationHasButton>): void {
		this.ctrl.watchHasButtons(value);
	}

	@Watch('_on')
	public watchOn(value?: KoliBriPaginationButtonCallbacks): void {
		this.ctrl.watchOn(value);
	}

	@Watch('_page')
	public watchPage(value?: PagePropType): void {
		this.ctrl.watchPage(value);
	}

	@Watch('_pageSize')
	public watchPageSize(value?: PageSizePropType): void {
		this.ctrl.watchPageSize(value);
	}

	@Watch('_pageSizeOptions')
	public watchPageSizeOptions(value?: Stringified<number[]>): void {
		this.ctrl.watchPageSizeOptions(value);
	}

	@Watch('_siblingCount')
	public watchSiblingCount(value?: SiblingCountPropType): void {
		this.ctrl.watchSiblingCount(value);
	}

	@Watch('_tooltipAlign')
	public watchTooltipAlign(value?: TooltipAlignPropType): void {
		this.ctrl.watchTooltipAlign(value);
	}

	@Watch('_max')
	public watchMax(value?: MaxPropType): void {
		this.ctrl.watchMax(value);
	}

	public componentWillLoad(): void {
		this.ctrl.componentWillLoad({
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
		this.ctrl.disconnect();
	}
}
