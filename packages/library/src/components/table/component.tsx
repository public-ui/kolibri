/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@public-ui/core';
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
import { Stringified } from '../../types/common';
import { KoliBriPaginationButtonCallbacks } from '../pagination/types';

type KoliBriTableHeaderCellAndData = KoliBriTableHeaderCell & {
	data: KoliBriDataType;
};

/**
 * API
 */
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

@Component({
	tag: 'kol-table',
	styleUrls: {
		default: './style.sass',
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

	/**
	 * @see: components/abbr/component.tsx (@State)
	 */
	@State() public state: States = {
		_caption: '',
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

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_caption')
	public validateCaption(value?: string): void {
		watchString(this, '_caption', value, {
			required: true,
		});
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_data')
	public validateData(value?: Stringified<KoliBriDataType[]>): void {
		emptyStringByArrayHandler(value, () => {
			objectObjectHandler(value, () => {
				if (typeof value === 'undefined') {
					value = [];
				}
				if (typeof value === 'string') {
					value = parseJson<KoliBriDataType[]>(value);
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

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
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
				if (typeof value === 'string') {
					value = parseJson<KoliBriTableHeaders>(value);
				}
				watchValidator(this, '_headers', (value): boolean => typeof value === 'object' && value !== null, new Set(['KoliBriTableHeaders']), value, {
					hooks: {
						beforePatch: (nextValue: unknown) => {
							const headers: KoliBriTableHeaders = nextValue as KoliBriTableHeaders;
							headers.horizontal?.forEach((header) => {
								header.forEach((cell) => {
									if (typeof cell.sort === 'function' && typeof cell.sortDirection === 'string') {
										this.sortDirections.set(cell.sort, cell.sortDirection);
									}
								});
							});
						},
					},
				});
			});
		});
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
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

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_pagination')
	public validatePagination(value?: boolean | Stringified<KoliBriTablePaginationProps>): void {
		if (typeof value === 'string') {
			value = parseJson<KoliBriTablePaginationProps>(value);
		}
		watchValidator(this, '_pagination', () => true, new Set(['boolean', 'KoliBriTablePagination']), value, {
			hooks: {
				beforePatch: this.beforePatchPagination,
			},
		});
	}

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
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
		const timeout = setTimeout(() => {
			clearTimeout(timeout);
			if (typeof col.render === 'function' && el instanceof HTMLElement) {
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
		}, 50);
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
				*/}
				<div>
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
								{this.state._headers.horizontal.map((cols) => (
									<tr>
										{cols.map((col) => {
											if (col.asTd === true) {
												return (
													<td
														class={{
															[col.textAlign as string]: typeof col.textAlign === 'string' && col.textAlign.length > 0,
														}}
														colSpan={col.colSpan}
														rowSpan={col.rowSpan}
														style={{
															textAlign: col.textAlign,
															width: col.width,
														}}
														// role="gridcell"
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
													<th
														// role="columnheader"
														scope={typeof col.colSpan === 'number' && col.colSpan > 1 ? 'colgroup' : 'col'}
														colSpan={col.colSpan}
														rowSpan={col.rowSpan}
														style={{
															width: col.width,
														}}
														aria-sort={
															typeof col.sort === 'function'
																? this.sortDirections.get(col.sort) === 'NOS' || this.sortDirections.get(col.sort) === undefined
																	? 'none'
																	: this.sortDirections.get(col.sort) === 'ASC'
																	? 'ascending'
																	: 'descending'
																: undefined
														}
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
																	exportparts="button,ghost"
																	_ariaLabel={'Sortierung von ' + col.label + ' ändern'}
																	_icon={
																		this.sortDirections.get(col.sort) === 'NOS' || this.sortDirections.get(col.sort) === undefined
																			? 'fas fa-sort'
																			: this.sortDirections.get(col.sort) === 'ASC'
																			? 'fas sort-up'
																			: 'fas sort-down'
																	}
																	_iconOnly
																	_label={'Sortierung von ' + col.label + ' ändern'}
																	_on={{
																		onClick: () => {
																			if (typeof col.sort === 'function') {
																				this.sortFunction = col.sort;
																				switch (this.sortDirections.get(this.sortFunction)) {
																					case 'ASC':
																						this.sortDirections.set(this.sortFunction, 'DESC');
																						break;
																					case 'DESC':
																						this.sortDirections.set(this.sortFunction, 'NOS');
																						break;
																					default:
																						this.sortDirections.set(this.sortFunction, 'ASC');
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
							{dataField.map((row, index) => {
								return (
									<tr key={`row-${index}`}>
										{row.map((col) => {
											if (col.asTd === false) {
												return (
													<th
														// role="rowheader"
														scope={typeof col.rowSpan === 'number' && col.rowSpan > 1 ? 'rowgroup' : 'row'}
														colSpan={col.colSpan}
														rowSpan={col.rowSpan}
														style={{
															width: col.width,
														}}
														aria-sort={
															typeof col.sort === 'function'
																? this.sortDirections.get(col.sort) === 'NOS' || this.sortDirections.get(col.sort) === undefined
																	? 'none'
																	: this.sortDirections.get(col.sort) === 'ASC'
																	? 'ascending'
																	: 'descending'
																: undefined
														}
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
																	exportparts="button,ghost"
																	_ariaLabel={'Sortierung von ' + col.label + ' ändern'}
																	_icon={
																		this.sortDirections.get(col.sort) === 'NOS' || this.sortDirections.get(col.sort) === undefined
																			? 'fas fa-sort'
																			: this.sortDirections.get(col.sort) === 'ASC'
																			? 'fas fa-sort-up'
																			: 'fas fa-sort-down'
																	}
																	_iconOnly
																	_label={'Sortierung von ' + col.label + ' ändern'}
																	_on={{
																		onClick: () => {
																			if (typeof col.sort === 'function') {
																				this.sortFunction = col.sort;
																				switch (this.sortDirections.get(this.sortFunction)) {
																					case 'ASC':
																						this.sortDirections.set(this.sortFunction, 'DESC');
																						break;
																					case 'DESC':
																						this.sortDirections.set(this.sortFunction, 'NOS');
																						break;
																					default:
																						this.sortDirections.set(this.sortFunction, 'ASC');
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
													<td
														// role="gridcell"
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
				{this.showPagination && (
					<div class="pagination">
						{Array.isArray(this.state._data) && this.state._data.length > 0 ? (
							<span>
								Einträge {this.pageStartSlice + 1} bis {this.pageEndSlice} von{' '}
								{this.state._pagination._total || (Array.isArray(this.state._data) ? this.state._data.length : 0)} angezeigt
							</span>
						) : (
							<span>Es sind keine Einträge vorhanden.</span>
						)}
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
