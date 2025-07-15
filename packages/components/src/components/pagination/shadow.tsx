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

import type { JSX } from '@stencil/core';
import { Component, h, Prop } from '@stencil/core';

import { KolPaginationWcTag } from '../../core/component-names';

@Component({
	tag: 'kol-pagination',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolPagination implements PaginationProps {
	public render(): JSX.Element {
		return (
			<KolPaginationWcTag
				_boundaryCount={this._boundaryCount}
				_label={this._label}
				_customClass={this._customClass}
				_on={this._on}
				_hasButtons={this._hasButtons}
				_page={this._page}
				_pageSize={this._pageSize}
				_pageSizeOptions={this._pageSizeOptions}
				_siblingCount={this._siblingCount}
				_tooltipAlign={this._tooltipAlign}
				_max={this._max}
			></KolPaginationWcTag>
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
	 * Defines the maximum number of pages.
	 */
	@Prop() public _max!: MaxPropType;
}
