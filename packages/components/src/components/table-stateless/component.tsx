import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Listen, Prop, State, Watch } from '@stencil/core';

import type {
	KoliBriTableCell,
	KoliBriTableDataType,
	KoliBriTableHeaderCell,
	KoliBriTableHeaderCellWithLogic,
	KoliBriTableHeaders,
	KoliBriTableRender,
	LabelPropType,
	TableCallbacksPropType,
	TableDataFootPropType,
	TableDataPropType,
	TableHeaderCellsPropType,
	TableSelectionPropType,
	TableStatelessAPI,
	TableStatelessStates,
} from '../../schema';
import {
	Log,
	validateLabel,
	validateTableCallbacks,
	validateTableData,
	validateTableDataFoot,
	validateTableHeaderCells,
	validateTableSelection,
	watchString,
} from '../../schema';
import { KolButtonWcTag, KolIconTag, KolTooltipWcTag } from '../../core/component-names';
import type { TranslationKey } from '../../i18n';
import { translate } from '../../i18n';
import { tryToDispatchKoliBriEvent } from '../../utils/events';
import { Events } from '../../schema/enums';
import { nonce } from '../../utils/dev.utils';

@Component({
	tag: 'kol-table-stateless-wc',
	shadow: false,
})
export class KolTableStateless implements TableStatelessAPI {
	@Element() private readonly host?: HTMLKolTableStatelessWcElement;

	@State() public state: TableStatelessStates = {
		_data: [],
		_label: '',
		_headerCells: {
			horizontal: [],
			vertical: [],
		},
	};

	private tableDivElement?: HTMLDivElement;
	private tableDivElementResizeObserver?: ResizeObserver;
	private horizontal = true;
	private cellsToRenderTimeouts = new Map<HTMLElement, ReturnType<typeof setTimeout>>();
	private dataToKeyMap = new Map<KoliBriTableDataType, string>();

	private checkboxRefs: HTMLInputElement[] = [];

	@State()
	private tableDivElementHasScrollbar = false;

	/**
	 * Defines the primary table data.
	 */
	@Prop() public _data!: TableDataPropType;

	/**
	 * Defines the data for the table footer.
	 */
	@Prop() public _dataFoot?: TableDataFootPropType;

	/**
	 * Defines the horizontal and vertical table headers.
	 */
	@Prop() public _headerCells!: TableHeaderCellsPropType;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: string;

	/**
	 * Defines the table min-width.
	 */
	@Prop() public _minWidth?: string;

	/**
	 * Defines the callback functions for table events.
	 */
	@Prop() public _on?: TableCallbacksPropType;

	/**
	 * Defines how rows can be selected and the current selection.
	 */
	@Prop() public _selection?: TableSelectionPropType;

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

