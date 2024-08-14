import type {
	CustomClassPropType,
	KoliBriPaginationButtonCallbacks,
	LabelPropType,
	MaxPropType,
	Option,
	PaginationAPI,
	PaginationHasButton,
	PaginationStates,
	Stringified,
	TooltipAlignPropType,
} from '../../schema';
import {
	parseJson,
	STATE_CHANGE_EVENT,
	validateCustomClass,
	validateLabel,
	validateMax,
	validateTooltipAlign,
	watchJsonArrayString,
	watchNumber,
	watchValidator,
} from '../../schema';
import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, State, Watch } from '@stencil/core';

import { translate } from '../../i18n';
import { nonce } from '../../utils/dev.utils';
import { addNavLabel, removeNavLabel } from '../../utils/unique-nav-labels';
import { KolButtonWcTag, KolSplitButtonTag, KolMenuWcTag } from '../../core/component-names';

const leftDoubleArrowIcon = {
	left: 'codicon codicon-debug-reverse-continue',
};
const leftSingleArrow = {
	left: 'codicon codicon-chevron-left',
};
const rightSingleArrowIcon = {
	right: 'codicon codicon-chevron-right',
};
const rightDoubleArrowIcon = {
	right: 'codicon codicon-debug-continue',
};

function getUserLanguage(): string {
	const userLanguage = navigator.language || 'de-DE';
	const normalizedLanguage = userLanguage.includes('-') ? userLanguage : `${userLanguage}-${userLanguage.toUpperCase()}`;
	return normalizedLanguage;
}
const userLanguage = getUserLanguage();
const NUMBER_FORMATTER = new Intl.NumberFormat(userLanguage, {
	style: 'decimal',
	minimumFractionDigits: 0,
	maximumFractionDigits: 0,
});

