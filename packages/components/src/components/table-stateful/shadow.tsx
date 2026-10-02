import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { KolPaginationWcTag, KolTableStatelessWcTag } from '../../core/component-names';
import { translate } from '../../i18n';
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
import type {
	ChangeHeaderCellsEventPayload,
	FixedColsPropType,
	HasSettingsMenuPropType,
	KoliBriPaginationButtonCallbacks,
	KoliBriTableDataType,
	KoliBriTableHeaderCellWithLogic,
	KoliBriTableHeaders,
	KoliBriTablePaginationProps,
	KoliBriTableSelectionKeys,
	LabelPropType,
	PaginationPositionPropType,
	SortEventPayload,
	Stringified,
	TableAPI,
	TableDataFootPropType,
	TableDataPropType,
	TableHeaderCells,
	TableSelectionPropType,
	TableStatefulCallbacksPropType,
	TableStates,
	VariantClassNamePropType,
} from '../../schema';
import {
	devHint,
	emptyStringByArrayHandler,
	objectObjectHandler,
	parseJson,
	setState,
	validateAllowMultiSort,
	validateFixedCols,
	validateHasSettingsMenu,
	validateLabel,
	validatePaginationPosition,
	validateTableData,
	validateTableDataFoot,
	validateTableSelection,
	validateTableStatefulCallbacks,
	watchValidator,
} from '../../schema';
import { Callback } from '../../schema/enums';
import { validateAriaLabelledby, type AriaLabelledbyPropType } from '../../schema/props/aria-labelledby';
import { attachInternals, type HostInternals } from '../../utils/aria-labelledby';
import { dispatchDomEvent, KolEvent } from '../../utils/events';

const PAGINATION_OPTIONS = [10, 20, 50, 100];

const paginationValidator = (value: unknown) => value === true || value === '' /* true */ || (typeof value === 'object' && value !== null);

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
export class KolTableStateful implements TableAPI {
	@Element() private readonly host?: HTMLKolTableStatefulElement;

	private internals?: HostInternals;

	@State() private resolvedElements: HTMLElement[] = [];

	/**
	 * References an external element by ID that serves as the accessible label for this table.
	 * Uses ElementInternals.ariaLabelledByElements to cross the Shadow DOM boundary.
	 * Supported by desktop screen readers (NVDA, JAWS with Chrome/Firefox).
	 * Not yet supported by mobile screen readers (TalkBack, VoiceOver iOS) — use `_label` instead.
	 */
	@Prop() public _ariaLabelledby?: AriaLabelledbyPropType;

	@Watch('_ariaLabelledby')
	public validateAriaLabelledby(value?: AriaLabelledbyPropType): void {
		this.syncExternalLabel(value);
	}

	private syncExternalLabel(value?: AriaLabelledbyPropType): void {
		this.resolvedElements = validateAriaLabelledby(this, this.host, this.internals, value);
	}

	private tableWcRef?: HTMLKolTableStatelessWcElement;

	private readonly catchRef = (ref?: HTMLKolTableStatelessWcElement) => {
		this.tableWcRef = ref;
	};

	private sortData: SortData[] = [];
	private showPagination = false;
	private pageEndSlice = 10;
	private disableSort = false;

	/**
	 * Holds the header cells adjusted via the settings menu (visibility, width, order). Persisting
	 * them here ensures the customisation survives re-renders triggered by sorting, pagination,
	 * selection or data updates instead of being reset to the original `_headers`. (#10344)
	 */
	@State() private adjustedHeaderCells?: TableHeaderCells;

	/**
	 * Defines whether to allow multi sort.
	 */
	@Prop() public _allowMultiSort?: boolean;

	/**
	 * Defines the primary table data.
	 */
	@Prop() public _data!: Stringified<KoliBriTableDataType[]>;

	/**
	 * Defines the data for the table footer.
	 */
	@Prop() public _dataFoot?: Stringified<KoliBriTableDataType[]>;

	/**
	 * Defines the fixed number of columns from start and end of the table
	 */
	@Prop() public _fixedCols?: FixedColsPropType;

	/**
	 * Defines the horizontal and vertical table headers.
	 */
	@Prop() public _headers!: Stringified<KoliBriTableHeaders>;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: string;

	/**
	 * Wether the table shows a loading spinner (default: false).
	 */
	@Prop() public _loading?: boolean;

