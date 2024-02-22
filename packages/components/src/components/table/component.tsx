/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { translate } from '../../i18n';
import { Stringified } from '../../types/common';
import { LabelPropType, validateLabel } from '../../types/props/label';
import { devHint } from '../../utils/a11y.tipps';
import { emptyStringByArrayHandler, objectObjectHandler, parseJson, setState, watchString, watchValidator } from '../../utils/prop.validators';
import { KoliBriPaginationButtonCallbacks } from '../pagination/types';
import {
	API,
	KoliBriSortDirection,
	KoliBriSortFunction,
	KoliBriTableCell,
	KoliBriTableDataType,
	KoliBriTableHeaderCell,
	KoliBriTableHeaderCellAndData,
	KoliBriTableHeaders,
	KoliBriTablePaginationProps,
	KoliBriTableRender,
	KoliBriTableSelectedHead,
	States,
} from './types';

const PAGINATION_OPTIONS = [10, 20, 50, 100];

const CELL_REFS = new Map<HTMLElement, ReturnType<typeof setTimeout>>();

const paginationValidator = (value: unknown) => value === true || value === '' /* true */ || (typeof value === 'object' && value !== null);

@Component({
	tag: 'kol-table',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolTable implements API {
	private horizontal = true;
	private sortFunction?: KoliBriSortFunction;
	private sortDirections: Map<KoliBriSortFunction, KoliBriSortDirection> = new Map();
	private showPagination = false;
	private pageStartSlice = 0;
	private pageEndSlice = 10;
	private disableSort = false;
	private tableDivElement?: HTMLDivElement;
	private tableDivElementResizeObserver?: ResizeObserver;
	private sortedColumnHead: KoliBriTableSelectedHead = { label: '', key: '', sortDirection: 'NOS' };

	@State()
	private tableDivElementHasScrollbar = false;

	/**
	 * Deprecated: Defines the visible caption of the component.
	 * @deprecated Use _label.
	 */
	@Prop() public _caption?: string;

	/**
	 * Defines the primary table data.
	 */
	@Prop() public _data!: Stringified<KoliBriTableDataType[]>;

	/**
	 * Defines the data for the table footer.
	 */
	@Prop() public _dataFoot?: Stringified<KoliBriTableDataType[]>;

	/**
	 * Defines the horizontal and vertical table headers.
	 */
	@Prop() public _headers!: Stringified<KoliBriTableHeaders>;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label?: string;

	/**
	 * Defines the table min-width.
	 */
	@Prop() public _minWidth?: string;

	/**
	 * Defines whether to show the data distributed over multiple pages.
	 */
	@Prop() public _pagination?: boolean | Stringified<KoliBriTablePaginationProps>;

	@State() public state: States = {
		_data: [],
		_dataFoot: [],
		_headers: {
			horizontal: [],
			vertical: [],
		},
		_label: '…', // ⚠ required
		_pagination: {
			_page: 1,
			_pageSize: 10,
			_max: 0,
		},
		_sortedData: [],
	};

	@Watch('_caption')
	public validateCaption(value?: string): void {
		this.validateLabel(value);
	}

	@Watch('_data')
	public validateData(value?: Stringified<KoliBriTableDataType[]>): void {
		emptyStringByArrayHandler(value, () => {
			objectObjectHandler(value, () => {
				if (typeof value === 'undefined') {
					value = [];
				}
				try {
					value = parseJson<KoliBriTableDataType[]>(value);
					// eslint-disable-next-line no-empty
				} catch (e) {
					// value behält den ursprünglichen Wert
				}
				if (Array.isArray(value) && value.find((dataTupel: KoliBriTableDataType) => !(typeof dataTupel === 'object' && dataTupel !== null)) === undefined) {
					setState(this, '_data', value, {
						afterPatch: () => {
							// TODO: kein guter Hack (endless loop)
							setTimeout(this.updateSortedData);
						},
					});
				}
			});
		});
	}

	@Watch('_dataFoot')
	public validateDataFoot(value?: Stringified<KoliBriTableDataType[]>): void {
		emptyStringByArrayHandler(value, () => {
			objectObjectHandler(value, () => {
				if (typeof value === 'undefined') {
					value = [];
				}
				try {
					value = parseJson<KoliBriTableDataType[]>(value);
					// eslint-disable-next-line no-empty
				} catch (e) {
					// value behält den ursprünglichen Wert
				}
				if (Array.isArray(value) && value.find((dataTupel: KoliBriTableDataType) => !(typeof dataTupel === 'object' && dataTupel !== null)) === undefined) {
					setState(this, '_dataFoot', value, {
						afterPatch: () => {
							setTimeout(this.updateSortedData);
						},
					});
				}
			});
		});
	}

	private setSortDirection = (sort: KoliBriSortFunction, direction: KoliBriSortDirection) => {
		/**
		 * Durch des Clearen, ist es nicht möglich eine Mehr-Spalten-Sortierung
		 * darzustellen. Das wäre der Fall, wenn man ggf. Daten in außerhalb der
		 * Komponente sortiert und diese sortiert von außen rein gibt und der
		 * Sortierungsalgorithmus mehrere Spalten zusammen sortierte.
		 *
		 * Beachte auch col.sort !== this.sortFunction
		 */
		this.sortDirections.clear();
		this.sortDirections.set(sort, direction);
		this.sortFunction = sort;
	};

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
					// eslint-disable-next-line no-empty
				} catch (e) {
					// value behält den ursprünglichen Wert
				}
				watchValidator(this, '_headers', (value): boolean => typeof value === 'object' && value !== null, new Set(['KoliBriTableHeaders']), value, {
					hooks: {
						beforePatch: (nextValue: unknown) => {
							const applySort = (headers: KoliBriTableHeaderCell[]) => {
								headers.forEach((cell, i) => {
									const sortDirection = cell.sortDirection;
									if (typeof cell.sort === 'function' && (sortDirection === 'ASC' || sortDirection === 'DESC')) {
										this.setSortDirection(cell.sort, sortDirection);
										setTimeout(() => this.updateSortedData({ key: cell.key || `cell-${i}`, label: cell.label, sortDirection }));
									}
								});
							};

							const headers: KoliBriTableHeaders = nextValue as KoliBriTableHeaders;
							headers.horizontal?.forEach(applySort);
							headers.vertical?.forEach(applySort);

							if (headers.horizontal && headers.vertical && headers.horizontal?.length > 0 && headers.vertical?.length > 0) {
								this.disableSort = true;
								devHint(
									`Table: You can not sort the table data, if horizontal and vertical headers are defined at the same time. (https://github.com/public-ui/kolibri/issues/2372)`
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

	@Watch('_minWidth')
	public validateMinWidth(value?: string): void {
		watchString(this, '_minWidth', value, {
			defaultValue: undefined,
		});
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
			// eslint-disable-next-line no-empty
		} catch (e) {
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
			}
		);
	}

	public componentWillLoad(): void {
		this.validateData(this._data);
		this.validateDataFoot(this._dataFoot);
		this.validateHeaders(this._headers);
		this.validateLabel(this._label || this._caption);
		this.validateMinWidth(this._minWidth);
		this.validatePagination(this._pagination);
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
			max -= this.state._dataFoot.length;
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

	private createDataField(data: KoliBriTableDataType[], headers: KoliBriTableHeaders, isFoot?: boolean): KoliBriTableCell[][] {
		headers.horizontal = Array.isArray(headers?.horizontal) ? headers.horizontal : [];
		headers.vertical = Array.isArray(headers?.vertical) ? headers.vertical : [];
		const primaryHeader = this.getPrimaryHeader(headers);
		const maxCols = this.getNumberOfCols(headers.horizontal, data);
		let maxRows = this.getNumberOfRows(headers.vertical, data);
		let startRow = 0;
		if (isFoot) {
			startRow = maxRows;
			maxRows += this.state._dataFoot.length;
		}
		const dataField: KoliBriTableCell[][] = [];

		const rowCount: number[] = [];
		const rowSpans: number[][] = [];
		headers.vertical.forEach((_row, index) => {
			rowCount[index] = 0;
			rowSpans[index] = [];
		});

		for (let i = startRow; i < maxRows; i++) {
			const dataRow: KoliBriTableHeaderCellAndData[] = [];
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
					const row = isFoot ? this.state._dataFoot[i - startRow] : data[i];
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

	private selectDisplayedData(data: KoliBriTableDataType[], pageSize: number, page: number): KoliBriTableDataType[] {
		if (typeof pageSize === 'number' && pageSize > 0 && typeof page === 'number' && page > 0) {
			this.pageStartSlice = pageSize * (page - 1);
			this.pageEndSlice = pageSize * page > data.length ? data.length : pageSize * page;
			return data.slice(this.pageStartSlice, this.pageEndSlice);
		} else {
			this.pageStartSlice = 0;
			this.pageEndSlice = data.length;
			return data;
		}
	}

	private cellRender(col: KoliBriTableHeaderCellAndData & { render: KoliBriTableRender }, el?: HTMLElement): void {
		if (el /* SSR instanceof HTMLElement */) {
			clearTimeout(CELL_REFS.get(el));
			CELL_REFS.set(
				el,
				setTimeout(() => {
					clearTimeout(CELL_REFS.get(el));
					const html = col.render(
						el,
						{
							asTd: col.asTd,
							label: col.label,
							textAlign: col.textAlign,
							width: col.width,
						} as KoliBriTableHeaderCell,
						col.data,
						this.state._data
					);
					if (typeof html === 'string') {
						el.textContent = html;
					}
				})
			);
		}
	}

	private updateSortedData = (cell: KoliBriTableSelectedHead = this.sortedColumnHead) => {
		let sortedData: KoliBriTableDataType[] = this.state._data;
		if (typeof this.sortFunction === 'function') {
			switch (this.sortDirections.get(this.sortFunction)) {
				case 'ASC':
					sortedData = this.sortFunction([...this.state._data]);
					this.sortedColumnHead = { label: cell.label, key: cell.key, sortDirection: 'ASC' };
					break;
				case 'DESC':
					sortedData = this.sortFunction([...this.state._data]).reverse();
					this.sortedColumnHead = { label: cell.label, key: cell.key, sortDirection: 'DESC' };
					break;
				case 'NOS':
				default:
					sortedData = [...this.state._data];
					this.sortedColumnHead = { label: '', key: '', sortDirection: 'NOS' };
			}
		}
		setState(this, '_sortedData', sortedData);
	};

	private readonly renderTableRow = (row: KoliBriTableCell[], rowIndex: number): JSX.Element => {
		return <tr key={`tbody-${rowIndex}`}>{row.map((col, colIndex) => this.renderTableCell(col, rowIndex, colIndex))}</tr>;
	};
	private readonly renderTableCell = (cell: KoliBriTableCell, rowIndex: number, colIndex: number): JSX.Element => {
		if (cell.asTd === false) {
			const headerCell: KoliBriTableHeaderCell = cell;
			let sortDirection = undefined;
			let sortButtonIcon = 'codicon codicon-fold';
			if (!this.disableSort && headerCell.key === this.sortedColumnHead.key) {
				switch (this.sortedColumnHead.sortDirection) {
					case 'ASC':
						sortButtonIcon = 'codicon codicon-chevron-up';
						sortDirection = 'ascending';
						break;
					case 'DESC':
						sortButtonIcon = 'codicon codicon-chevron-down';
						sortDirection = 'descending';
						break;
				}
			}
			return (
				<th // role="rowheader"
					key={`tbody-${rowIndex}-${colIndex}-${headerCell.label}`}
					scope={typeof headerCell.rowSpan === 'number' && headerCell.rowSpan > 1 ? 'rowgroup' : 'row'}
					colSpan={headerCell.colSpan}
					rowSpan={headerCell.rowSpan}
					style={{
						textAlign: headerCell.textAlign,
						width: headerCell.width,
					}}
					aria-sort={sortDirection}
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					data-sort={`sort-${this.sortDirections.get(headerCell.sort!) as string}`}
				>
					<div class="w-full flex gap-1 items-center">
						<div
							class={{
								'w-full': true,
								[headerCell.textAlign as string]: typeof headerCell.textAlign === 'string' && headerCell.textAlign.length > 0,
							}}
							style={{ textAlign: headerCell.textAlign }}
						>
							{headerCell.label}
						</div>
						{!this.disableSort && typeof headerCell.sort === 'function' && (
							<kol-button
								exportparts="icon"
								_icon={sortButtonIcon}
								_hideLabel
								_label={translate('kol-change-order', { placeholders: { colLabel: headerCell.label } })}
								_on={{
									onClick: () => {
										if (typeof headerCell.sort === 'function') {
											this.sortFunction = headerCell.sort;
											switch (this.sortDirections.get(this.sortFunction)) {
												case 'ASC':
													this.setSortDirection(this.sortFunction, 'DESC');
													break;
												case 'DESC':
													this.setSortDirection(this.sortFunction, 'NOS');
													break;
												default:
													this.setSortDirection(this.sortFunction, 'ASC');
											}
											this.updateSortedData(headerCell as KoliBriTableSelectedHead);
										}
									},
								}}
								_variant="ghost"
							></kol-button>
						)}
					</div>
				</th>
			);
		} else {
			return (
				<td // role="gridcell"
					key={`tbody-${rowIndex}-${colIndex}-${cell.label}`}
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
									this.cellRender(cell as KoliBriTableHeaderCellAndData & { render: KoliBriTableRender }, el);
							  }
							: undefined
					}
				>
					{typeof cell.render !== 'function' ? cell.label : ''}
				</td>
			);
		}
	};

	private readonly renderFoot = (): JSX.Element => {
		const rows: KoliBriTableCell[][] = this.createDataField(this.state._dataFoot, this.state._headers, true);
		return <tfoot>{rows.map(this.renderTableRow)}</tfoot>;
	};

	public render(): JSX.Element {
		const displayedData: KoliBriTableDataType[] = this.selectDisplayedData(
			this.state._sortedData,
			this.showPagination ? this.state._pagination?._pageSize ?? 10 : this.state._sortedData.length,
			this.state._pagination._page || 1
		);
		const dataField = this.createDataField(displayedData, this.state._headers);

		return (
			<Host>
				{this.pageEndSlice > 0 && this.showPagination && (
					<div class="pagination">
						<span>
							Einträge {this.pageEndSlice > 0 ? this.pageStartSlice + 1 : 0} bis {this.pageEndSlice} von{' '}
							{this.state._pagination._max || (Array.isArray(this.state._data) ? this.state._data.length : 0)} angezeigt
						</span>
						<div>
							<kol-pagination
								_boundaryCount={this.state._pagination._boundaryCount}
								_customClass={this.state._pagination._customClass}
								_on={this.handlePagination}
								_page={this.state._pagination._page}
								_pageSize={this.state._pagination._pageSize}
								_pageSizeOptions={this.state._pagination._pageSizeOptions || PAGINATION_OPTIONS}
								_siblingCount={this.state._pagination._siblingCount}
								_tooltipAlign="bottom"
								_max={this.state._pagination._max || this.state._pagination._total || this.state._data.length}
								_label={translate('kol-table-pagination-label', { placeholders: { label: this.state._label } })}
							></kol-pagination>
						</div>
					</div>
				)}

				{/* Firefox automatically makes the following div focusable when it has a scrollbar. We implement a similar behavior cross-browser by allowing the
				 * <div class="focus-element"> to receive focus. Hence, we disable focus for the div to avoid having two focusable elements:
				 *   tabindex="-1" prevents keyboard-focus,
				 *   catching the mouseDown event prevents click-focus
				 */}
				{/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
				<div
					ref={(element) => (this.tableDivElement = element)}
					class="table"
					tabindex="-1"
					onMouseDown={(event) => {
						event.preventDefault();
					}}
				>
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
						<div class="focus-element" tabindex={this.tableDivElementHasScrollbar ? '0' : undefined} aria-describedby="caption">
							&nbsp;
						</div>

						<caption id="caption">{this.state._label}</caption>

						{Array.isArray(this.state._headers.horizontal) && (
							<thead>
								{this.state._headers.horizontal.map((cols, rowIndex) => (
									<tr key={`thead-${rowIndex}`}>
										{cols.map((col, colIndex) => {
											if (col.asTd === true) {
												return (
													<td // role="gridcell"
														key={`thead-${rowIndex}-${colIndex}-${col.label}`}
														class={{
															[col.textAlign as string]: typeof col.textAlign === 'string' && col.textAlign.length > 0,
														}}
														colSpan={col.colSpan}
														rowSpan={col.rowSpan}
														style={{
															textAlign: col.textAlign,
															width: col.width,
														}}
														ref={
															typeof col.render === 'function'
																? (el) => {
																		this.cellRender(col as KoliBriTableHeaderCellAndData & { render: KoliBriTableRender }, el);
																  }
																: undefined
														}
													>
														{typeof col.render !== 'function' ? col.label : ''}
													</td>
												);
											} else {
												const headerCell: KoliBriTableHeaderCell = col;
												let sortDirection = undefined;
												let sortButtonIcon = 'codicon codicon-fold';
												if (headerCell.key === this.sortedColumnHead.key) {
													switch (this.sortedColumnHead.sortDirection) {
														case 'ASC':
															sortButtonIcon = 'codicon codicon-chevron-up';
															sortDirection = 'ascending';
															break;
														case 'DESC':
															sortButtonIcon = 'codicon codicon-chevron-down';
															sortDirection = 'descending';
															break;
													}
												}
												return (
													<th
														class={col.textAlign ? `align-${col.textAlign}` : undefined}
														key={`thead-${rowIndex}-${colIndex}-${headerCell.label}`}
														scope={typeof headerCell.colSpan === 'number' && headerCell.colSpan > 1 ? 'colgroup' : 'col'}
														colSpan={headerCell.colSpan}
														rowSpan={headerCell.rowSpan}
														style={{
															width: col.width,
														}}
														aria-sort={sortDirection}
														data-sort={sortDirection ? `sort-${this.sortedColumnHead.sortDirection}` : 'sort-NOS'}
													>
														{!this.disableSort && typeof headerCell.sort === 'function' ? (
															<kol-button-wc
																class="table-sort-button"
																exportparts="icon"
																_icons={{ right: sortButtonIcon }}
																_label={col.label}
																_on={{
																	onClick: () => {
																		if (typeof headerCell.sort === 'function') {
																			this.sortFunction = headerCell.sort;
																			switch (this.sortDirections.get(this.sortFunction)) {
																				case 'ASC':
																					this.setSortDirection(this.sortFunction, 'DESC');
																					break;
																				case 'DESC':
																					this.setSortDirection(this.sortFunction, 'NOS');
																					break;
																				default:
																					this.setSortDirection(this.sortFunction, 'ASC');
																			}
																			this.updateSortedData(headerCell as KoliBriTableSelectedHead);
																		}
																	},
																}}
															></kol-button-wc>
														) : (
															col.label
														)}
													</th>
												);
											}
										})}
									</tr>
								))}
							</thead>
						)}
						<tbody>{dataField.map(this.renderTableRow)}</tbody>
						{this.state._dataFoot.length > 0 ? this.renderFoot() : ''}
					</table>
				</div>
			</Host>
		);
	}
}