@Component({
	tag: 'kol-pagination',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolPagination implements PaginationAPI {
	private readonly nonce = nonce();

	private readonly calcCount = (total: number, pageSize = 1): number => Math.ceil(total / pageSize);

	private readonly getCount = (): number => this.calcCount(this.state._max, this.state._pageSize);

	public render(): JSX.Element {
		let ellipsis = false;
		const count = this.getCount();
		const pageButtons = Array.from(Array(count).keys())
			.map((index: number) => index + 1)
			.map((page: number) => {
				if (
					page <= this.state._boundaryCount ||
					page > count - this.state._boundaryCount ||
					(page >= this.state._page - this.state._siblingCount && page <= this.state._page + this.state._siblingCount)
				) {
					ellipsis = true;
					if (this.state._page === page) {
						return this.getSelectedPageButton(page);
					} else {
						return this.getUnselectedPageButton(page);
					}
				} else if (ellipsis === true) {
					ellipsis = false;
					return (
						<li key={nonce()}>
							<span class="separator" aria-hidden="true"></span>
						</li>
					);
				} else {
					return null;
				}
			});

		return (
			<Host class="kol-pagination">
				<nav aria-label={this.state._label}>
					<ul class="navigation-list">
						{this.state._hasButtons.first && (
							<li>
								<KolButtonWcTag
									class="first"
									exportparts="icon"
									_customClass={this.state._customClass}
									_disabled={this.state._page <= 1}
									_icons={leftDoubleArrowIcon}
									_hideLabel
									_label={translate('kol-page-first')}
									_on={this.onGoToFirst}
									_tooltipAlign={this.state._tooltipAlign}
								></KolButtonWcTag>
							</li>
						)}
						{this.state._hasButtons.previous && (
							<li>
								<KolButtonWcTag
									class="previous"
									exportparts="icon"
									_customClass={this.state._customClass}
									_disabled={this.state._page <= 1}
									_icons={leftSingleArrow}
									_hideLabel
									_label={translate('kol-page-back')}
									_on={this.onGoBackward}
									_tooltipAlign={this.state._tooltipAlign}
								></KolButtonWcTag>
							</li>
						)}
						{pageButtons}
						{this.state._hasButtons.next && (
							<li>
								<KolButtonWcTag
									class="next"
									exportparts="icon"
									_customClass={this.state._customClass}
									_disabled={count <= this.state._page}
									_icons={rightSingleArrowIcon}
									_hideLabel
									_label={translate('kol-page-next')}
									_on={this.onGoForward}
									_tooltipAlign={this.state._tooltipAlign}
								></KolButtonWcTag>
							</li>
						)}
						{this.state._hasButtons.last && (
							<li>
								<KolButtonWcTag
									class="last"
									exportparts="icon"
									_customClass={this.state._customClass}
									_disabled={count <= this.state._page}
									_icons={rightDoubleArrowIcon}
									_hideLabel
									_label={translate('kol-page-last')}
									_on={this.onGoToEnd}
									_tooltipAlign={this.state._tooltipAlign}
								></KolButtonWcTag>
							</li>
						)}
					</ul>
				</nav>
				{this.state._pageSizeOptions?.length > 0 && (
					<KolSplitButtonTag _label={`${this.state._pageSize} ${translate('kol-entries-per-site')}`} _id={`pagination-size-${this.nonce}`}>
						<KolMenuWcTag _menuItems={this.state._pageSizeOptions.map((m) => ({ _label: m.label.toString() }))} />
					</KolSplitButtonTag>
				)}
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
	 * Defines the maximum number of pages.
	 */
	@Prop() public _max!: MaxPropType;

	@State() public state: PaginationStates = {
		_boundaryCount: 1,
		_label: translate('kol-pagination'),
		_hasButtons: {
			first: true,
			last: true,
			next: true,
			previous: true,
		},
		_on: {
			onClick: () => null,
		},
		_page: 0,
		_pageSize: 1,
		_pageSizeOptions: [],
		_siblingCount: 1,
		_max: 0,
	};

	private onClick = (event: Event, page: number) => {
		if (typeof this.state._on.onClick === 'function') {
			this.state._on.onClick(event, page);
		}
		this.onChangePage(event, page);
	};

	private onChangePage = (event: Event, page: number) => {
		const timeout = setTimeout(() => {
			clearTimeout(timeout);
			if (typeof this.state._on.onChangePage === 'function') {
				this.state._on.onChangePage(event, page);
			}
		});
	};

	// private onChangePageSize = (event: Event, value: unknown) => {
	// 	if (typeof value === 'number' && value > 0 && this._pageSize !== value) {
	// 		this._pageSize = value;
	// 		const timeout = setTimeout(() => {
	// 			clearTimeout(timeout);
	// 			if (typeof this.state._on.onChangePageSize === 'function') {
	// 				this.state._on.onChangePageSize(event, this._pageSize);
	// 			}
	// 		});
	// 	}
	// };

	private readonly onGoToFirst = {
		onClick: (event: Event) => {
			this.onClick(event, 1);
		},
	};
	private readonly onGoToEnd = {
		onClick: (event: Event) => {
			this.onClick(event, this.getCount());
		},
	};
	private readonly onGoBackward = {
		onClick: (event: Event) => {
			this.onClick(event, this.state._page - 1);
		},
	};
	private readonly onGoForward = {
		onClick: (event: Event) => {
			this.onClick(event, this.state._page + 1);
		},
	};

	private getUnselectedPageButton(page: number): JSX.Element {
		return (
			<li key={nonce()}>
				<KolButtonWcTag
					exportparts="icon"
					_customClass={this.state._customClass}
					_label=""
					_on={{
						onClick: (event: Event) => {
							this.onClick(event, page);
						},
					}}
				>
					<span slot="expert">
						<span class="visually-hidden">{translate('kol-page')}</span> {NUMBER_FORMATTER.format(page)}
					</span>
				</KolButtonWcTag>
			</li>
		);
	}

	private getSelectedPageButton(page: number): JSX.Element {
		return (
			<li key={nonce()}>
				<KolButtonWcTag class="selected" _customClass={this.state._customClass} _disabled={true} _label="">
					<span slot="expert">
						<span class="visually-hidden">{translate('kol-page')}</span> {NUMBER_FORMATTER.format(page)}
					</span>
				</KolButtonWcTag>
			</li>
		);
	}

	@Watch('_boundaryCount')
	public validateBoundaryCount(value?: number): void {
		watchNumber(this, '_boundaryCount', Math.max(0, value ?? 1));
	}

	@Watch('_customClass')
	public validateCustomClass(value?: CustomClassPropType): void {
		validateCustomClass(this, value);
	}

	@Watch('_label')
	public validateLabel(label?: LabelPropType, _oldValue?: LabelPropType, initial = false) {
		if (!initial) {
			removeNavLabel(this.state._label);
		}
		validateLabel(this, label);
		addNavLabel(this.state._label); // add the state instead of prop, because the prop could be invalid and not set as new label
	}

	@Watch('_hasButtons')
	public validateHasButtons(value?: string | boolean | Stringified<PaginationHasButton>): void {
		watchValidator(
			this,
			'_hasButtons',
			(value) => typeof value === 'boolean' || typeof value === 'string' || (typeof value === 'object' && value !== null),
			new Set(['Boolean', 'PaginationHasButton']),
			value,
			{
				hooks: {
					beforePatch: (nextValue: unknown, nextState: Map<string, unknown>) => {
						if (typeof nextValue === 'boolean') {
							nextState.set('_hasButtons', {
								first: nextValue,
								last: nextValue,
								next: nextValue,
								previous: nextValue,
							});
						} else {
							if (typeof nextValue === 'string') {
								try {
									nextValue = parseJson<PaginationHasButton>(nextValue);
								} catch (e) {
									nextState.delete('_hasButtons');
								}
							}

							if (typeof nextValue === 'object' && nextValue !== null) {
								nextState.set('_hasButtons', {
									...this.state._hasButtons,
									first:
										typeof (nextValue as PaginationHasButton).first === 'boolean'
											? (nextValue as PaginationHasButton).first === true
											: this.state._hasButtons.first,
									last:
										typeof (nextValue as PaginationHasButton).last === 'boolean'
											? (nextValue as PaginationHasButton).last === true
											: this.state._hasButtons.last,
									next:
										typeof (nextValue as PaginationHasButton).next === 'boolean'
											? (nextValue as PaginationHasButton).next === true
											: this.state._hasButtons.next,
									previous:
										typeof (nextValue as PaginationHasButton).previous === 'boolean'
											? (nextValue as PaginationHasButton).previous === true
											: this.state._hasButtons.previous,
								});
							}
						}
					},
				},
			},
		);
	}

	@Watch('_on')
	public validateOn(value?: KoliBriPaginationButtonCallbacks): void {
		if (typeof value === 'object' && value !== null) {
			this.state = {
				...this.state,
				_on: value,
			};
		}
	}

	@Watch('_page')
	public validatePage(value?: number): void {
		watchNumber(this, '_page', value, {
			hooks: {
				beforePatch: (_nextValue: unknown, nextState: Map<string, unknown>) => {
					const pageSize = nextState.has('_pageSize') ? (nextState.get('_pageSize') as number) : this.state._pageSize;
					const total = nextState.has('_max') ? (nextState.get('_max') as number) : this.state._max;
					this.syncPage(nextState, _nextValue as number, pageSize, total);
				},
			},
		});
	}

	private beforePageSize = (_nextValue: unknown, nextState: Map<string, unknown>) => {
		let pageSize = nextState.has('_pageSize') ? (nextState.get('_pageSize') as number) : this.state._pageSize;
		const pageSizeOptions = nextState.has('_pageSizeOptions') ? (nextState.get('_pageSizeOptions') as Option<number>[]) : this.state._pageSizeOptions;
		if (Array.isArray(pageSizeOptions) && pageSizeOptions.length > 0) {
			const find = pageSizeOptions.find((option) => option.value === pageSize);
			if (find === undefined) {
				pageSize = pageSizeOptions[0].value;
			} else {
				pageSize = find.value;
			}
			nextState.set('_pageSize', pageSize);
		}
		const page = nextState.has('_page') ? (nextState.get('_page') as number) : this.state._page;
		const total = nextState.has('_max') ? (nextState.get('_max') as number) : this.state._max;
		this.syncPage(nextState, page, nextState.get('_pageSize') as number, total);
	};

	private syncPage = (nextState: Map<string, unknown>, page: number, pageSize: number, total: number) => {
		// count === 0 means no data
		if (total > 0) {
			const count = this.calcCount(total, pageSize);
			if (count > 0) {
				if (page > count) {
					nextState.set('_page', count);
					this.onChangePage(STATE_CHANGE_EVENT, count);
				} else if (page < 1) {
					nextState.set('_page', 1);
					this.onChangePage(STATE_CHANGE_EVENT, 1);
				}
			}
		}
	};

	private beforePageSizeOptions = (nextValue: unknown, nextState: Map<string, unknown>) => {
		const options: Option<number>[] = [];
		if (Array.isArray(nextValue)) {
			for (const value of nextValue) {
				if (typeof value === 'number') {
					options.push({
						label: translate('kol-page-per-site', { placeholders: { entries: `${value}` } }),
						value: value,
					});
				}
			}
		}
		nextState.set('_pageSizeOptions', options);
		this.beforePageSize(options, nextState);
	};

	@Watch('_pageSize')
	public validatePageSize(value?: number): void {
		watchNumber(this, '_pageSize', value, {
			hooks: {
				beforePatch: this.beforePageSize,
			},
		});
	}

	@Watch('_pageSizeOptions')
	public validatePageSizeOptions(value?: Stringified<number[]>): void {
		watchJsonArrayString(this, '_pageSizeOptions', (value) => typeof value === 'number', value, undefined, {
			hooks: {
				beforePatch: this.beforePageSizeOptions,
			},
		});
	}

	@Watch('_siblingCount')
	public validateSiblingCount(value?: number): void {
		watchNumber(this, '_siblingCount', Math.max(0, value ?? 1));
	}

	@Watch('_max')
	public validateMax(value?: MaxPropType): void {
		validateMax(this, value, {
			hooks: {
				beforePatch: (_nextValue: unknown, nextState: Map<string, unknown>) => {
					const page = nextState.has('_page') ? (nextState.get('_page') as number) : this.state._page;
					const pageSize = nextState.has('_pageSize') ? (nextState.get('_pageSize') as number) : this.state._pageSize;
					this.syncPage(nextState, page, pageSize, _nextValue as number);
				},
			},
		});
	}

	@Watch('_tooltipAlign')
	public validateTooltipAlign(value?: TooltipAlignPropType): void {
		validateTooltipAlign(this, value);
	}

	public componentWillLoad(): void {
		this.validateBoundaryCount(this._boundaryCount);
		this.validateCustomClass(this._customClass);
		this.validateHasButtons(this._hasButtons);
		this.validateLabel(this._label, undefined, true);
		this.validateOn(this._on);
		this.validatePage(this._page);
		this.validatePageSize(this._pageSize);
		this.validatePageSizeOptions(this._pageSizeOptions);
		this.validateSiblingCount(this._siblingCount);
		this.validateTooltipAlign(this._tooltipAlign);
		this.validateMax(this._max);

		/**
		 * Die Seite muss als letztes gesetzt werden, da sonst die Seite
		 * nicht korrekt berechnet wird.
		 */
		this.validatePage(this._page);
	}

	public disconnectedCallback(): void {
		removeNavLabel(this.state._label);
	}
}
