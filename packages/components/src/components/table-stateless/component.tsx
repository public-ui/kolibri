import type { JSX } from '@stencil/core';
import { Component, Element, Fragment, h, Listen, Prop, State, Watch } from '@stencil/core';

import { isEqual } from 'lodash-es';
import { KolButtonWcTag, KolLinkWcTag, KolTableSettingsWcTag } from '../../core/component-names';
import type { TranslationKey } from '../../i18n';
import { translate } from '../../i18n';
import { IconFC } from '../../internal/functional-components/icon/component';
import { TooltipFC } from '../../internal/functional-components/tooltip/component';
import type {
	ActionColumnHeaderCell,
	AriaSort,
	FixedColsPropType,
	HasSettingsMenuPropType,
	KoliBriTableCell,
	KoliBriTableDataType,
	KoliBriTableHeaderCell,
	KoliBriTableHeaderCellWithLogic,
	KoliBriTableHeaders,
	KoliBriTableRender,
	LabelPropType,
	SelectionChangeEventPayload,
	TableCallbacksPropType,
	TableDataFootPropType,
	TableDataPropType,
	TableHeaderCellsPropType,
	TableSelectionPropType,
	TableStatelessAPI,
	TableStatelessStates,
	VariantClassNamePropType,
} from '../../schema';
import {
	classNameFromVariant,
	Log,
	setState,
	validateFixedCols,
	validateHasSettingsMenu,
	validateLabel,
	validateTableCallbacks,
	validateTableData,
	validateTableDataFoot,
	validateTableHeaderCells,
	validateTableSelection,
	validateVariantClassName,
} from '../../schema';
import { Callback } from '../../schema/enums';
import type { KoliBriTableSelectionKey } from '../../schema/types';
import clsx from '../../utils/clsx';
import { nonce } from '../../utils/dev.utils';
import { dispatchDomEvent, KolEvent } from '../../utils/events';

const RESIZE_DEBOUNCE_DELAY = 150;

/**
 * @internal
 */
@Component({
	tag: 'kol-table-stateless-wc',
	shadow: false,
})
export class KolTableStatelessWc implements TableStatelessAPI {
	@Element() private readonly host?: HTMLKolTableStatelessWcElement;

	private tableRef?: HTMLTableElement;

	private readonly translateNoEntries = translate('kol-no-entries');

	@State() public state: TableStatelessStates = {
		_data: [],
		_headerCells: {
			horizontal: [],
			vertical: [],
		},
		_label: '',
		_hasSettingsMenu: false,
	};

	private tableDivElement?: HTMLDivElement;
	private tableDivElementResizeObserver?: ResizeObserver;
	private horizontal = true;
	private cellsToRenderTimeouts = new Map<HTMLElement, ReturnType<typeof setTimeout>>();
	private dataToKeyMap = new Map<KoliBriTableDataType, string>();

	/** Per-render cache for the computed primary headers, keyed by header object reference. */
	private primaryHeadersCache?: { headers: KoliBriTableHeaders; result: KoliBriTableHeaderCell[]; horizontal: boolean };

	/** Per-render lookup sets for selection state to avoid O(n²) scans of the key arrays per row. */
	private selectedKeysStringSet = new Set<string>();
	private disabledKeysStringSet = new Set<string>();

	private checkboxRefs: HTMLInputElement[] = [];

	private translateSort = translate('kol-sort');
	private translateSortOrder = translate('kol-table-sort-order');

	private maxCols: number = 0;
	private fixedOffsets: number[] = [];
	private resizeDebounceTimeout?: ReturnType<typeof setTimeout>;

	private settingsChangedCounter = 0;

	@State()
	private tableDivElementHasScrollbar = false;

	@State()
	private stickyColsDisabled = false;

	/**
	 * Store previous value to allow change detection by value-comparison
	 */
	@State()
	private previousHeaderCells?: TableHeaderCellsPropType;

	/**
	 * External label elements forwarded from the public wrapper.
	 * @internal Use `_ariaLabelledby` on the public `kol-table-stateless` component instead.
	 */
	@Prop() public externalLabelElements?: HTMLElement[];

	@Watch('externalLabelElements')
	protected onExternalLabelElementsChange(value?: HTMLElement[]): void {
		this.syncTableLabel(value);
	}

	/**
	 * @internal Required by TableStatelessAPI. Actual resolution happens in the shadow wrapper
	 * (kol-table-stateless), which resolves IDs in the correct tree scope and passes the
	 * resulting HTMLElement[] via externalLabelElements.
	 */
	@Prop() public _ariaLabelledby?: string;

	@Watch('_ariaLabelledby')
	public validateAriaLabelledby(): void {
		// no-op — resolution is handled by the shadow wrapper via externalLabelElements
	}

	private syncTableLabel(elements?: HTMLElement[]): void {
		if (!this.tableRef) return;
		if ('ariaLabelledByElements' in this.tableRef) {
			if (elements?.length) {
				this.tableRef.ariaLabelledByElements = elements;
			}
			Log.debug([this.tableRef, !!elements?.length, elements, this.tableRef.ariaLabelledByElements]);
		}
	}

	/**
	 * Defines the primary table data.
	 */
	@Prop() public _data!: TableDataPropType;

	/**
	 * Defines the data for the table footer.
	 */
	@Prop() public _dataFoot?: TableDataFootPropType;

	/**
	 * Defines the fixed number of columns from start and end of the table
	 */
	@Prop() public _fixedCols?: FixedColsPropType;

	/**
	 * Defines the horizontal and vertical table headers.
	 */
	@Prop() public _headerCells!: TableHeaderCellsPropType;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: string;

	/**
	 * Defines the callback functions for table events.
	 */
	@Prop() public _on?: TableCallbacksPropType;

	/**
	 * Defines how rows can be selected and the current selection.
	 */
	@Prop() public _selection?: TableSelectionPropType;

	/**
	 * Defines which variant should be used for presentation.
	 * @internal
	 */
	@Prop() public _variant?: VariantClassNamePropType;

	/**
	 * Enables the settings menu if true (default: false).
	 */
	@Prop() public _hasSettingsMenu?: HasSettingsMenuPropType;