	/**
	 * Defines whether to show the data distributed over multiple pages.
	 */
	@Prop() public _pagination?: boolean | Stringified<KoliBriTablePaginationProps>;
	/**
	 * Controls the position of the pagination.
	 */
	@Prop() public _paginationPosition?: PaginationPositionPropType = 'bottom';
	/**
	 * Defines how rows can be selected and the current selection.
	 */
	@Prop() public _selection?: TableSelectionPropType;
	/**
	 * Defines the callback functions for table events.
	 */
	@Prop() public _on?: TableStatefulCallbacksPropType;

	/**
	 * Enables the settings menu if true (default: false).
	 */
	@Prop() public _hasSettingsMenu?: HasSettingsMenuPropType;

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop() public _variant?: VariantClassNamePropType;

	@State() public state: TableStates = {
		_allowMultiSort: false,
		_fixedCols: [0, 0],
		_data: [],
		_dataFoot: [],
		_headers: {
			horizontal: [],
			vertical: [],
		},
		_label: '', // ⚠ required
		_pagination: {
			_page: 1,
			_pageSize: 10,
			_max: 0,
		},
		_sortedData: [],
		_paginationPosition: 'bottom',
		_hasSettingsMenu: false,
	};

	@Watch('_allowMultiSort')
	public validateAllowMultiSort(value?: boolean): void {
		validateAllowMultiSort(this, value, { defaultValue: false });
	}

	@Watch('_data')
	public validateData(value?: TableDataPropType): void {
		validateTableData(this, value, {
			afterPatch: () => {
				// TODO: kein guter Hack (endless loop)
				setTimeout(this.updateSortedData);
			},
		});
	}

	@Watch('_dataFoot')
	public validateDataFoot(value?: TableDataFootPropType): void {
		validateTableDataFoot(this, value, {
			afterPatch: () => {
				setTimeout(this.updateSortedData);
			},
		});
	}

	@Watch('_fixedCols')
	public validateFixedCols(value?: FixedColsPropType) {
		validateFixedCols(this, value);
	}

	@Watch('_paginationPosition')
	public validatePaginationPosition(value?: PaginationPositionPropType): void {
		validatePaginationPosition(this, value);
	}

	@Watch('_hasSettingsMenu')
	public validateHasSettingsMenu(value?: HasSettingsMenuPropType): void {
		validateHasSettingsMenu(this, value);
	}

	private changeCellSort(headerCell: KoliBriTableHeaderCellWithLogic) {
		const sortData = changeCellSort(this.sortData, headerCell, this.state._allowMultiSort);
		if (sortData) {
			this.sortData = sortData;
			this.updateSortedData();
		}
	}

	private initializeSortFromHeaders(headers: KoliBriTableHeaders): boolean {
		const { sortData, hasSortedCells, missingKey } = initializeSortFromHeaders(headers, this.state._allowMultiSort);
		if (missingKey) {
			devHint(`[KolTableStateful] A sortable column requires the 'key' property.`);
		}
		this.sortData = sortData;
		return hasSortedCells;
	}

