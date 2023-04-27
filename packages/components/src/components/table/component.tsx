/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@a11y-ui/core';
import { Stringified } from '../../types/common';
import {
	KoliBriDataType,
	KoliBriSortDirection,
	KoliBriSortFunction,
	KoliBriTableCell,
	KoliBriTableHeaderCell,
	KoliBriTableHeaders,
	KoliBriTablePaginationProps,
	KoliBriTablePaginationStates,
} from '../../types/table';
import { emptyStringByArrayHandler, objectObjectHandler, parseJson, setState, watchString, watchValidator } from '../../utils/prop.validators';
import { KoliBriPaginationButtonCallbacks } from '../pagination/types';
import { translate } from '../../i18n';

type KoliBriTableHeaderCellAndData = KoliBriTableHeaderCell & {
	data: KoliBriDataType;
};

type RequiredProps = {
	caption: string;
	data: Stringified<KoliBriDataType[]>;
	headers: Stringified<KoliBriTableHeaders>;
};
type OptionalProps = {
	minWidth: string;
	pagination: boolean | Stringified<KoliBriTablePaginationProps>;
};
// type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	caption: string;
	data: KoliBriDataType[];
	headers: KoliBriTableHeaders;
	pagination: KoliBriTablePaginationStates;
	sortedData: KoliBriDataType[];
};
type OptionalStates = {
	minWidth: string;
} & {
	sortDirection: KoliBriSortDirection;
};
type States = Generic.Element.Members<RequiredStates, OptionalStates>;

const PAGINATION_OPTIONS = [10, 20, 50, 100];

const CELL_REFS = new Map<HTMLElement, ReturnType<typeof setTimeout>>();

