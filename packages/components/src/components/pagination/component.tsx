import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@a11y-ui/core';
import { KoliBriButtonVariant, KoliBriButtonVariantPropState, KoliBriButtonCustomClassPropState, watchTooltipAlignment } from '../../types/button-link';
import { nonce } from '../../utils/dev.utils';
import { parseJson, watchJsonArrayString, watchNumber, watchString, watchValidator } from '../../utils/prop.validators';
import { watchButtonVariant } from '../button/controller';
import { PropAlignment } from '../../types/props';
import { KoliBriPaginationButtonCallbacks } from './types';
import { Stringified } from '../../types/common';
import { Option } from '../../types/input/types';
import { STATE_CHANGE_EVENT } from '../../utils/validator';
import { translate } from '../../i18n';

/**
 * Der HasButton-Typ definiert die Einstellungsmöglichkeiten der speziellen
 * Sprung-Schalter der Pagination.
 */
export type PaginationHasButton = {
	/**
	 * Der First-Button ist der Schalter, um direkt auf die erste Seite zu gelangen.
	 */
	first: boolean;
	/**
	 * Der Last-Button ist der Schalter, um direkt auf die letzte Seite zu gelangen.
	 */
	last: boolean;
	/**
	 * Der Next-Button ist der Schalter, um direkt auf die nächste Seite zu gelangen.
	 */
	next: boolean;
	/**
	 * Der Next-Button ist der Schalter, um direkt auf die vorherige Seite zu gelangen.
	 */
	previous: boolean;
};

/**
 * API
 */
export type RequiredProps = {
	on: KoliBriPaginationButtonCallbacks;
	page: number;
	total: number;
};
export type OptionalProps = KoliBriButtonCustomClassPropState &
	KoliBriButtonVariantPropState & {
		boundaryCount: number;
		hasButtons: boolean | Stringified<PaginationHasButton>;
		pageSize: number;
		pageSizeOptions: Stringified<number[]>;
		siblingCount: number;
		tooltipAlign: PropAlignment;
	};
// export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = KoliBriButtonVariantPropState & {
	boundaryCount: number;
	hasButtons: PaginationHasButton;
	page: number;
	pageSize: number;
	pageSizeOptions: Option<number>[];
	on: KoliBriPaginationButtonCallbacks;
	siblingCount: number;
	total: number;
};
type OptionalStates = KoliBriButtonCustomClassPropState & {
	tooltipAlign: PropAlignment;
};
type States = Generic.Element.Members<RequiredStates, OptionalStates>;

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

