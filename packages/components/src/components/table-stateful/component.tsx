import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';

import { translate } from '../../i18n';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import { PaginationFC } from '../../internal/functional-components/pagination/component';
import type { PaginationInput, PaginationItem } from '../../internal/functional-components/pagination/item';
import { createPaginationItem } from '../../internal/functional-components/pagination/item';
import type { TableStatefulApi } from '../../internal/functional-components/table-stateful/api';
import type { SortData } from '../../internal/functional-components/table-stateful/model';
import {
	buildHeaderCells,
	changeCellSort,
	findHeaderCell,
	getSelectedData,
	hasHeadersInBothDirections,
	headerKeysChanged,
	initializeSortFromHeaders,
	selectDisplayedData,
	sortRows,
} from '../../internal/functional-components/table-stateful/model';
import {
	allowMultiSortProp,
	paginationPositionProp,
	tableDataFootProp,
	tableDataProp,
	tablePaginationProp,
	tableStatefulCallbacksProp,
	tableStatefulHeadersProp,
} from '../../internal/props';
import type { TablePagination } from '../../internal/props/table-pagination';
import { isTablePaginationShown } from '../../internal/props/table-pagination';
import type {
	ChangeHeaderCellsEventPayload,
	FixedColsPropType,
	HasSettingsMenuPropType,
	KoliBriPaginationButtonCallbacks,
	KoliBriTableDataType,
	KoliBriTableHeaderCell,
	KoliBriTableHeaders,
	KoliBriTablePaginationProps,
	KoliBriTableSelectionKeys,
	LabelPropType,
	PaginationPositionPropType,
	SelectionChangeEventPayload,
	SortEventPayload,
	Stringified,
	TableDataFootPropType,
	TableDataPropType,
	TableHeaderCells,
	TableSelectionPropType,
	TableStatefulCallbacksPropType,
	VariantClassNamePropType,
} from '../../schema';
import { devHint } from '../../schema';
import { Callback } from '../../schema/enums';
import { validateAriaLabelledby, type AriaLabelledbyPropType } from '../../schema/props/aria-labelledby';
import { attachInternals, type HostInternals } from '../../utils/aria-labelledby';
import { dispatchDomEvent, KolEvent } from '../../utils/events';
import { BaseTableStatelessWebComponent } from '../table-stateless/base';

const PAGINATION_OPTIONS = [10, 20, 50, 100];

type PaginationPosition = 'bottom' | 'top';

/**
 * The **Table** component is primarily used for the clear presentation of data sets. It is designed to automatically determine all data-dependent values and render the table accordingly. This includes optional features such as column sorting and pagination.
 */