	@Watch('_headers')
	public validateHeaders(value?: Stringified<KoliBriTableHeaders>): void {
		/**
		 * - es darf maximal ein Header als primary markiert werden (last win)
		 * - der primary-Header entscheidet implizit über _order und _orientation
		 *   - primary-Headers müssen das key-Property setzen
		 *   - nicht primary-Headers müssen das key-Property nicht setzen (wird ignoriert)
		 *   - _order: wird durch den primary-Header geregelt
		 *   - _orientation: wird durch den primary-Header geregelt
		 * - sobald ein Header sortierbar ist, darf es nur noch entweder horizontale
		 *   oder vertikale Header geben, aber nicht mehr beides
		 */
		emptyStringByArrayHandler(value, () => {
			objectObjectHandler(value, () => {
				try {
					value = parseJson<KoliBriTableHeaders>(value);
				} catch {
					// value behält den ursprünglichen Wert
				}
				watchValidator(this, '_headers', (value): boolean => typeof value === 'object' && value !== null, new Set(['KoliBriTableHeaders']), value, {
					hooks: {
						beforePatch: (nextValue: unknown) => {
							const headers: KoliBriTableHeaders = nextValue as KoliBriTableHeaders;
							// Only drop the user's settings when the column structure actually changes. A new
							// object reference with identical keys (common with inline/non-memoized headers in
							// React) must keep the customisation. (#10344)
							if (headerKeysChanged(this.state._headers, headers)) {
								this.adjustedHeaderCells = undefined;
							}
							const hasSortedCells = this.initializeSortFromHeaders(headers);
							if (hasSortedCells) {
								setTimeout(() => this.updateSortedData());
							}

							if (hasHeadersInBothDirections(headers)) {
								this.disableSort = true;
								devHint(
									`Table: You can not sort the table data, if horizontal and vertical headers are defined at the same time. (https://github.com/public-ui/kolibri/issues/2372)`,
								);
							}
						},
					},
				});
			});
		});
	}

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		validateLabel(this, value, {
			required: true,
		});
	}

	@Watch('_selection')
	public validateSelection(value?: TableSelectionPropType): void {
		validateTableSelection(this, value);
	}
	@Watch('_on')
	public validateOn(value?: TableStatefulCallbacksPropType): void {
		validateTableStatefulCallbacks(this, value);
	}

	private readonly handlePagination: KoliBriPaginationButtonCallbacks = {
		onClick: (event: Event, page: number) => {
			if (typeof this.state._pagination._on?.onClick === 'function') {
				this.state._pagination._on.onClick(event, page);
			}
			setState(this, '_pagination', {
				...this.state._pagination,
				_page: page,
			});
		},
		onChangePage: (event: Event, page: number) => {
			if (typeof this.state._pagination._on?.onChangePage === 'function') {
				this.state._pagination._on.onChangePage(event, page);
			}
			setState(this, '_pagination', {
				...this.state._pagination,
				_page: page,
			});
		},
		onChangePageSize: (event: Event, pageSize: number) => {
			if (typeof this.state._pagination._on?.onChangePageSize === 'function') {
				this.state._pagination._on.onChangePageSize(event, pageSize);
			}
			setState(this, '_pagination', {
				...this.state._pagination,
				_pageSize: pageSize,
			});
			setState(this, '_pageSize', pageSize);
		},
	};

	@Watch('_pagination')
	public validatePagination(value?: boolean | Stringified<KoliBriTablePaginationProps>): void {
		try {
			value = parseJson<boolean | KoliBriTablePaginationProps>(value);
		} catch {
			// value behält den ursprünglichen Wert
		}

		this.showPagination = paginationValidator(value);

		watchValidator<boolean | Stringified<KoliBriTablePaginationProps>>(
			this,
			'_pagination',
			paginationValidator,
			new Set(['boolean', 'KoliBriTablePagination']),
			value,
			{
				defaultValue: {
					_page: 1,
					_pageSize: 10,
					_max: 0,
				},
			},
		);
	}

	private onSelectionChange = (event: Event): void => {
		/* Stop propagation for selectionChange event from table-stateless component because table-stateful emits its own selectionChange event. */
		event.stopPropagation();
	};

	public componentDidLoad(): void {
		this.tableWcRef?.addEventListener(KolEvent.selectionChange, this.onSelectionChange);
		// Re-resolve after mount to avoid depending on timer-based retries.
		if (!this.resolvedElements.length) {
			this.syncExternalLabel(this._ariaLabelledby);
		}
	}

	public disconnectedCallback(): void {
		this.tableWcRef?.removeEventListener(KolEvent.selectionChange, this.onSelectionChange);
	}

	public componentWillLoad(): void {
		this.internals = attachInternals(this.host);
		// Early resolution: if the external element is already in the DOM (common when the
		// label element is rendered before this component), the first render already uses
		// externalLabelElements so the AT sees the correct name from the start.
		this.syncExternalLabel(this._ariaLabelledby);

		this.validateAllowMultiSort(this._allowMultiSort);
		this.validateData(this._data);
		this.validateDataFoot(this._dataFoot);
		this.validateFixedCols(this._fixedCols);
		this.validateHeaders(this._headers);
		this.validateLabel(this._label);
		this.validateOn(this._on);
		this.validatePagination(this._pagination);
		this.validatePaginationPosition(this._paginationPosition);
		this.validateSelection(this._selection);
		this.validateHasSettingsMenu(this._hasSettingsMenu);
	}

	private selectDisplayedData(data: KoliBriTableDataType[], pageSize: number, page: number): KoliBriTableDataType[] {
		const { rows, end } = selectDisplayedData(data, pageSize, page);
		this.pageEndSlice = end;
		return rows;
	}

	private updateSortedData = () => {
		setState(this, '_sortedData', sortRows(this.state._data, this.sortData, this.disableSort));
	};

	/**
	 * Renders the pagination controls for the table, showing the current visible data range
	 * and providing navigation between different pages.
	 *
	 * @returns {JSX.Element} The rendered pagination controls including page range and navigation.
	 */
	private renderPagination(position: 'top' | 'bottom'): JSX.Element {
		const positionLabel = position === 'top' ? translate('kol-pagination-position-top') : translate('kol-pagination-position-bottom');
		const label = translate('kol-table-pagination-label', {
			placeholders: {
				label: `${this.state._label} (${positionLabel})`,
			},
		});
		return (
			<div class={`kol-table-stateful__pagination kol-table-stateful__pagination--${this.state._paginationPosition}`}>
				<div class="kol-table-stateful__pagination-wrapper">
					<KolPaginationWcTag
						_boundaryCount={this.state._pagination._boundaryCount}
						_customClass={this.state._pagination._customClass}
						_hasButtons={this.state._pagination._hasButtons}
						_on={this.handlePagination}
						_page={this.state._pagination._page}
						_pageSize={this.state._pagination._pageSize}
						_pageSizeOptions={this.state._pagination._pageSizeOptions || PAGINATION_OPTIONS}
						_siblingCount={this.state._pagination._siblingCount}
						_tooltipAlign="bottom"
						_max={this.state._pagination._max || this.state._data.length}
						_label={label}
					></KolPaginationWcTag>
				</div>
			</div>
		);
	}

	private handleSort({ key }: SortEventPayload) {
		const headerCell = findHeaderCell(this.state._headers, key);
		if (headerCell) {
			this.changeCellSort(headerCell);
		}
	}

	private getSelectedData(selectedKeys: KoliBriTableSelectionKeys): null | KoliBriTableDataType[] {
		return getSelectedData(this.state._selection, this.state._sortedData, selectedKeys);
	}

	private handleSelectionChange(event: Event, selectedKeys: KoliBriTableSelectionKeys): void {
		const selection = this.state._selection;
		if (selection)
			this.state = {
				...this.state,
				_selection: {
					...selection,
					selectedKeys,
				},
			};
		const selectedData = this.getSelectedData(selectedKeys);

		if (typeof this.state._on?.[Callback.onSelectionChange] === 'function') {
			this.state._on[Callback.onSelectionChange](event, selectedData);
		}
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.selectionChange, selectedData);
		}
	}

	/**
	 * Returns the selected rows.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async getSelection(): Promise<KoliBriTableDataType[] | null> {
		const selectedKeys: KoliBriTableSelectionKeys = this.state._selection?.selectedKeys || [];
		return this.getSelectedData(selectedKeys);
	}

	/**
	 * Resets the sort state to the default values defined in the `_headers` prop.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async resetSort(): Promise<void> {
		this.initializeSortFromHeaders(this.state._headers);
		this.updateSortedData();
	}

	/**
	 * Stores the header cells the user adjusted via the settings menu so they are reapplied on the
	 * next render. Called from the `onChangeHeaderCells` callback of the stateless table. (#10344)
	 */
	private readonly handleChangeHeaderCells = (headerCells: ChangeHeaderCellsEventPayload): void => {
		this.adjustedHeaderCells = headerCells;
	};

	private buildHeaderCells(): TableHeaderCells {
		return buildHeaderCells(this.state._headers, this.adjustedHeaderCells, this.sortData, this.disableSort, this.state._allowMultiSort);
	}

	public render(): JSX.Element {
		const displayedData: KoliBriTableDataType[] = this.selectDisplayedData(
			this.state._sortedData,
			this.showPagination ? (this.state._pagination?._pageSize ?? 10) : this.state._sortedData.length,
			this.state._pagination._page || 1,
		);
		const paginationTop = this._paginationPosition === 'top' || this._paginationPosition === 'both' ? this.renderPagination('top') : null;
		const paginationBottom = this._paginationPosition === 'bottom' || this._paginationPosition === 'both' ? this.renderPagination('bottom') : null;

		const headers: TableHeaderCells = this.buildHeaderCells();
		return (
			<Host class="kol-table-stateful">
				{this.pageEndSlice > 0 && this.showPagination && paginationTop}
				<KolTableStatelessWcTag
					externalLabelElements={this.resolvedElements}
					ref={this.catchRef}
					_data={displayedData}
					_fixedCols={this._fixedCols}
					_headers={headers}
					_label={this.state._label}
					_loading={this._loading}
					_dataFoot={this.state._dataFoot}
					_on={{
						onSort: (_: MouseEvent, payload: SortEventPayload) => {
							this.handleSort(payload);
						},
						onSelectionChange: (event: Event, value: KoliBriTableSelectionKeys) => {
							this.handleSelectionChange(event, value);
						},
						onChangeHeaderCells: (_event: Event, headerCells: ChangeHeaderCellsEventPayload) => {
							this.handleChangeHeaderCells(headerCells);
						},
					}}
					_selection={this.state._selection}
					_hasSettingsMenu={this.state._hasSettingsMenu}
					_variant={this._variant}
				/>
				{this.pageEndSlice > 0 && this.showPagination && paginationBottom}
			</Host>
		);
	}
}