@Component({
	tag: 'kol-pagination',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolPagination implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	private readonly nonce = nonce();

	private readonly calcCount = (total: number, pageSize = 1): number => Math.ceil(total / pageSize);

	private readonly getCount = (): number => this.calcCount(this.state._total, this.state._pageSize);

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
					return <span key={`${this.nonce}-el-${page}`}>•••</span>;
				} else {
					return null;
				}
			});

		return (
			<Host>
				<div>
					{this.state._hasButtons.first && (
						<kol-button
							_customClass={this.state._customClass}
							_disabled={this.state._page <= 1}
							_icon={leftDoubleArrowIcon}
							_iconOnly
							_label={translate('kol-page-first')}
							_on={this.onGoToFirst}
							_variant={this.state._variant}
							_tooltipAlign={this.state._tooltipAlign}
						></kol-button>
					)}
					{this.state._hasButtons.previous && (
						<kol-button
							_customClass={this.state._customClass}
							_disabled={this.state._page <= 1}
							_icon={leftSingleArrow}
							_iconOnly
							_label={translate('kol-page-back')}
							_on={this.onGoBackward}
							_variant={this.state._variant}
							_tooltipAlign={this.state._tooltipAlign}
						></kol-button>
					)}
					{pageButtons}
					{this.state._hasButtons.next && (
						<kol-button
							_customClass={this.state._customClass}
							_disabled={count <= this.state._page}
							_icon={rightSingleArrowIcon}
							_iconOnly
							_label={translate('kol-page-next')}
							_on={this.onGoForward}
							_variant={this.state._variant}
							_tooltipAlign={this.state._tooltipAlign}
						></kol-button>
					)}
					{this.state._hasButtons.last && (
						<kol-button
							_customClass={this.state._customClass}
							_disabled={count <= this.state._page}
							_icon={rightDoubleArrowIcon}
							_iconOnly
							_label={translate('kol-page-last')}
							_on={this.onGoToEnd}
							_variant={this.state._variant}
							_tooltipAlign={this.state._tooltipAlign}
						></kol-button>
					)}
				</div>
				{this.state._pageSizeOptions?.length > 0 && (
					<kol-select
						_hideLabel
						_id="pagination-size"
						_list={this.state._pageSizeOptions}
						_on={{
							onChange: this.onChangePageSize,
						}}
						_value={[this.state._pageSize]}
					>
						{translate('kol-entries-per-site')}
					</kol-select>
				)}
			</Host>
		);
	}

	/**
	 * Gibt an, wie viele Seiten neben den am Rand liegenden Pfeil-Schaltern angezeigt werden sollen.
	 */
	@Prop() public _boundaryCount?: number = 1;

	/**
	 * Gibt an, welche Custom-Class übergeben werden soll, wenn _variant="custom" gesetzt ist.
	 */
	@Prop() public _customClass?: string;

	/**
	 * Gibt an, welche Sprung-Schalter sichtbar sein sollen.
	 */
	@Prop() public _hasButtons?: boolean | Stringified<PaginationHasButton>;

	/**
	 * Gibt an, welche Seite aktuell ausgewählt ist.
	 */
	@Prop() public _page!: number;

	/**
	 * Gibt an, wie viele Einträge pro Seite angezeigt werden.
	 */
	@Prop({ mutable: true, reflect: false }) public _pageSize = 1;

	/**
	 * Gibt an, welche Optionen für die Seitenlänge angeboten werden.
	 */
	@Prop() public _pageSizeOptions: Stringified<number[]> = [];

	/**
	 * Gibt an, auf welche Callback-Events reagiert werden.
	 */
	@Prop() public _on!: KoliBriPaginationButtonCallbacks;

	/**
	 * Gibt an, wie viele Seiten neben dem aktuell ausgewählten Seite angezeigt werden.
	 */
	@Prop() public _siblingCount?: number = 1;

	/**
	 * Gibt an, ob der Tooltip oben, rechts, unten oder links angezeigt werden.
	 */
	@Prop() public _tooltipAlign?: PropAlignment = 'top';

	/**
	 * Gibt an, wie viele Einträge mit der Pagination gehandelt werden.
	 */
	@Prop() public _total!: number;

	/**
	 * Gibt an, welche Button-Variante verwendet werden soll.
	 */
	@Prop() public _variant?: KoliBriButtonVariant = 'normal';

	/**
	 * @see: components/abbr/component.tsx (@State)
	 */
	@State() public state: States = {
		_boundaryCount: 1,
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
		_total: 0,
		_variant: 'normal',
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

	private onChangePageSize = (event: Event, value: unknown) => {
		value = parseInt((value as string[])[0]);
		if (typeof value === 'number' && value > 0 && this._pageSize !== value) {
			this._pageSize = value;
			const timeout = setTimeout(() => {
				clearTimeout(timeout);
				if (typeof this.state._on.onChangePageSize === 'function') {
					this.state._on.onChangePageSize(event, this._pageSize);
				}
			});
		}
	};

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
			<kol-button
				key={`${this.nonce}-${page}`}
				_customClass={this.state._customClass}
				_ariaLabel={translate('kol-page-current', { placeholders: { page: page.toFixed(0) } })}
				_label={`${page}`}
				_on={{
					onClick: (event: Event) => {
						this.onClick(event, page);
					},
				}}
				_variant={this.state._variant}
			></kol-button>
		);
	}

	private getSelectedPageButton(page: number): JSX.Element {
		return (
			<kol-button-wc
				class="selected"
				key={`${this.nonce}-selected`}
				_customClass={this.state._customClass}
				_disabled={true}
				_ariaCurrent={true}
				_ariaLabel={translate('kol-page-selected', { placeholders: { page: page.toFixed(0) } })}
				_label={`${page}`}
				_variant={this.state._variant}
			/>
		);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_boundaryCount')
	public validateBoundaryCount(value?: number): void {
		watchNumber(this, '_boundaryCount', Math.max(0, value ?? 1));
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_customClass')
	public validateCustomClass(value?: string): void {
		watchString(this, '_customClass', value, {
			defaultValue: undefined,
		});
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
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
			}
		);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_on')
	public validateOn(value?: KoliBriPaginationButtonCallbacks): void {
		if (typeof value === 'object' && value !== null) {
			this.state = {
				...this.state,
				_on: value,
			};
		}
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_page')
	public validatePage(value?: number): void {
		watchNumber(this, '_page', value, {
			hooks: {
				beforePatch: (_nextValue: unknown, nextState: Map<string, unknown>) => {
					const pageSize = nextState.has('_pageSize') ? (nextState.get('_pageSize') as number) : this.state._pageSize;
					const total = nextState.has('_total') ? (nextState.get('_total') as number) : this.state._total;
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
		const total = nextState.has('_total') ? (nextState.get('_total') as number) : this.state._total;
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

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_pageSize')
	public validatePageSize(value?: number): void {
		watchNumber(this, '_pageSize', value, {
			hooks: {
				beforePatch: this.beforePageSize,
			},
		});
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_pageSizeOptions')
	public validatePageSizeOptions(value?: Stringified<number[]>): void {
		watchJsonArrayString(this, '_pageSizeOptions', (value) => typeof value === 'number', value, undefined, {
			hooks: {
				beforePatch: this.beforePageSizeOptions,
			},
		});
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_siblingCount')
	public validateSiblingCount(value?: number): void {
		watchNumber(this, '_siblingCount', Math.max(0, value ?? 1));
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_total')
	public validateTotal(value?: number): void {
		watchNumber(this, '_total', value, {
			hooks: {
				beforePatch: (_nextValue: unknown, nextState: Map<string, unknown>) => {
					const page = nextState.has('_page') ? (nextState.get('_page') as number) : this.state._page;
					const pageSize = nextState.has('_pageSize') ? (nextState.get('_pageSize') as number) : this.state._pageSize;
					this.syncPage(nextState, page, pageSize, _nextValue as number);
				},
			},
		});
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_tooltipAlign')
	public validateTooltipAlign(value?: PropAlignment): void {
		watchTooltipAlignment(this, '_tooltipAlign', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_variant')
	public validateVariant(value?: KoliBriButtonVariant): void {
		watchButtonVariant(this, '_variant', value);
	}

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		this.validateBoundaryCount(this._boundaryCount);
		this.validateCustomClass(this._customClass);
		this.validateHasButtons(this._hasButtons);
		this.validateOn(this._on);
		this.validatePage(this._page);
		this.validatePageSize(this._pageSize);
		this.validatePageSizeOptions(this._pageSizeOptions);
		this.validateSiblingCount(this._siblingCount);
		this.validateTooltipAlign(this._tooltipAlign);
		this.validateTotal(this._total);
		this.validateVariant(this._variant);

		/**
		 * Die Seite muss als letztes gesetzt werden, da sonst die Seite
		 * nicht korrekt berechnet wird.
		 */
		this.validatePage(this._page);
	}
}