@Component({
	tag: 'kol-table',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolTable implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	// https://github.com/ionic-team/stencil/issues/2895
	private horizontal = true;
	private sortFunction?: KoliBriSortFunction;
	private sortDirections: Map<KoliBriSortFunction, KoliBriSortDirection> = new Map();
	private showPagination = false;
	private pageStartSlice = 0;
	private pageEndSlice = 10;

	/**
	 * Gibt den  Titel oder eine Legende mit Erklärungen zur Tabelle an.
	 */
	@Prop() public _caption!: string;

	/**
	 * Gibt die Daten an, die für die Erstellung der Tabelle verwendet werden.
	 */
	@Prop() public _data!: Stringified<KoliBriDataType[]>;

	/**
	 * Gibt die horizontalen und vertikalen Header für die Tabelle an.
	 */
	@Prop() public _headers!: Stringified<KoliBriTableHeaders>;

	/**
	 * Gibt an, die minimale Breite der Tabelle an.
	 */
	@Prop() public _minWidth?: string;

	/**
	 * Gibt an, ob die Daten geteilt in Seiten angezeigt wird.
	 */
	@Prop() public _pagination?: boolean | Stringified<KoliBriTablePaginationProps>;

	@State() public state: States = {
		_caption: '…', // ⚠ required
		_data: [],
		_headers: {
			horizontal: [],
			vertical: [],
		},
		_pagination: {
			_page: 1,
			_pageSize: 10,
			_total: 0,
		},
		_sortedData: [],
	};

	@Watch('_caption')
	public validateCaption(value?: string): void {
		watchString(this, '_caption', value, {
			required: true,
		});
	}

	@Watch('_data')
	public validateData(value?: Stringified<KoliBriDataType[]>): void {
		emptyStringByArrayHandler(value, () => {
			objectObjectHandler(value, () => {
				if (typeof value === 'undefined') {
					value = [];
				}
				try {
					value = parseJson<KoliBriDataType[]>(value);
					// eslint-disable-next-line no-empty
				} catch (e) {
					// value behält den ursprünglichen Wert
				}
				if (Array.isArray(value) && value.find((dataTupel: KoliBriDataType) => !(typeof dataTupel === 'object' && dataTupel !== null)) === undefined) {
					setState(this, '_data', value, {
						afterPatch: () => {
							// TODO: kein guter Hack (endless loop)
							const timeout = setTimeout(() => {
								clearTimeout(timeout);
								this.updateSortedData();
							});
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
							const headers: KoliBriTableHeaders = nextValue as KoliBriTableHeaders;
							headers.horizontal?.forEach((header) => {
								header.forEach((cell) => {
									if (typeof cell.sort === 'function' && typeof cell.sortDirection === 'string') {
										this.setSortDirection(cell.sort, cell.sortDirection);
									}
								});
							});
							headers.vertical?.forEach((header) => {
								header.forEach((cell) => {
									if (typeof cell.sort === 'function' && typeof cell.sortDirection === 'string') {
										this.setSortDirection(cell.sort, cell.sortDirection);
									}
								});
							});
						},
					},
				});
			});
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

	private readonly beforePatchPagination: Generic.Element.NextStateHooksCallback = (nextValue, _nextState, _component, key): void => {
		if (key === '_pagination') {
			this.showPagination = nextValue === true || nextValue === '' /* true */ || (typeof nextValue === 'object' && nextValue !== null);
		}
	};

	@Watch('_pagination')
	public validatePagination(value?: boolean | Stringified<KoliBriTablePaginationProps>): void {
		try {
			value = parseJson<KoliBriTablePaginationProps>(value);
			// eslint-disable-next-line no-empty
		} catch (e) {
			// value behält den ursprünglichen Wert
		}
		watchValidator(this, '_pagination', () => true, new Set(['boolean', 'KoliBriTablePagination']), value, {
			hooks: {
				beforePatch: this.beforePatchPagination,
			},
		});
	}

	public componentWillLoad(): void {
		this.validateCaption(this._caption);
		this.validateData(this._data);
		this.validateHeaders(this._headers);
		this.validateMinWidth(this._minWidth);
		this.validatePagination(this._pagination);
	}

	private getNumberOfCols(horizontalHeaders: KoliBriTableHeaderCell[][], data: KoliBriDataType[]): number {
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

	private getNumberOfRows(verticalHeaders: KoliBriTableHeaderCell[][], data: KoliBriDataType[]): number {
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
		}
		return max;
	}

	// TODO: hier muss noch die order beachtet werden bei colspan und rowspan
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

	private createDataField(data: KoliBriDataType[], headers: KoliBriTableHeaders): KoliBriTableCell[][] {
		headers.horizontal = Array.isArray(headers?.horizontal) ? headers.horizontal : [];
		headers.vertical = Array.isArray(headers?.vertical) ? headers.vertical : [];
		const primaryHeader = this.getPrimaryHeader(headers);
		const maxCols = this.getNumberOfCols(headers.horizontal, data);
		const maxRows = this.getNumberOfRows(headers.vertical, data);
		const dataField: KoliBriTableCell[][] = [];

		const rowCount: number[] = [];
		const rowSpans: number[][] = [];
		headers.vertical.forEach((_row, index) => {
			rowCount[index] = 0;
			rowSpans[index] = [];
		});

		for (let i = 0; i < maxRows; i++) {
			const dataRow: KoliBriTableHeaderCellAndData[] = [];
			headers.vertical.forEach((cells, index) => {
				let sum = 0;
				rowSpans[index].forEach((value) => (sum += value));
				if (sum <= i) {
					const rows = cells[i - sum + rowCount[index]];
					if (typeof rows === 'object') {
						dataRow.push({
							...rows,
							asTd: false,
							// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
							data: {} as KoliBriDataType,
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
					if (
						typeof primaryHeader[j] === 'object' &&
						primaryHeader[j] !== null &&
						typeof primaryHeader[j].key === 'string' &&
						typeof data[i] === 'object' &&
						data[i] !== null
					) {
						dataRow.push({
							...primaryHeader[j],
							colSpan: undefined,
							// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
							data: data[i],
							// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
							label: data[i][primaryHeader[j].key as unknown as string] as string,
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

	private selectDisplayedData(data: KoliBriDataType[], pageSize: number, page: number): KoliBriDataType[] {
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

	private cellRender(col: KoliBriTableHeaderCellAndData, el?: HTMLElement): void {
		if (el /* SSR instanceof HTMLElement */) {
			clearTimeout(CELL_REFS.get(el));
			CELL_REFS.set(
				el,
				setTimeout(() => {
					clearTimeout(CELL_REFS.get(el));
					if (typeof col.render === 'function') {
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
							el.innerHTML = html;
						}
					}
				})
			);
		}
	}

	private updateSortedData = () => {
		let sortedData: KoliBriDataType[] = this.state._data;
		if (typeof this.sortFunction === 'function') {
			switch (this.sortDirections.get(this.sortFunction)) {
				case 'NOS':
					sortedData = [...this.state._data];
					break;
				case 'ASC':
					sortedData = this.sortFunction([...this.state._data]);
					break;
				default:
					sortedData = this.sortFunction([...this.state._data]).reverse();
			}
		}
		setState(this, '_sortedData', sortedData);
	};

	public render(): JSX.Element {
		const displayedData: KoliBriDataType[] = this.selectDisplayedData(
			this.state._sortedData,
			this.showPagination ? this.state._pagination?._pageSize ?? 10 : this.state._sortedData.length,
			this.state._pagination._page || 1
		);
		const dataField = this.createDataField(displayedData, this.state._headers);

		return (
			<Host>
				{/*
				  - https://dequeuniversity.com/rules/axe/3.5/scrollable-region-focusable
					- https://www.a11yproject.com/posts/how-to-use-the-tabindex-attribute/
					- https://ux.stackexchange.com/questions/119952/when-is-it-wrong-to-put-tabindex-0-on-non-interactive-content

					Nicht <div tabindex="0">

					DOCH!!!
					https://dequeuniversity.com/rules/axe/4.4/scrollable-region-focusable?application=AxeChrome
				*/}
				<div tabindex="0">
					<table
						// role="grid"
						// aria-readonly="true"
						style={{
							minWidth: this.state._minWidth,
						}}
					>
						<caption>{this.state._caption}</caption>
						{Array.isArray(this.state._headers.horizontal) && (
							<thead>
								{this.state._headers.horizontal.map((cols, rowIdx) => (
									<tr key={`thead-${rowIdx}`}>
										{cols.map((col, colIdx) => {
											if (col.asTd === true) {
												return (
													<td // role="gridcell"
														key={`thead-${rowIdx}-${colIdx}-${col.label}`}
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
																		this.cellRender(col as KoliBriTableHeaderCellAndData, el);
																  }
																: undefined
														}
														innerHTML={typeof col.render !== 'function' ? col.label : ''}
													></td>
												);
											} else {
												return (
													<th // role="columnheader"
														key={`thead-${rowIdx}-${colIdx}-${col.label}`}
														scope={typeof col.colSpan === 'number' && col.colSpan > 1 ? 'colgroup' : 'col'}
														colSpan={col.colSpan}
														rowSpan={col.rowSpan}
														style={{
															textAlign: col.textAlign,
															width: col.width,
														}}
														aria-sort={
															typeof col.sort === 'function'
																? col.sort !== this.sortFunction ||
																  this.sortDirections.get(col.sort) === 'NOS' ||
																  this.sortDirections.get(col.sort) === undefined
																	? 'none'
																	: this.sortDirections.get(col.sort) === 'ASC'
																	? 'ascending'
																	: 'descending'
																: undefined
														}
														// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
														data-sort={`sort-${this.sortDirections.get(col.sort!) as string}`}
													>
														<div class="w-full flex gap-1 items-center">
															<div
																class={{
																	'w-full': true,
																	[col.textAlign as string]: typeof col.textAlign === 'string' && col.textAlign.length > 0,
																}}
																innerHTML={col.label}
																style={{
																	textAlign: col.textAlign,
																}}
															></div>
															{typeof col.sort === 'function' && (
																<kol-button
																	_ariaLabel={translate('kol-change-order', { placeholders: { colLabel: col.label } })}
																	_icon={
																		col.sort !== this.sortFunction ||
																		this.sortDirections.get(col.sort) === 'NOS' ||
																		this.sortDirections.get(col.sort) === undefined
																			? 'codicon codicon-fold'
																			: this.sortDirections.get(col.sort) === 'ASC'
																			? 'codicon codicon-chevron-up'
																			: 'codicon codicon-chevron-down'
																	}
																	_iconOnly
																	_label={translate('kol-change-order', { placeholders: { colLabel: col.label } })}
																	_on={{
																		onClick: () => {
																			if (typeof col.sort === 'function') {
																				this.sortFunction = col.sort;
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
																				this.updateSortedData();
																			}
																		},
																	}}
																	_variant="ghost"
																></kol-button>
															)}
														</div>
													</th>
												);
											}
										})}
									</tr>
								))}
							</thead>
						)}
						{/* <tbody aria-atomic="true" aria-live="polite" aria-relevant="additions removals"> */}
						<tbody>
							{dataField.map((row, rowIdx) => {
								return (
									<tr key={`tbody-${rowIdx}`}>
										{row.map((col, colIdx) => {
											if (col.asTd === false) {
												return (
													<th // role="rowheader"
														key={`tbody-${rowIdx}-${colIdx}-${col.label}`}
														scope={typeof col.rowSpan === 'number' && col.rowSpan > 1 ? 'rowgroup' : 'row'}
														colSpan={col.colSpan}
														rowSpan={col.rowSpan}
														style={{
															textAlign: col.textAlign,
															width: col.width,
														}}
														aria-sort={
															typeof col.sort === 'function'
																? col.sort !== this.sortFunction ||
																  this.sortDirections.get(col.sort) === 'NOS' ||
																  this.sortDirections.get(col.sort) === undefined
																	? 'none'
																	: this.sortDirections.get(col.sort) === 'ASC'
																	? 'ascending'
																	: 'descending'
																: undefined
														}
														// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
														data-sort={`sort-${this.sortDirections.get(col.sort!) as string}`}
													>
														<div class="w-full flex gap-1 items-center">
															<div
																class={{
																	'w-full': true,
																	[col.textAlign as string]: typeof col.textAlign === 'string' && col.textAlign.length > 0,
																}}
																innerHTML={col.label}
																style={{
																	textAlign: col.textAlign,
																}}
															></div>
															{typeof col.sort === 'function' && (
																<kol-button
																	_ariaLabel={translate('kol-change-order', { placeholders: { colLabel: col.label } })}
																	_icon={
																		col.sort !== this.sortFunction ||
																		this.sortDirections.get(col.sort) === 'NOS' ||
																		this.sortDirections.get(col.sort) === undefined
																			? 'codicon codicon-fold'
																			: this.sortDirections.get(col.sort) === 'ASC'
																			? 'codicon codicon-chevron-up'
																			: 'codicon codicon-chevron-down'
																	}
																	_iconOnly
																	_label={translate('kol-change-order', { placeholders: { colLabel: col.label } })}
																	_on={{
																		onClick: () => {
																			if (typeof col.sort === 'function') {
																				this.sortFunction = col.sort;
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
																				this.updateSortedData();
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
														key={`tbody-${rowIdx}-${colIdx}-${col.label}`}
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
																		this.cellRender(col as KoliBriTableHeaderCellAndData, el);
																  }
																: undefined
														}
														innerHTML={typeof col.render !== 'function' ? col.label : ''}
													></td>
												);
											}
										})}
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				{this.pageEndSlice > 0 && this.showPagination && (
					<div class="pagination">
						<span>
							Einträge {this.pageEndSlice > 0 ? this.pageStartSlice + 1 : 0} bis {this.pageEndSlice} von{' '}
							{this.state._pagination._total || (Array.isArray(this.state._data) ? this.state._data.length : 0)} angezeigt
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
								_total={this.state._pagination._total || this.state._data.length}
							></kol-pagination>
						</div>
					</div>
				)}
			</Host>
		);
	}
}