	@Watch('_headerCells')
	public validateHeaderCells(value?: TableHeaderCellsPropType) {
		validateTableHeaderCells(this, value);
	}

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		validateLabel(this, value, {
			required: true,
		});
	}

	@Watch('_minWidth')
	public validateMinWidth(value?: string): void {
		watchString(this, '_minWidth', value, {
			defaultValue: undefined,
		});
	}

	@Watch('_on')
	public validateOn(value?: TableCallbacksPropType): void {
		validateTableCallbacks(this, value);
	}

	@Watch('_selection')
	public validateSelection(value?: TableSelectionPropType): void {
		validateTableSelection(this, value);
	}

	@Listen('keydown')
	public handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
			const focusedElement = this.tableDivElement?.querySelector(':focus') as HTMLInputElement;
			let index = this.checkboxRefs.indexOf(focusedElement);

			if (focusedElement && this.checkboxRefs.includes(focusedElement)) {
				event.preventDefault();

				if (event.key === 'ArrowDown') {
					index = (index + 1) % this.checkboxRefs.length;
					try {
						this.checkboxRefs[index].focus();
					} catch (e) {
						Log.debug(e);
					}
				} else if (event.key === 'ArrowUp') {
					event.preventDefault();
					index = (index + this.checkboxRefs.length - 1) % this.checkboxRefs.length;
					try {
						this.checkboxRefs[index].focus();
					} catch (e) {
						Log.debug(e);
					}
				}
			}
		}
	}

	public componentDidRender(): void {
		this.checkDivElementScrollbar();
	}

	public componentDidLoad() {
		if (this.tableDivElement && ResizeObserver) {
			this.tableDivElementResizeObserver = new ResizeObserver(this.checkDivElementScrollbar.bind(this));
			this.tableDivElementResizeObserver.observe(this.tableDivElement);
		}
	}

	public disconnectedCallback() {
		this.tableDivElementResizeObserver?.disconnect();
	}

	private checkDivElementScrollbar() {
		if (this.tableDivElement) {
			this.tableDivElementHasScrollbar = this.tableDivElement.scrollWidth > this.tableDivElement.clientWidth;
		}
	}

	private updateDataToKeyMap(data: KoliBriTableDataType[]) {
		data.forEach((data) => {
			if (!this.dataToKeyMap.has(data)) {
				this.dataToKeyMap.set(data, nonce());
			}
		});

		/* Cleanup old values from map */
		this.dataToKeyMap.forEach((_, key) => {
			if (!data.includes(key)) {
				this.dataToKeyMap.delete(key);
			}
		});
	}

	private getDataKey(data: KoliBriTableDataType) {
		return this.dataToKeyMap.get(data);
	}

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
			row.forEach((col) => (count += col.colSpan ?? 1));
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
			col.forEach((row) => (count += row.rowSpan ?? 1));
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

	private filterHeaderKeys(headers: KoliBriTableHeaderCell[][]): KoliBriTableHeaderCell[] {
		const primaryHeader: KoliBriTableHeaderCell[] = [];
		headers.forEach((cells) => {
			cells.forEach((cell) => {
				if (typeof cell.key === 'string') {
					primaryHeader.push(cell);
				}
			});
		});
		return primaryHeader;
	}

	private getPrimaryHeader(headers: KoliBriTableHeaders): KoliBriTableHeaderCell[] {
		let primaryHeader: KoliBriTableHeaderCell[] = this.filterHeaderKeys(headers.horizontal ?? []);
		this.horizontal = true;
		if (primaryHeader.length === 0) {
			primaryHeader = this.filterHeaderKeys(headers.vertical ?? []);
			if (primaryHeader.length > 0) {
				this.horizontal = false;
			}
		}
		return primaryHeader;
	}

	private createDataField(data: KoliBriTableDataType[], headers: KoliBriTableHeaders, isFoot?: boolean): (KoliBriTableCell & KoliBriTableDataType)[][] {
		headers.horizontal = Array.isArray(headers?.horizontal) ? headers.horizontal : [];
		headers.vertical = Array.isArray(headers?.vertical) ? headers.vertical : [];
		const primaryHeader = this.getPrimaryHeader(headers);
		const maxCols = this.getNumberOfCols(headers.horizontal, data);
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
							asTd: false,
							// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
							data: {} as KoliBriTableDataType,
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
			for (let j = 0; j < maxCols; j++) {
				if (this.horizontal === true) {
					const row = isFoot && this.state._dataFoot ? this.state._dataFoot[i - startRow] : data[i];
					if (
						typeof primaryHeader[j] === 'object' &&
						primaryHeader[j] !== null &&
						typeof primaryHeader[j].key === 'string' &&
						typeof row === 'object' &&
						row !== null
					) {
						dataRow.push({
							...primaryHeader[j],
							colSpan: undefined,
							// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
							data: row,
							// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
							label: row[primaryHeader[j].key as unknown as string] as string,
							rowSpan: undefined,
						});
					}
				} else {
					if (
						typeof primaryHeader[i] === 'object' &&
						primaryHeader[i] !== null &&
						typeof primaryHeader[i].key === 'string' &&
						typeof data[j] === 'object' &&
						data[j] !== null
					) {
						dataRow.push({
							...primaryHeader[i],
							colSpan: undefined,
							// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
							data: data[j],
							// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
							label: data[j][primaryHeader[i].key as unknown as number] as string,
							rowSpan: undefined,
						});
					}
				}
			}
			dataField.push(dataRow);
		}
		if (data.length === 0) {
			let colspan = 0;
			let rowspan = 0;
			if (Array.isArray(headers.horizontal) && headers.horizontal.length > 0) {
				headers.horizontal[0].forEach((col) => {
					colspan += col.colSpan || 1;
				});
			}
			if (Array.isArray(headers.vertical) && headers.vertical.length > 0) {
				colspan -= headers.vertical.length;
				headers.vertical[0].forEach((row) => {
					rowspan += row.rowSpan || 1;
				});
			}
			const emptyCell = {
				colSpan: colspan,
				label: translate('kol-no-entries'),
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

	public componentWillLoad(): void {
		this.validateData(this._data);
		this.validateDataFoot(this._dataFoot);
		this.validateHeaderCells(this._headerCells);
		this.validateLabel(this._label);
		this.validateMinWidth(this._minWidth);
		this.validateOn(this._on);
		this.validateSelection(this._selection);
	}

	private renderSelectionCell(row: (KoliBriTableCell & KoliBriTableDataType)[], rowIndex: number): JSX.Element {
		const selection = this.state._selection;
		if (!selection) return '';
		const keyPropertyName = selection.keyPropertyName ?? 'id';
		const firstCellData = row[0]?.data;

		if (!firstCellData) return '';
		const keyProperty = firstCellData[keyPropertyName] as string;
		const isMultiple = selection.multiple || selection.multiple === undefined;
		const selected = selection?.selectedKeys?.includes(keyProperty);
		const label = selection.label(firstCellData);
		const props = {
			name: 'selection',
			checked: selected,
			id: keyProperty,
			['aria-label']: label,
		};
		return (
			<td key={`tbody-${rowIndex}-selection`} class="selection-cell">
				<div class={`input ${selected ? 'checked' : ''}`}>
					{isMultiple ? (
						<label class="checkbox-container">
							<KolIconTag class="icon" _icons={`codicon ${selected ? 'codicon-check' : ''}`} _label="" />
							<input
								ref={(el) => el && this.checkboxRefs.push(el)}
								{...props}
								type="checkbox"
								onInput={(event: Event) => {
									const updatedSelectedKeys = !selected
										? [...(selection?.selectedKeys ?? []), keyProperty]
										: selection?.selectedKeys?.filter((key) => key !== keyProperty);
									tryToDispatchKoliBriEvent('selection-change', this.host, updatedSelectedKeys);
									if (typeof this.state._on?.[Events.onSelectionChange] === 'function') {
										this.state._on[Events.onSelectionChange](event, updatedSelectedKeys ?? []);
									}
								}}
							/>
						</label>
					) : (
						<label class="radio-container">
							<input
								{...props}
								type="radio"
								onInput={(event: Event) => {
									tryToDispatchKoliBriEvent('selection-change', this.host, keyProperty);
									if (typeof this.state._on?.[Events.onSelectionChange] === 'function') {
										this.state._on[Events.onSelectionChange](event, keyProperty);
									}
								}}
							/>
						</label>
					)}
					<KolTooltipWcTag aria-hidden="true" class="input-tooltip" _align="right" _id={`${keyProperty}-label`} _label={label}></KolTooltipWcTag>
				</div>
			</td>
		);
	}

	private readonly renderTableRow = (row: (KoliBriTableCell & KoliBriTableDataType)[], rowIndex: number): JSX.Element => {
		let key = String(rowIndex);
		if (this.horizontal && row[0]?.data) {
			key = this.getDataKey(row[0].data) ?? key;
		}

		return (
			<tr key={`row-${key}`}>
				{this.renderSelectionCell(row, rowIndex)}
				{row.map((cell, colIndex) => this.renderTableCell(cell, rowIndex, colIndex))}
			</tr>
		);
	};

	private readonly renderTableCell = (cell: KoliBriTableCell, rowIndex: number, colIndex: number): JSX.Element => {
		let key = `${rowIndex}-${colIndex}-${cell.label}`;
		if (cell.data) {
			const dataKey = this.getDataKey(cell.data);
			key = dataKey ? `${dataKey}-${this.horizontal ? colIndex : rowIndex}` : key;
		}

		if (cell.asTd === false) {
			return this.renderHeadingCell(cell, rowIndex, colIndex);
		} else {
			return (
				<td
					key={`cell-${key}`}
					class={{
						[cell.textAlign as string]: typeof cell.textAlign === 'string' && cell.textAlign.length > 0,
					}}
					colSpan={cell.colSpan}
					rowSpan={cell.rowSpan}
					style={{
						textAlign: cell.textAlign,
						width: cell.width,
					}}
					ref={
						typeof cell.render === 'function'
							? (el) => {
									this.cellRender(cell as KoliBriTableHeaderCellWithLogic & { render: KoliBriTableRender }, el);
								}
							: undefined
					}
				>
					{typeof cell.render !== 'function' ? cell.label : ''}
				</td>
			);
		}
	};

	private renderHeadingSelectionCell(): JSX.Element {
		const selection = this.state._selection;
		if (!selection || (!selection.multiple && selection.multiple !== undefined)) return <th key={`thead-0`}></th>;
		const keyPropertyName = selection.keyPropertyName ?? 'id';
		const selectedKeyLength = selection.selectedKeys?.length;
		const dataLength = this.state._data.length;
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
			<th key={`thead-0-selection`} class="selection-cell selection-control">
				<div class={`input ${indeterminate ? 'indeterminate' : isChecked ? 'checked' : ''}`}>
					<label class="checkbox-container">
						<KolIconTag class="icon" _icons={`codicon ${indeterminate ? 'codicon-remove' : isChecked ? 'codicon-check' : ''}`} _label="" />
						<input
							ref={(el) => el && this.checkboxRefs.push(el)}
							name="selection"
							checked={isChecked && !indeterminate}
							aria-label={label}
							type="checkbox"
							onInput={(event: Event) => {
								const selections = !isChecked ? this.state._data.map((el) => el?.[keyPropertyName] as string) : [];
								tryToDispatchKoliBriEvent('selection-change', this.host, selections);
								if (typeof this.state._on?.[Events.onSelectionChange] === 'function') {
									this.state._on[Events.onSelectionChange](event, selections);
								}
							}}
						/>
					</label>
					<KolTooltipWcTag aria-hidden="true" class="input-tooltip" _align="right" _id={`${translationKey}-label`} _label={label}></KolTooltipWcTag>
				</div>
			</th>
		);
	}

	private renderHeadingCell(cell: KoliBriTableHeaderCell, rowIndex: number, colIndex: number): JSX.Element {
		let ariaSort = undefined;
		let sortButtonIcon = 'codicon codicon-fold';

		if (cell.sortDirection) {
			switch (cell.sortDirection) {
				case 'ASC':
					sortButtonIcon = 'codicon codicon-chevron-up';
					ariaSort = 'ascending';
					break;
				case 'DESC':
					sortButtonIcon = 'codicon codicon-chevron-down';
					ariaSort = 'descending';
					break;
			}
		}

		return (
			<th
				key={`${rowIndex}-${colIndex}-${cell.label}`}
				class={cell.textAlign ? `align-${cell.textAlign}` : undefined}
				scope={typeof cell.colSpan === 'number' && cell.colSpan > 1 ? 'colgroup' : 'col'}
				colSpan={cell.colSpan}
				rowSpan={cell.rowSpan}
				style={{
					width: cell.width,
				}}
				aria-sort={ariaSort}
				data-sort={`sort-${cell.sortDirection}`}
			>
				{cell.sortDirection ? (
					<KolButtonWcTag
						class="table-sort-button"
						exportparts="icon"
						_icons={{ right: sortButtonIcon }}
						_label={cell.label}
						_on={{
							onClick: (event: MouseEvent) => {
								if (typeof this.state._on?.onSort === 'function' && cell.key && cell.sortDirection) {
									this.state._on.onSort(event, {
										key: cell.key,
										currentSortDirection: cell.sortDirection,
									});
								}
							},
						}}
					></KolButtonWcTag>
				) : (
					cell.label
				)}
			</th>
		);
	}

	private renderFoot(): JSX.Element {
		if (!this.state._dataFoot || this.state._dataFoot.length === 0) {
			return '';
		}

		const rows: KoliBriTableCell[][] = this.createDataField(this.state._dataFoot, this.state._headerCells, true);
		return <tfoot>{rows.map(this.renderTableRow)}</tfoot>;
	}

	public render(): JSX.Element {
		const dataField = this.createDataField(this.state._data, this.state._headerCells);
		this.checkboxRefs = [];

		return (
			<Host class="kol-table-stateless-wc">
				{/* Firefox automatically makes the following div focusable when it has a scrollbar. We implement a similar behavior cross-browser by allowing the
				 * <div class="focus-element"> to receive focus. Hence, we disable focus for the div to avoid having two focusable elements by setting `tabindex="-1"`
				 */}
				{/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
				<div ref={(element) => (this.tableDivElement = element)} class="table" tabindex={this.tableDivElementHasScrollbar ? '-1' : undefined}>
					<table
						style={{
							minWidth: this.state._minWidth,
						}}
					>
						{/*
						 * The following element allows the table to receive focus without providing redundant content to screen readers.
						 * The `div` is technically not allowed here. But any allowed element would mutate the table semantics. Additionally, the `&nbsp;` is necessary to
						 * prevent screen readers from just reading "blank".
						 */}
						{/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
						<div class="focus-element" tabindex={this.tableDivElementHasScrollbar ? '0' : undefined} aria-describedby="caption">
							&nbsp;
						</div>

						<caption id="caption">{this.state._label}</caption>

						{Array.isArray(this.state._headerCells.horizontal) && (
							<thead>
								{this.state._headerCells.horizontal.map((cols, rowIndex) => (
									<tr key={`thead-${rowIndex}`}>
										{this.state._selection && this.renderHeadingSelectionCell()}
										{cols.map((cell, colIndex) => {
											if (cell.asTd === true) {
												return (
													<td
														key={`thead-${rowIndex}-${colIndex}-${cell.label}`}
														class={{
															[cell.textAlign as string]: typeof cell.textAlign === 'string' && cell.textAlign.length > 0,
														}}
														colSpan={cell.colSpan}
														rowSpan={cell.rowSpan}
														style={{
															textAlign: cell.textAlign,
															width: cell.width,
														}}
														ref={
															typeof cell.render === 'function'
																? (el) => {
																		this.cellRender(cell, el);
																	}
																: undefined
														}
													>
														{typeof cell.render !== 'function' ? cell.label : ''}
													</td>
												);
											} else {
												return this.renderHeadingCell(cell, rowIndex, colIndex);
											}
										})}
									</tr>
								))}
							</thead>
						)}
						<tbody>{dataField.map(this.renderTableRow)}</tbody>
						{this.renderFoot()}
					</table>
				</div>
			</Host>
		);
	}
}