	@Watch('_hasSettingsMenu')
	public validateHasSettingsMenu(value?: HasSettingsMenuPropType): void {
		validateHasSettingsMenu(this, value);
	}

	@Watch('_data')
	public validateData(value?: TableDataPropType) {
		validateTableData(this, value, {
			beforePatch: (nextValue) => {
				this.updateDataToKeyMap(nextValue as KoliBriTableDataType[]);
			},
		});
	}

	@Watch('_dataFoot')
	public validateDataFoot(value?: TableDataFootPropType) {
		validateTableDataFoot(this, value);
	}

	@Watch('_fixedCols')
	public validateFixedCols(value?: FixedColsPropType) {
		validateFixedCols(this, value);
		this.checkAndUpdateStickyState();
	}

	@Watch('_headerCells')
	public validateHeaderCells(value?: TableHeaderCellsPropType) {
		validateTableHeaderCells(this, value);

		/* The reference changes on every render. Only reinitialize settings when headers actually changed */
		if (!isEqual(this.previousHeaderCells, this.state._headerCells)) {
			this.initializeHeaderCellSettings();
		}

		this.previousHeaderCells = this.state._headerCells;
	}

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		validateLabel(this, value, {
			required: true,
		});
	}

	@Watch('_on')
	public validateOn(value?: TableCallbacksPropType): void {
		validateTableCallbacks(this, value);
	}

	@Watch('_selection')
	public validateSelection(value?: TableSelectionPropType): void {
		validateTableSelection(this, value);
		this.checkAndUpdateStickyState();
	}

	@Watch('_variant')
	public validateVariantClassName(value?: VariantClassNamePropType): void {
		validateVariantClassName(this, value);
	}

	@Listen('keydown')
	public handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
			const focusedElement = this.tableDivElement?.querySelector(':focus') as HTMLInputElement;
			let index = this.checkboxRefs.indexOf(focusedElement);

			if (index > -1) {
				event.preventDefault();

				if (event.key === 'ArrowDown') {
					index = (index + 1) % this.checkboxRefs.length;
					this.checkboxRefs[index].focus();
				} else if (event.key === 'ArrowUp') {
					event.preventDefault();
					index = (index + this.checkboxRefs.length - 1) % this.checkboxRefs.length;
					this.checkboxRefs[index].focus();
				}
			}
		}
	}

	public componentDidRender(): void {
		this.checkDivElementScrollbar();
	}

	public componentDidLoad() {
		if (this.tableDivElement && ResizeObserver) {
			this.tableDivElementResizeObserver = new ResizeObserver(this.handleResize.bind(this));
			this.tableDivElementResizeObserver.observe(this.tableDivElement);
		}
		this.checkAndUpdateStickyState();
	}

	@Listen('changeheadercells')
	public handleSettingsChange(event: CustomEvent<KoliBriTableHeaderCell[][]>) {
		const updatedHeaderCells = { ...this.state._headerCells, horizontal: event.detail };
		setState(this, '_headerCells', updatedHeaderCells);
		this.settingsChangedCounter++;

		// Call the onChangeHeaderCells callback if provided
		if (typeof this.state._on?.[Callback.onChangeHeaderCells] === 'function') {
			this.state._on[Callback.onChangeHeaderCells](event, updatedHeaderCells);
		}
	}

	public disconnectedCallback() {
		this.tableDivElementResizeObserver?.disconnect();
		clearTimeout(this.resizeDebounceTimeout);
	}

	private handleResize() {
		this.checkDivElementScrollbar();
		clearTimeout(this.resizeDebounceTimeout);
		this.resizeDebounceTimeout = setTimeout(() => {
			this.checkAndUpdateStickyState();
		}, RESIZE_DEBOUNCE_DELAY);
	}

	private checkDivElementScrollbar() {
		if (this.tableDivElement) {
			this.tableDivElementHasScrollbar = this.tableDivElement.scrollWidth > this.tableDivElement.clientWidth;
		}
	}

	private calculateFixedColsWidth(): number {
		if (!this._fixedCols) return 0;
		const primaryHeader = this.getPrimaryHeaders(this.state._headerCells);
		let totalWidth = 0;

		// Sum widths of left-fixed columns
		for (let i = 0; i < this._fixedCols[0] && i < primaryHeader.length; i++) {
			totalWidth += primaryHeader[i]?.width ?? 0;
		}

		// Sum widths of right-fixed columns
		const startRight = this.maxCols - this._fixedCols[1];
		for (let i = startRight; i < this.maxCols && i < primaryHeader.length; i++) {
			totalWidth += primaryHeader[i]?.width ?? 0;
		}

		// The selection column is always position: sticky; left: 0 (CSS-hardcoded).
		// Its width is CSS-computed and must be measured from the DOM.
		if (this.state._selection) {
			const selectionCell = this.tableDivElement?.querySelector<HTMLElement>('.kol-table__cell--selection');
			totalWidth += selectionCell?.offsetWidth ?? 0;
		}

		return totalWidth;
	}

	private checkAndUpdateStickyState() {
		if (!this.tableDivElement || !this._fixedCols) {
			this.stickyColsDisabled = false;
			return;
		}
		const containerWidth = this.tableDivElement.clientWidth;
		const fixedColsWidth = this.calculateFixedColsWidth();
		this.stickyColsDisabled = fixedColsWidth > 0 && fixedColsWidth >= containerWidth;
	}

	private updateDataToKeyMap(data: KoliBriTableDataType[]) {
		/* Use a Set for O(1) membership checks. Using data.includes() inside the
		 * cleanup loop below would be O(n²) and dominates rendering for large data sets. */
		const dataSet = new Set(data);
		data.forEach((data) => {
			if (!this.dataToKeyMap.has(data)) {
				this.dataToKeyMap.set(data, nonce());
			}
		});

		/* Cleanup old values from map */
		this.dataToKeyMap.forEach((_, key) => {
			if (!dataSet.has(key)) {
				this.dataToKeyMap.delete(key);
			}
		});
	}

	private getDataKey(data: KoliBriTableDataType) {
		return this.dataToKeyMap.get(data);
	}

	/**
	 * Finds the ActionColumnHeaderCell for a given column index.
	 * Returns the action column header if found, otherwise undefined.
	 */
	private getActionColumnHeader(colIndex: number): ActionColumnHeaderCell | undefined {
		const headers = this.horizontal ? this.state._headerCells.horizontal : this.state._headerCells.vertical;
		if (!headers || headers.length === 0) return undefined;

		// Get the primary headers (those with keys)
		const primaryHeader = this.getPrimaryHeaders(this.state._headerCells);
		const header = primaryHeader[colIndex];

		if (header && (header as ActionColumnHeaderCell).type === 'action') {
			return header as ActionColumnHeaderCell;
		}
		return undefined;
	}

	/**
	 * Applies a custom render function to a specific table cell if provided.
	 * Ensures that the content is updated after a delay to avoid excessive re-renders.
	 *
	 * @param {KoliBriTableCell} cell The cell to be rendered, with a possible custom `render` function.
	 * @param {HTMLElement} el The HTML element where the cell is rendered.
	 */
	private cellRender(cell: KoliBriTableCell, el?: HTMLElement): void {
		if (el) {
			clearTimeout(this.cellsToRenderTimeouts.get(el));
			this.cellsToRenderTimeouts.set(
				el,
				setTimeout(() => {
					if (typeof cell.render === 'function') {
						const renderContent = cell.render(el, cell, cell.data, this.state._data);
						if (typeof renderContent === 'string') {
							el.textContent = renderContent;
						}
					}
				}),
			);
		}
	}

	private getNumberOfCols(horizontalHeaders: KoliBriTableHeaderCell[][], data: KoliBriTableDataType[]): number {
		let max = 0;
		horizontalHeaders.forEach((row) => {
			let count = 0;
			if (Array.isArray(row)) {
				row.forEach((col) => {
					count += col.colSpan ?? 1;
				});
			}
			if (max < count) {
				max = count;
			}
		});
		if (max === 0) {
			max = data.length;
		}
		return max;
	}

	private getNumberOfRows(verticalHeaders: KoliBriTableHeaderCell[][], data: KoliBriTableDataType[]): number {
		let max = 0;
		verticalHeaders.forEach((col) => {
			let count = 0;
			if (Array.isArray(col)) {
				col.forEach((row) => {
					count += row.rowSpan ?? 1;
				});
			}
			if (max < count) {
				max = count;
			}
		});
		if (max === 0) {
			max = data.length;
		} else {
			max -= this.state._dataFoot?.length || 0;
		}
		return max;
	}

	private getThePrimaryHeadersWithKeyOrRenderFunction(headers: KoliBriTableHeaderCell[][]): KoliBriTableHeaderCell[] {
		const primaryHeaders: KoliBriTableHeaderCell[] = [];

		headers.forEach((cells) => {
			cells.forEach((cell) => {
				if (typeof cell.key === 'string' || typeof cell.render === 'function') {
					primaryHeaders.push(cell);
				}
			});
		});

		return primaryHeaders;
	}

	private getPrimaryHeaders(headers: KoliBriTableHeaders): KoliBriTableHeaderCell[] {
		/**
		 * Memoize by reference: within a single render the header object is stable, so this
		 * avoids rebuilding the primary-header array for every cell (e.g. via getActionColumnHeader),
		 * which would otherwise be O(rows × cols × headers). The cache invalidates automatically
		 * whenever a new header object is assigned to the state.
		 */
		if (this.primaryHeadersCache?.headers === headers) {
			this.horizontal = this.primaryHeadersCache.horizontal;
			return this.primaryHeadersCache.result;
		}

		let primaryHeaders: KoliBriTableHeaderCell[] = this.getThePrimaryHeadersWithKeyOrRenderFunction(headers.horizontal ?? []);

		/**
		 * It is important to note that the rendering direction of the data is implicitly set,
		 * if either the horizontal or vertical header cells have keys.
		 */
		this.horizontal = true;
		if (primaryHeaders.length === 0) {
			primaryHeaders = this.getThePrimaryHeadersWithKeyOrRenderFunction(headers.vertical ?? []);
			if (primaryHeaders.length > 0) {
				this.horizontal = false;
			}
		}

		this.primaryHeadersCache = { headers, result: primaryHeaders, horizontal: this.horizontal };
		return primaryHeaders;
	}

	private createDataField(data: KoliBriTableDataType[], headers: KoliBriTableHeaders, isFoot?: boolean): (KoliBriTableCell & KoliBriTableDataType)[][] {
		headers.horizontal = Array.isArray(headers?.horizontal) ? headers.horizontal : [];
		headers.vertical = Array.isArray(headers?.vertical) ? headers.vertical : [];

		this.maxCols = this.getNumberOfCols(headers.horizontal, data);
		const primaryHeader = this.getPrimaryHeaders(headers);
		let maxRows = this.getNumberOfRows(headers.vertical, data);
		let startRow = 0;
		if (isFoot) {
			startRow = maxRows;
			maxRows += this.state._dataFoot?.length || 0;
		}
		const dataField: KoliBriTableCell[][] = [];

		const rowCount: number[] = [];
		const rowSpans: number[][] = [];
		headers.vertical.forEach((_row, index) => {
			rowCount[index] = 0;
			rowSpans[index] = [];
		});

		const sortedPrimaryHeader = primaryHeader;

		for (let i = startRow; i < maxRows; i++) {
			const dataRow: KoliBriTableHeaderCellWithLogic[] = [];
			headers.vertical.forEach((headerCells, index) => {
				let rowsTotal = 0;
				rowSpans[index].forEach((value) => (rowsTotal += value));
				if (rowsTotal <= i) {
					const rows = headerCells[i - rowsTotal + rowCount[index]];
					if (typeof rows === 'object') {
						dataRow.push({
							...rows,
							headerCell: true,
							data: {},
						});
						let rowSpan = 1;
						if (typeof rows.rowSpan === 'number' && rows.rowSpan > 1) {
							rowSpan = rows.rowSpan;
						}
						rowSpans[index].push(rowSpan);
						if (typeof rows.colSpan === 'number' && rows.colSpan > 1) {
							for (let k = 1; k < rows.colSpan; k++) {
								rowSpans[index + k].push(rowSpan);
							}
						}
						rowCount[index]++;
					}
				}
			});
			for (let j = 0; j < this.maxCols; j++) {
				let fixed = this.isFixedCol(j);
				if (fixed === 'left') {
					if (this.getFixedOffset(j) === undefined) {
						let offset = this.fixedOffsets[j - 1] ?? 0;
						offset += sortedPrimaryHeader[j - 1]?.width ?? 0;
						this.fixedOffsets[j] = offset;
					}
				}
				if (fixed === 'right') {
					if (this.getFixedOffset(j) === undefined) {
						let offset = this.fixedOffsets[j + 1] ?? 0;
						offset += sortedPrimaryHeader[j + 1]?.width ?? 0;
						this.fixedOffsets[j] = offset;
					}
				}
				if (this.horizontal === true) {
					const row = isFoot && this.state._dataFoot ? this.state._dataFoot[i - startRow] : data[i];
					if (
						typeof sortedPrimaryHeader[j] === 'object' &&
						sortedPrimaryHeader[j] !== null &&
						typeof row === 'object' &&
						row !== null &&
						(typeof sortedPrimaryHeader[j].key === 'string' || typeof sortedPrimaryHeader[j].render === 'function')
					) {
						const cellKey = sortedPrimaryHeader[j].key as unknown as string;
						const cellValue = row[cellKey];

						dataRow.push({
							...sortedPrimaryHeader[j],
							colIndex: j,
							colSpan: undefined,
							rowSpan: undefined,
							data: row,
							label: cellValue as string,
						});
					}
				} else {
					if (
						typeof sortedPrimaryHeader[i] === 'object' &&
						sortedPrimaryHeader[i] !== null &&
						typeof data[j] === 'object' &&
						data[j] !== null &&
						(typeof sortedPrimaryHeader[i].key === 'string' || typeof sortedPrimaryHeader[i].render === 'function')
					) {
						const cellKey = sortedPrimaryHeader[i].key as unknown as number;
						const cellValue = data[j][cellKey];

						dataRow.push({
							...sortedPrimaryHeader[i],
							colIndex: j,
							colSpan: undefined,
							rowSpan: undefined,
							data: data[j],
							label: cellValue as string,
						});
					}
				}
			}
			dataField.push(dataRow);
		}
		if (data.length === 0) {
			let colspan = this.getVisibleColSpan(headers.horizontal?.[0]);
			let rowspan = 0;

			if (Array.isArray(headers.vertical) && headers.vertical.length > 0) {
				colspan -= headers.vertical.length;
				headers.vertical[0].forEach((row) => {
					rowspan += row.rowSpan || 1;
				});
			}
			const emptyCell = {
				colSpan: colspan,
				label: this.translateNoEntries,
				render: undefined,
				rowSpan: Math.max(rowspan, 1),
			};
			if (dataField.length === 0) {
				dataField.push([emptyCell]);
			} else {
				dataField[0].push(emptyCell);
			}
		}
		return dataField;
	}

	private getVisibleColSpan(cells?: Array<KoliBriTableCell | KoliBriTableHeaderCell>): number {
		return (
			cells?.reduce((acc, cell) => {
				if ('visible' in cell && cell.visible === false) {
					return acc;
				}

				return acc + (cell.colSpan || 1);
			}, 0) ?? 0
		);
	}

	private isFixedCol(index: number | undefined): 'left' | 'right' | undefined {
		if (!this._fixedCols || index === undefined || this.stickyColsDisabled) {
			return undefined;
		}
		if (index < this._fixedCols[0]) {
			return 'left';
		}
		if (index >= this.maxCols - this._fixedCols[1]) {
			return 'right';
		}
	}

	private getFixedOffset(index: number | undefined): number | undefined {
		if (!this.tableDivElement || index === undefined) {
			return undefined;
		}

		if (this.fixedOffsets[index] !== undefined) {
			return this.fixedOffsets[index];
		}

		return undefined;
	}

	private getOffsetString(index: number | undefined, left?: boolean): string | undefined {
		if (left && this._selection) {
			return 'calc( var(--kol-table-selection-col-width) + ' + this.getFixedOffset(index) + 'px)';
		}

		return this.getFixedOffset(index) + 'px';
	}

	private handleSelectionChangeCallbackAndEvent(event: Event, payload: SelectionChangeEventPayload) {
		if (typeof this.state._on?.[Callback.onSelectionChange] === 'function') {
			this.state._on[Callback.onSelectionChange](event, payload);
		}
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.selectionChange, payload);
		}
	}

	private initializeHeaderCellSettings() {
		// Update header cells using setState to trigger Stencil's change detection
		if (this.state._headerCells && this.state._headerCells.horizontal && this.state._headerCells.horizontal.length > 0) {
			// Preserve all original header cells (including colSpan, rowSpan, etc.)
			// and only add/update visible and hidable properties
			const updatedHeaderCells = {
				...this.state._headerCells,
				horizontal: this.state._headerCells.horizontal.map((row) =>
					row.map((header) => ({
						...header,
						visible: typeof header.visible === 'boolean' ? header.visible : true,
						hidable: typeof header.hidable === 'boolean' ? header.hidable : true,
					})),
				),
			};
			setState(this, '_headerCells', updatedHeaderCells);
		}
	}

	public componentWillLoad(): void {
		this.validateData(this._data);
		this.validateDataFoot(this._dataFoot);
		this.validateHeaderCells(this._headerCells);
		this.validateLabel(this._label);
		this.validateOn(this._on);
		this.validateSelection(this._selection);
		this.validateHasSettingsMenu(this._hasSettingsMenu);
		this.validateVariantClassName(this._variant);
	}

	/**
	 * Renders the selection cell for a row, either as a checkbox (for multiple selection)
	 * or as a radio button (for single selection). It handles selection states and dispatches
	 * events for selection changes.
	 *
	 * @param {KoliBriTableCell[]} row  The row data containing the cell with selection properties.
	 * @param {number} rowIndex  The index of the row.
	 * @returns {JSX.Element}  The rendered selection cell, either with a checkbox or radio input.
	 */
	private renderSelectionCell(row: (KoliBriTableCell & KoliBriTableDataType)[], rowIndex: number): JSX.Element {
		const selection = this.state._selection;
		if (!selection) return '';
		const keyPropertyName = this.getSelectionKeyPropertyName();
		const firstCellData = row[0]?.data;

		if (!firstCellData) return '';
		const keyProperty = firstCellData[keyPropertyName] as string | number;
		const isMultiple = selection.multiple || selection.multiple === undefined;

		const keyPropertyString = String(keyProperty);
		const selected = this.selectedKeysStringSet.has(keyPropertyString);
		const disabled = this.disabledKeysStringSet.has(keyPropertyString);

		const label = selection.label(firstCellData);
		const props = {
			name: 'selection',
			checked: selected,
			disabled,
			id: String(keyProperty),
			['aria-label']: label,
		};
		return (
			<td key={`tbody-${rowIndex}-selection`} class="kol-table__cell kol-table__cell--selection">
				<div class={clsx('kol-table__selection', { 'kol-table__selection--checked': selected })}>
					{isMultiple ? (
						<label
							class={clsx('kol-table__selection-label', {
								'kol-table__selection-label--disabled': disabled,
							})}
						>
							<IconFC class="kol-table__selection-icon" icons={`kolicon ${selected ? 'kolicon-check' : ''}`} label="" />
							<input
								class={clsx('kol-table__selection-input kol-table__selection-input--checkbox')}
								ref={(el) => el && this.checkboxRefs.push(el)}
								{...props}
								type="checkbox"
								onInput={(event: Event) => {
									const current = (() => {
										const v = selection?.selectedKeys;
										return v === undefined ? [] : Array.isArray(v) ? v : [v];
									})();
									const updatedSelectedKeys = !selected ? [...current, keyProperty] : current.filter((k) => String(k) !== String(keyProperty));

									this.handleSelectionChangeCallbackAndEvent(event, updatedSelectedKeys ?? []);
								}}
							/>
						</label>
					) : (
						<label class="kol-table__selection-label">
							<input
								class={clsx('kol-table__selection-input kol-table__selection-input--radio')}
								{...props}
								type="radio"
								onInput={(event: Event) => {
									this.handleSelectionChangeCallbackAndEvent(event, [keyProperty]);
								}}
							/>
						</label>
					)}
					<div class="kol-table__selection-input-tooltip">
						<TooltipFC label={label} badgeText="" id={`${keyProperty}-label`} refFloating={() => {}} />
					</div>
				</div>
			</td>
		);
	}

	/**
	 * Renders a full table row by mapping over each cell and calling `renderTableCell`.
	 * It also handles the row's unique key generation and selection functionality.
	 *
	 * @param {KoliBriTableCell[]} row  The data for the current row.
	 * @param {number} rowIndex  The index of the current row being rendered.
	 * @param isVertical
	 * @param isFooter
	 * @returns {JSX.Element}  The rendered row with its cells.
	 */
	private readonly renderTableRow = (
		row: (KoliBriTableCell & KoliBriTableDataType)[],
		rowIndex: number,
		isVertical: boolean,
		isFooter: boolean = false,
	): JSX.Element => {
		let key = String(rowIndex);
		if (this.horizontal && row[0]?.data) {
			key = this.getDataKey(row[0].data) ?? key;
		}

		return (
			<tr
				class={clsx('kol-table__row', {
					'kol-table__row--body': !isFooter,
					'kol-table__row--footer': isFooter,
				})}
				key={`row-${key}`}
			>
				{this.renderSelectionCell(row, rowIndex)}
				{row.map((cell, colIndex) => this.renderTableCell(cell, rowIndex, colIndex, isVertical))}
			</tr>
		);
	};

	/**
	 * Renders a table cell, either as a data cell (`<td>`) or a header cell (`<th>`).
	 * If a custom `render` function is provided in the cell, it will be used to display content.
	 *
	 * @param {KoliBriTableCell} cell The cell data, containing label, colSpan, rowSpan, and potential render function.
	 * @param {number} rowIndex  The current row index.
	 * @param {number} colIndex  The current column index.
	 * @returns {JSX.Element}  The rendered table cell (either `<td>` or `<th>`).
	 */
	private readonly renderTableCell = (cell: KoliBriTableCell, rowIndex: number, colIndex: number, isVertical: boolean): JSX.Element => {
		// Skip rendering if the column is not visible
		if ((cell as KoliBriTableHeaderCell).visible === false) {
			return '';
		}

		let key = `${rowIndex}-${colIndex}-${cell.label}`;
		if (cell.data) {
			const dataKey = this.getDataKey(cell.data);
			key = dataKey ? `${dataKey}-${this.horizontal ? colIndex : rowIndex}` : key;
		}

		if ((cell as KoliBriTableHeaderCellWithLogic).headerCell) {
			return this.renderHeadingCell(cell, rowIndex, colIndex, isVertical);
		} else {
			const isNoEntriesHintCell = typeof cell.render !== 'function' && cell.label === this.translateNoEntries;

			// Check if this column is an action column
			const actionColumn = this.getActionColumnHeader(colIndex);
			const isActionColumn = Boolean(actionColumn && cell.data);
			const fixed = this.isFixedCol(colIndex);
			const offsetLeft = fixed === 'left' ? this.getOffsetString(cell.colIndex, true) : undefined;
			const offsetRight = fixed === 'right' ? this.getOffsetString(cell.colIndex) : undefined;
			const hasCustomRender = typeof cell.render === 'function';

			return (
				<td
					// settingsChangedCounter is needed so every cell has a unique key after a settings change and gets rerenderd
					key={`cell-${key}-${this.settingsChangedCounter}`}
					class={clsx(
						'kol-table__cell kol-table__cell--body',
						cell.textAlign && `kol-table__cell--align-${cell.textAlign}`,
						isActionColumn && 'kol-table__cell--actions',
						fixed && `kol-table__cell--sticky-${fixed}`,
					)}
					aria-atomic={isNoEntriesHintCell ? 'false' : undefined}
					aria-live={isNoEntriesHintCell ? 'polite' : undefined}
					aria-relevant={isNoEntriesHintCell ? 'text' : undefined}
					colSpan={cell.colSpan}
					rowSpan={cell.rowSpan}
					style={{
						textAlign: cell.textAlign,
						left: offsetLeft,
						right: offsetRight,
					}}
					ref={
						hasCustomRender
							? (el) => {
									this.cellRender(cell as KoliBriTableHeaderCellWithLogic & { render: KoliBriTableRender }, el);
								}
							: undefined
					}
				>
					{isActionColumn && actionColumn && cell.data ? this.renderActionItems(actionColumn, cell.data, key) : !hasCustomRender ? cell.label : ''}
				</td>
			);
		}
	};

	/**
	 * Renders action items (buttons or links) for a table cell.
	 * Uses the ActionColumnHeaderCell factory function to generate actions based on row data.
	 *
	 * @param {ActionColumnHeaderCell} actionColumn The action column header definition.
	 * @param {KoliBriTableDataType} rowData The data for the current row.
	 * @param {string} key Unique key for the cell.
	 * @returns {JSX.Element} The rendered action items wrapped in a container.
	 */
	private readonly renderActionItems = (actionColumn: ActionColumnHeaderCell, rowData: KoliBriTableDataType, key: string): JSX.Element => {
		const actions = actionColumn.actions(rowData);

		return (
			<div class="kol-table__cell-actions">
				{actions.map((action, actionIndex) => {
					if (action.type === 'button') {
						const { ...buttonProps } = action;
						return <KolButtonWcTag key={`action-${key}-${actionIndex}`} {...buttonProps} _variant={buttonProps._variant} />;
					} else if (action.type === 'link') {
						const { ...linkProps } = action;
						return <KolLinkWcTag key={`action-${key}-${actionIndex}`} {...linkProps} />;
					}
					return null;
				})}
			</div>
		);
	};

	private getSelectionKeyPropertyName(): string {
		return this.state._selection?.keyPropertyName ?? 'id';
	}

	private static normalizeKeys(value?: KoliBriTableSelectionKey | KoliBriTableSelectionKey[]): KoliBriTableSelectionKey[] {
		return value === undefined ? [] : Array.isArray(value) ? value : [value];
	}

	/**
	 * Rebuilds the per-render lookup sets for the current selection. Doing this once per render
	 * allows O(1) membership checks per row instead of scanning the full key arrays for every row,
	 * which would otherwise be O(rows × keys).
	 */
	private updateSelectionKeySets() {
		this.selectedKeysStringSet = new Set(KolTableStatelessWc.normalizeKeys(this.state._selection?.selectedKeys).map(String));
		this.disabledKeysStringSet = new Set(KolTableStatelessWc.normalizeKeys(this.state._selection?.disabledKeys).map(String));
	}

	private getDataWithSelectionEnabled() {
		const keyPropertyName = this.getSelectionKeyPropertyName();
		return this.state._data.filter((item) => !this.disabledKeysStringSet.has(String(item[keyPropertyName] as KoliBriTableSelectionKey)));
	}

	private getSelectedKeysWithoutDisabledKeys() {
		return KolTableStatelessWc.normalizeKeys(this.state._selection?.selectedKeys).filter((k) => !this.disabledKeysStringSet.has(String(k)));
	}

	private getSelectedKeysWithDisabledKeysOnly() {
		return KolTableStatelessWc.normalizeKeys(this.state._selection?.selectedKeys).filter((k) => this.disabledKeysStringSet.has(String(k)));
	}

	private getRevertedSelection(selectAll: boolean) {
		const keyPropertyName = this.getSelectionKeyPropertyName();
		const selection = this.getSelectedKeysWithDisabledKeysOnly() ?? []; // Always include already selected, but disabled, rows.

		if (selectAll) {
			selection.push(...this.getDataWithSelectionEnabled().map((el) => el?.[keyPropertyName] as KoliBriTableSelectionKey)); // add all enabled rows
		}

		return selection;
	}

	/**
	 * Calculates and returns the minimum width for a table based on its settings and columns' visibility and widths.
	 * Includes the selection column width when selection is enabled.
	 *
	 * When multiple header rows exist, widths from ALL rows are summed. This allows developers to either:
	 * - Specify the width on merged (parent) columns for equal distribution of child columns
	 * - Specify widths on individual (child) columns for more control
	 *
	 * Note: If widths are specified on both parent and child columns, all widths are summed,
	 * which may result in a wider table than expected.
	 *
	 * @return {string} The minimum width of the table as a string based on the sum of all header widths.
	 */
	private getTableMinWidth(): string {
		// Collect widths from ALL horizontal header rows (including parent/merged rows)
		const horizontalHeaders = this.state._headerCells.horizontal ?? [];
		const horizontalHeaderWidths: number[] = [];
		horizontalHeaders.forEach((row) => {
			row.forEach((cell) => {
				if (cell.visible !== false && cell.width !== undefined && cell.width > 0) {
					horizontalHeaderWidths.push(cell.width);
				}
			});
		});

		// Calculate width from ALL vertical headers (all rows, not just first cell)
		const verticalHeaders = this.state._headerCells.vertical ?? [];
		const verticalHeaderWidths: number[] = [];
		verticalHeaders.forEach((column) => {
			column.forEach((cell) => {
				if (cell.width !== undefined && cell.width > 0) {
					verticalHeaderWidths.push(cell.width);
				}
			});
		});

		const allWidths = [...verticalHeaderWidths, ...horizontalHeaderWidths];

		if (allWidths.length === 0) {
			return '0px';
		}
		if (allWidths.length === 1) {
			return `${allWidths[0]}px`;
		}
		return `calc(${allWidths.map((w) => `${w}px`).join(' + ')})`;
	}

	/**
	 * Renders the header cell for row selection. This cell contains a checkbox for selecting
	 * all rows when selection is enabled. If multiple selection is allowed, the checkbox allows
	 * selecting/deselecting all rows at once. It also supports an indeterminate state
	 * if only some rows are selected.
	 *
	 * @returns {JSX.Element} - The rendered header cell containing the selection checkbox.
	 */
	private renderHeadingSelectionCell(): JSX.Element {
		const selection = this.state._selection;

		if (!selection) {
			return <td class="kol-table__cell kol-table__cell--header" key={`thead-0`}></td>;
		}

		if (selection.multiple === false) {
			return (
				<th scope="col" key={`thead-0-selection`} class="kol-table__cell kol-table__cell--header kol-table__cell--selection">
					<span class="visually-hidden">{translate('kol-table-selection')}</span>
				</th>
			);
		}

		const selectedKeyLength = this.getSelectedKeysWithoutDisabledKeys()?.length ?? 0;
		const dataLength = this.getDataWithSelectionEnabled().length;
		const isChecked = selectedKeyLength === dataLength;
		const indeterminate = selectedKeyLength !== 0 && !isChecked;
		let translationKey = 'kol-table-selection-indeterminate' as TranslationKey;
		if (isChecked && !indeterminate) {
			translationKey = 'kol-table-selection-none';
		}
		if (selectedKeyLength === 0) {
			translationKey = 'kol-table-selection-all';
		}
		const label = translate(translationKey);
		return (
			<th scope="col" key={`thead-0-selection`} class="kol-table__cell kol-table__cell--header kol-table__cell--selection">
				<span class="visually-hidden">{translate('kol-table-selection')}</span>
				<div
					class={clsx('kol-table__selection', {
						'kol-table__selection--indeterminate': indeterminate,
						'kol-table__selection--checked': isChecked,
					})}
				>
					<label class="kol-table__selection-label">
						<IconFC class="kol-table__selection-icon" icons={`kolicon ${indeterminate ? 'kolicon-minus' : isChecked ? 'kolicon-check' : ''}`} label="" />
						<input
							class={clsx('kol-table__selection-input kol-table__selection-input--checkbox')}
							data-testid="selection-checkbox-all"
							ref={(el) => el && this.checkboxRefs.push(el)}
							name="selection"
							checked={isChecked && !indeterminate}
							indeterminate={indeterminate}
							aria-label={label}
							type="checkbox"
							onInput={(event: Event) => {
								this.handleSelectionChangeCallbackAndEvent(event, this.getRevertedSelection(!isChecked));
							}}
						/>
					</label>
					<div class="kol-table__selection-input-tooltip">
						<TooltipFC label={label} badgeText="" id={`${translationKey}-label`} refFloating={() => {}} />
					</div>
				</div>
			</th>
		);
	}

	/**
	 * This header cell is rendered as a TD element when in addition to the horizontal header rows
	 * there are also vertical header columns. In this case, the cell is rendered blank above the
	 * vertical header columns.
	 *
	 * The width is calculated from the first cell of each vertical header column to ensure
	 * proper column widths with table-layout: fixed.
	 */
	private renderHeaderTdCell(): JSX.Element {
		const horizontalHeaders = this.state._headerCells.horizontal;
		const verticalHeaders = this.state._headerCells.vertical;

		if (!Array.isArray(horizontalHeaders) || horizontalHeaders.length === 0 || !Array.isArray(verticalHeaders) || verticalHeaders.length === 0) {
			return <Fragment></Fragment>;
		}

		// Calculate total width from the first cell of each vertical header column
		const totalWidth = verticalHeaders.reduce((sum, column) => {
			const firstCell = column?.[0];
			return sum + (firstCell?.width ?? 0);
		}, 0);

		return (
			<td
				aria-hidden="true"
				colSpan={verticalHeaders.length}
				rowSpan={horizontalHeaders.length}
				style={totalWidth > 0 ? { width: `${totalWidth}px` } : undefined}
			></td>
		);
	}

	/**
	 *  Renders a table header cell (`<th>`), with optional sorting functionality.
	 *  If the cell has a `sortDirection` property, a sort button is rendered within the header.
	 *
	 * @param {KoliBriTableHeaderCell} cell  The header cell data, containing label, colSpan, rowSpan, and possible sort direction.
	 * @param {number} rowIndex  The index of the current row in the table.
	 * @param {number} colIndex  The index of the current column in the row.
	 * @returns {JSX.Element}  The rendered header cell with possible sorting controls.
	 */
	private formatSortOrderDescription(order: number): string {
		return this.translateSortOrder.replace('{{order}}', `${order}`);
	}

	private getSortAriaDescription(order?: number): string {
		if (typeof order === 'number' && order > 0) {
			return `${this.translateSort} – ${this.formatSortOrderDescription(order)}`;
		}
		return this.translateSort;
	}

	private renderHeadingCell(cell: KoliBriTableHeaderCell, rowIndex: number, colIndex: number, isVertical: boolean): JSX.Element {
		// Skip rendering if the column is not visible
		if (cell.visible === false) {
			return '';
		}

		const sortableSetting = cell?.sortable !== false;
		const hasSortDirection = typeof cell.sortDirection === 'string';
		const canSort = sortableSetting && hasSortDirection;

		let ariaSort: AriaSort = 'none';
		let sortButtonIcon = 'kolicon-sort-neutral';

		if (canSort && cell.sortDirection) {
			switch (cell.sortDirection) {
				case 'ASC':
					sortButtonIcon = 'kolicon-sort-asc';
					ariaSort = 'ascending';
					break;
				case 'DESC':
					sortButtonIcon = 'kolicon-sort-desc';
					ariaSort = 'descending';
					break;
				default:
					ariaSort = 'none';
			}
		}

		const scope = isVertical ? 'row' : typeof cell.colSpan === 'number' && cell.colSpan > 1 ? 'colgroup' : 'col';

		const sortOrder = typeof cell.sortOrder === 'number' && cell.sortOrder > 0 ? cell.sortOrder : undefined;
		const sortDescription = this.getSortAriaDescription(sortOrder);
		const width = cell.width !== undefined ? `${cell.width}px` : undefined;
		const fixed = this.isFixedCol(colIndex);
		const offsetLeft = fixed === 'left' ? this.getOffsetString(colIndex, true) : undefined;
		const offsetRight = fixed === 'right' ? this.getOffsetString(colIndex) : undefined;

		return (
			<th
				key={`${rowIndex}-${colIndex}-${cell.label}`}
				class={clsx(
					'kol-table__cell kol-table__cell--header',
					`kol-table__cell--${ariaSort}`,
					cell.textAlign && `kol-table__cell--align-${cell.textAlign}`,
					fixed && `kol-table__cell--sticky-${fixed}`,
				)}
				scope={scope}
				colSpan={cell.colSpan}
				rowSpan={cell.rowSpan}
				style={{ width: width, left: offsetLeft, right: offsetRight }}
				aria-sort={ariaSort}
				data-sort={canSort && cell.sortDirection ? `sort-${cell.sortDirection}` : undefined}
			>
				{canSort && cell.sortDirection ? (
					<span class="kol-table__sort">
						<KolButtonWcTag
							class="kol-table__sort-button"
							_icons={{ right: sortButtonIcon }}
							_label={cell.label}
							_ariaDescription={sortDescription}
							_on={{
								onClick: (event: MouseEvent) => {
									if (typeof this.state._on?.onSort === 'function' && cell.key && cell.sortDirection) {
										this.state._on.onSort(event, {
											key: cell.key,
											currentSortDirection: cell.sortDirection,
										});
									}
									if (this.host) {
										dispatchDomEvent(this.host, KolEvent.sort, {
											key: cell.key,
											currentSortDirection: cell.sortDirection,
										});
									}
								},
							}}
						></KolButtonWcTag>
						{sortOrder && (
							<span aria-hidden="true" class="kol-table__sort-order">
								{sortOrder}
							</span>
						)}
					</span>
				) : (
					cell.label
				)}
			</th>
		);
	}

	private renderSpacer(variant: 'foot' | 'head', cellDefs: KoliBriTableHeaderCell[][] | KoliBriTableCell[][]): JSX.Element {
		const verticalHeaderColpan = this.state._headerCells.vertical?.length || 0;
		const colspan = this.getVisibleColSpan(cellDefs?.[0]);
		const selectionCell = this.state._selection ? 1 : 0;

		return (
			<tr aria-hidden="true" class={clsx('kol-table__spacer', `kol-table__spacer--${variant}`)}>
				<td class={clsx(`kol-table__spacer-line kol-table__spacer-line--${variant}`)} colSpan={verticalHeaderColpan + colspan + selectionCell}></td>
			</tr>
		);
	}

	private renderFoot(): JSX.Element[] | null {
		if (!this.state._dataFoot || this.state._dataFoot.length === 0) {
			return null;
		}

		const rows: KoliBriTableCell[][] = this.createDataField(this.state._dataFoot, this.state._headerCells, true);
		return (
			<tfoot class="kol-table__footer">
				{[
					this.renderSpacer('foot', rows),
					rows.map((row: (KoliBriTableCell & KoliBriTableDataType)[], rowIndex: number) => this.renderTableRow(row, rowIndex, true, true)),
				]}
			</tfoot>
		);
	}

	public render(): JSX.Element {
		this.updateSelectionKeySets();
		const dataField = this.createDataField(this.state._data, this.state._headerCells);
		this.checkboxRefs = [];

		const horizontalHeaders = this.state._headerCells.horizontal;

		const showInternalCaption = !this.externalLabelElements?.length;

		return (
			<div
				class={clsx('kol-table', {
					[classNameFromVariant(this.state._variant, 'table')]: this.state._variant !== undefined,
				})}
			>
				{this.state._hasSettingsMenu && <KolTableSettingsWcTag _horizontalHeaderCells={horizontalHeaders ?? []} />}

				{/* Firefox automatically makes the following div focusable when it has a scrollbar. We implement a similar behavior cross-browser by allowing the
				 * <div class="focus-element"> to receive focus. Hence, we disable focus for the div to avoid having two focusable elements by setting `tabindex="-1"`.
				 * When an external label is active the caption is aria-hidden and must not receive focus — the scroll container div becomes the keyboard stop instead.
				 */}
				<div
					ref={(element) => (this.tableDivElement = element)}
					class="kol-table__scroll-container"
					tabindex={this.tableDivElementHasScrollbar ? (showInternalCaption ? '-1' : '0') : undefined}
				>
					<table
						ref={(el) => {
							this.tableRef = el as HTMLTableElement;
							this.syncTableLabel(this.externalLabelElements);
						}}
						aria-labelledby={showInternalCaption ? 'caption' : undefined}
						class="kol-table__table"
						style={{
							minWidth: this.getTableMinWidth(),
						}}
					>
						{/* eslint-disable jsx-a11y/no-noninteractive-tabindex -- caption tabIndex enables keyboard access to scrollable overflow */}
						{showInternalCaption && (
							<caption class="kol-table__focus-element kol-table__caption" id="caption" tabindex={this.tableDivElementHasScrollbar ? '0' : undefined}>
								{this.state._label}
							</caption>
						)}
						{/* eslint-enable jsx-a11y/no-noninteractive-tabindex */}

						{Array.isArray(horizontalHeaders) && (
							<thead class="kol-table__head">
								{[
									horizontalHeaders.map((cols, rowIndex) => (
										<tr class="kol-table__head-row" key={`thead-${rowIndex}`}>
											{this.state._selection && this.renderHeadingSelectionCell()}
											{rowIndex === 0 && this.renderHeaderTdCell()}
											{Array.isArray(cols) && cols.map((cell, colIndex) => this.renderHeadingCell(cell, rowIndex, colIndex, false))}
										</tr>
									)),
									this.renderSpacer('head', horizontalHeaders),
								]}
							</thead>
						)}
						<tbody class="kol-table__body">
							{dataField.map((row: (KoliBriTableCell & KoliBriTableDataType)[], rowIndex: number) => this.renderTableRow(row, rowIndex, true))}
						</tbody>
						{this.renderFoot()}
					</table>
				</div>
			</div>
		);
	}
}