@Component({
	tag: 'kol-table-stateful',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolTableStateful extends BaseTableStatelessWebComponent implements WebComponentInterface<TableStatefulApi> {
	@Element() protected readonly host?: HTMLKolTableStatefulElement;

	private internals?: HostInternals;

	/** All rows of `_data`; the displayed page is sliced from the sorted rows. */
	private data: KoliBriTableDataType[] = [];
	/** The header cells of `_headers`, as given. */
	private headers: KoliBriTableHeaders = { horizontal: [], vertical: [] };
	private allowMultiSort = false;
	private paginationPosition: PaginationPositionPropType = 'bottom';
	private statefulOn: TableStatefulCallbacksPropType = {};
	private sortData: SortData[] = [];
	/** Sorting is switched off for good once horizontal and vertical headers are defined together. */
	private disableSort = false;
	private showPagination = false;
	/** The end of the displayed slice; the pagination is rendered only while it is above 0. */
	private pageEndSlice = 10;
	/** Top and bottom pagination are independent; each exists while it is rendered. */
	private readonly paginationItems: Partial<Record<PaginationPosition, PaginationItem>> = {};

	/**
	 * The header cells adjusted in the settings menu (visibility, width, order). They are reapplied on
	 * every render, so sorting, paging, selecting or new data keep the adjustments.
	 */
	@State() private adjustedHeaderCells?: TableHeaderCells;

	/** The pagination settings; page and page size follow the pagination. */
	@State() private pagination: TablePagination = { _page: 1, _pageSize: 10, _max: 0 };

	/** Renders the element again after a change that is not held in a prop or a state of its own. */
	@State() private renderCount = 0;

	// --- @State ---

	@State() public externalLabelElements: HTMLElement[] = [];

	@State() public hasScrollbar: boolean = false;

	/**
	 * Not a `@State`: the displayed rows are applied before every render, and a state change there would
	 * start a nested render. The render that follows uses the keys anyway.
	 */
	public rowKeys: Map<KoliBriTableDataType, string> = new Map();

	@State() public settingsChangedCounter: number = 0;

	@State() public sortedData: KoliBriTableDataType[] = [];

	@State() public stickyColsDisabled: boolean = false;

	// --- Props + Watchers ---

	/**
	 * References an external element by ID that serves as the accessible label for this table.
	 * Uses ElementInternals.ariaLabelledByElements to cross the Shadow DOM boundary.
	 * Supported by desktop screen readers (NVDA, JAWS with Chrome/Firefox).
	 * Not yet supported by mobile screen readers (TalkBack, VoiceOver iOS) — use `_label` instead.
	 */
	@Prop() public _ariaLabelledby?: AriaLabelledbyPropType;

	@Watch('_ariaLabelledby')
	public watchAriaLabelledby(value?: AriaLabelledbyPropType): void {
		this.resolveExternalLabel(value);
	}

	/**
	 * Defines whether to allow multi sort.
	 */
	@Prop() public _allowMultiSort?: boolean;

	@Watch('_allowMultiSort')
	public watchAllowMultiSort(value?: boolean): void {
		allowMultiSortProp.apply(value, (v) => {
			this.allowMultiSort = v;
		});
	}

	/**
	 * Defines the primary table data.
	 */
	@Prop() public _data!: Stringified<KoliBriTableDataType[]>;

	@Watch('_data')
	public watchData(value?: TableDataPropType): void {
		tableDataProp.apply(value, (rows) => {
			this.data = rows;
			setTimeout(this.updateSortedData);
		});
	}

	/**
	 * Defines the data for the table footer.
	 */
	@Prop() public _dataFoot?: Stringified<KoliBriTableDataType[]>;

	@Watch('_dataFoot')
	public watchDataFoot(value?: TableDataFootPropType): void {
		tableDataFootProp.apply(value, (rows) => {
			this.setRenderProp('dataFoot', rows);
			setTimeout(this.updateSortedData);
		});
	}

	/**
	 * Defines the fixed number of columns from start and end of the table
	 */
	@Prop() public _fixedCols?: FixedColsPropType;

	@Watch('_fixedCols')
	public watchFixedCols(value?: FixedColsPropType): void {
		this.applyFixedCols(value);
	}

	/**
	 * Defines the horizontal and vertical table headers.
	 */
	@Prop() public _headers!: Stringified<KoliBriTableHeaders>;

	@Watch('_headers')
	public watchHeaders(value?: Stringified<KoliBriTableHeaders>): void {
		tableStatefulHeadersProp.apply(value, (headers) => {
			// Adjusted header cells fit only the same columns. A new object with the same keys (common with
			// inline headers in React) keeps them.
			if (headerKeysChanged(this.headers, headers)) {
				this.adjustedHeaderCells = undefined;
			}
			if (this.initializeSort(headers)) {
				setTimeout(() => this.updateSortedData());
			}
			if (hasHeadersInBothDirections(headers)) {
				this.disableSort = true;
				devHint(
					`Table: You can not sort the table data, if horizontal and vertical headers are defined at the same time. (https://github.com/public-ui/kolibri/issues/2372)`,
				);
			}
			this.headers = headers;
		});
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: string;

	@Watch('_label')
	public watchLabel(value?: LabelPropType): void {
		this.applyLabel(value);
	}

	/**
	 * Wether the table shows a loading spinner (default: false).
	 */
	@Prop() public _loading?: boolean;

	@Watch('_loading')
	public watchLoading(value?: boolean): void {
		this.applyLoading(value);
	}

	/**
	 * Defines whether to show the data distributed over multiple pages.
	 */
	@Prop() public _pagination?: boolean | Stringified<KoliBriTablePaginationProps>;

	@Watch('_pagination')
	public watchPagination(value?: boolean | Stringified<KoliBriTablePaginationProps>): void {
		this.showPagination = isTablePaginationShown(value);
		tablePaginationProp.apply(value, (v) => {
			this.pagination = v;
		});
	}

	/**
	 * Controls the position of the pagination.
	 */
	@Prop() public _paginationPosition?: PaginationPositionPropType = 'bottom';

	@Watch('_paginationPosition')
	public watchPaginationPosition(value?: PaginationPositionPropType): void {
		paginationPositionProp.apply(value, (v) => {
			this.paginationPosition = v;
		});
	}

	/**
	 * Defines how rows can be selected and the current selection.
	 */
	@Prop() public _selection?: TableSelectionPropType;

	@Watch('_selection')
	public watchSelection(value?: TableSelectionPropType): void {
		this.applySelection(value);
	}

	/**
	 * Defines the callback functions for table events.
	 */
	@Prop() public _on?: TableStatefulCallbacksPropType;

	@Watch('_on')
	public watchOn(value?: TableStatefulCallbacksPropType): void {
		tableStatefulCallbacksProp.apply(value, (v) => {
			this.statefulOn = v;
		});
	}

	/**
	 * Enables the settings menu if true (default: false).
	 */
	@Prop() public _hasSettingsMenu?: HasSettingsMenuPropType;

	@Watch('_hasSettingsMenu')
	public watchHasSettingsMenu(value?: HasSettingsMenuPropType): void {
		this.applyHasSettingsMenu(value);
	}

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop() public _variant?: VariantClassNamePropType;

	@Watch('_variant')
	public watchVariant(value?: VariantClassNamePropType): void {
		this.applyVariant(value);
	}

	// --- Methods ---

	/**
	 * Returns the selected rows.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async getSelection(): Promise<KoliBriTableDataType[] | null> {
		return this.getSelectedData((this.getRenderProp('selection') || undefined)?.selectedKeys || []);
	}

	/**
	 * Resets the sort state to the default values defined in the `_headers` prop.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async resetSort(): Promise<void> {
		this.initializeSort(this.headers);
		this.updateSortedData();
	}

	// --- Lifecycle ---

	public componentWillLoad(): void {
		this.initTableRenderProps();
		this.applyOn(this.statelessOn);
		this.internals = attachInternals(this.host);
		// Early resolution: if the external element is already in the DOM, the first render already uses
		// it, so the AT sees the correct name from the start.
		this.resolveExternalLabel(this._ariaLabelledby);

		this.watchAllowMultiSort(this._allowMultiSort);
		this.watchData(this._data);
		this.watchDataFoot(this._dataFoot);
		this.watchFixedCols(this._fixedCols);
		this.watchHeaders(this._headers);
		this.watchLabel(this._label);
		this.watchLoading(this._loading);
		this.watchOn(this._on);
		this.watchPagination(this._pagination);
		this.watchPaginationPosition(this._paginationPosition);
		this.watchSelection(this._selection);
		this.watchHasSettingsMenu(this._hasSettingsMenu);
		this.watchVariant(this._variant);
	}

	/** Derives the displayed rows, the header cells and the paginations before every render. */
	public componentWillRender(): void {
		const { rows, end } = selectDisplayedData(
			this.sortedData,
			this.showPagination ? (this.pagination._pageSize ?? 10) : this.sortedData.length,
			this.pagination._page || 1,
		);
		this.pageEndSlice = end;
		this.applyData(rows);
		this.applyHeaders(this.buildHeaderCells());
		this.syncPagination('top', this._paginationPosition === 'top' || this._paginationPosition === 'both');
		this.syncPagination('bottom', this._paginationPosition === 'bottom' || this._paginationPosition === 'both');
	}

	public componentDidLoad(): void {
		// Re-resolve after mount to avoid depending on timer-based retries.
		if (!this.externalLabelElements.length) {
			this.resolveExternalLabel(this._ariaLabelledby);
		}
		this.observeScrollContainer();
	}

	public componentDidRender(): void {
		this.updateScrollbarState();
	}

	public disconnectedCallback(): void {
		this.teardownTable();
		this.paginationItems.top?.destroy();
		this.paginationItems.bottom?.destroy();
	}

	// --- Listeners ---

	/**
	 * Keeps the adjusted header cells before the stateless table applies them: applying them renders,
	 * and every render derives the header cells from the adjusted ones.
	 */
	@Listen('changeheadercells')
	public onChangeHeaderCells(event: CustomEvent<KoliBriTableHeaderCell[][]>): void {
		this.handleChangeHeaderCells({ ...this.getRenderProp('headers'), horizontal: event.detail });
		this.applyChangedHeaderCells(event);
	}

	@Listen('keydown')
	public onKeydown(event: KeyboardEvent): void {
		this.moveCheckboxFocus(event);
	}

	// --- Sorting ---

	private initializeSort(headers: KoliBriTableHeaders): boolean {
		const { sortData, hasSortedCells, missingKey } = initializeSortFromHeaders(headers, this.allowMultiSort);
		if (missingKey) {
			devHint(`[KolTableStateful] A sortable column requires the 'key' property.`);
		}
		this.sortData = sortData;
		return hasSortedCells;
	}

	private readonly updateSortedData = (): void => {
		this.sortedData = sortRows(this.data, this.sortData, this.disableSort);
	};

	private buildHeaderCells(): TableHeaderCells {
		return buildHeaderCells(this.headers, this.adjustedHeaderCells, this.sortData, this.disableSort, this.allowMultiSort);
	}

	// --- Callbacks of the stateless table ---

	/**
	 * Callbacks of the stateless table. The selection is reported through `emitSelectionChange`, the
	 * adjusted header cells are kept by the `changeheadercells` listener.
	 */
	private readonly statelessOn = {
		onSort: (_event: MouseEvent, { key }: SortEventPayload) => {
			const headerCell = findHeaderCell(this.headers, key);
			if (headerCell) {
				const sortData = changeCellSort(this.sortData, headerCell, this.allowMultiSort);
				if (sortData) {
					this.sortData = sortData;
					this.updateSortedData();
				}
			}
		},
	};

	private readonly handleChangeHeaderCells = (headerCells: ChangeHeaderCellsEventPayload): void => {
		this.adjustedHeaderCells = headerCells;
	};

	// --- Selection ---

	private getSelectedData(selectedKeys: KoliBriTableSelectionKeys): KoliBriTableDataType[] | null {
		return getSelectedData(this.getRenderProp('selection') || undefined, this.sortedData, selectedKeys);
	}

	/** Keeps the selection and reports the selected rows instead of their keys. */
	protected emitSelectionChange(event: Event, payload: SelectionChangeEventPayload): void {
		const selectedKeys = payload;
		const selection = this.getRenderProp('selection');
		if (selection) {
			this.applySelection({ ...selection, selectedKeys });
			this.renderCount++;
		}
		const selectedData = this.getSelectedData(selectedKeys);
		const onSelectionChange = this.statefulOn[Callback.onSelectionChange];
		if (typeof onSelectionChange === 'function') {
			onSelectionChange(event, selectedData);
		}
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.selectionChange, selectedData);
		}
	}

	// --- Pagination ---

	private readonly handlePagination: KoliBriPaginationButtonCallbacks = {
		onClick: (event: Event, page: number) => {
			if (typeof this.pagination._on?.onClick === 'function') {
				this.pagination._on.onClick(event, page);
			}
			this.pagination = { ...this.pagination, _page: page };
		},
		onChangePage: (event: Event, page: number) => {
			if (typeof this.pagination._on?.onChangePage === 'function') {
				this.pagination._on.onChangePage(event, page);
			}
			this.pagination = { ...this.pagination, _page: page };
		},
		onChangePageSize: (event: Event, pageSize: number) => {
			if (typeof this.pagination._on?.onChangePageSize === 'function') {
				this.pagination._on.onChangePageSize(event, pageSize);
			}
			this.pagination = { ...this.pagination, _pageSize: pageSize };
		},
	};

	private getPaginationInput(position: PaginationPosition): PaginationInput {
		const positionLabel = position === 'top' ? translate('kol-pagination-position-top') : translate('kol-pagination-position-bottom');
		return {
			boundaryCount: this.pagination._boundaryCount,
			customClass: this.pagination._customClass,
			hasButtons: this.pagination._hasButtons,
			on: this.handlePagination,
			page: this.pagination._page,
			pageSize: this.pagination._pageSize,
			pageSizeOptions: this.pagination._pageSizeOptions || PAGINATION_OPTIONS,
			siblingCount: this.pagination._siblingCount,
			tooltipAlign: 'bottom',
			max: this.pagination._max || this.data.length,
			label: translate('kol-table-pagination-label', {
				placeholders: {
					label: `${this.getRenderProp('label')} (${positionLabel})`,
				},
			}),
		};
	}

	/** Creates the pagination of a position when it is rendered, updates it while it stays and drops it with its render. */
	private syncPagination(position: PaginationPosition, atPosition: boolean): void {
		const item = this.paginationItems[position];
		if (this.pageEndSlice > 0 && this.showPagination && atPosition) {
			const input = this.getPaginationInput(position);
			if (item) {
				item.update(input);
			} else {
				const created = createPaginationItem({
					getEventTarget: () => this.host,
					requestRender: () => {
						this.renderCount++;
					},
				});
				created.load(input);
				this.paginationItems[position] = created;
			}
		} else if (item) {
			item.destroy();
			delete this.paginationItems[position];
		}
	}

	// --- Labelling ---

	private resolveExternalLabel(value?: AriaLabelledbyPropType): void {
		this.externalLabelElements = validateAriaLabelledby(this, this.host, this.internals, value);
		this.syncTableLabel(this.externalLabelElements);
	}

	// --- Render ---

	private renderPagination(position: PaginationPosition): JSX.Element {
		const item = this.paginationItems[position];
		return (
			item && (
				<div class={`kol-table-stateful__pagination kol-table-stateful__pagination--${this.paginationPosition}`}>
					<div class="kol-table-stateful__pagination-wrapper">
						<PaginationFC {...item.getFcProps()} />
					</div>
				</div>
			)
		);
	}

	public render(): JSX.Element {
		return (
			<Host class="kol-table-stateful">
				{this.renderPagination('top')}
				{this.renderTableStatelessFC()}
				{this.renderPagination('bottom')}
			</Host>
		);
	}
}
