import type { FunctionalComponent as FC, JSX } from '@stencil/core';
import { Fragment, h } from '@stencil/core';

import { KolBadgeTag, KolButtonWcTag, KolLinkWcTag, KolTableSettingsWcTag } from '../../../core/component-names';
import { translate } from '../../../i18n';
import type {
	ActionColumnHeaderCell,
	AriaSort,
	KoliBriTableCell,
	KoliBriTableDataType,
	KoliBriTableHeaderCell,
	KoliBriTableHeaderCellWithLogic,
	KoliBriTableRender,
	StateColumnHeaderCell,
	StateColumnPropType,
} from '../../../schema';
import { classNameFromVariant } from '../../../schema';
import { bem } from '../../../schema/bem-registry';
import { BemRootNodeFC } from '../bem-root-node/component';
import type { FunctionalComponentProps } from '../generic-types';
import { IconFC } from '../icon/component';
import { SpinFC } from '../spin/component';
import { TooltipFC } from '../tooltip/component';
import type { TableStatelessApi } from './api';
import type { FixedSide, PrimaryHeaders, SelectionModel, TableDataCell, TableDataRow } from './table-model';
import {
	createDataField,
	createSelectionModel,
	getColumnHeaderForType,
	getFixedOffsets,
	getFixedSide,
	getNumberOfCols,
	getOffsetString,
	getPrimaryHeaders,
	getSelectableRows,
	getSelectAllSelection,
	getTableMinWidth,
	getVisibleColSpan,
} from './table-model';

const tableBem = bem.forBlock('kol-table');
const BEM_CLASS_TABLE__BODY = tableBem('body');
const BEM_CLASS_TABLE__CELL_ACTIONS = tableBem('cell-actions');
const BEM_CLASS_TABLE__CELL_STATES = tableBem('cell-states');
const BEM_CLASS_TABLE__FOOTER = tableBem('footer');
const BEM_CLASS_TABLE__HEAD = tableBem('head');
const BEM_CLASS_TABLE__HEAD_ROW = tableBem('head-row');
const BEM_CLASS_TABLE__SCROLL_CONTAINER = tableBem('scroll-container');
const BEM_CLASS_TABLE__SELECTION_ICON = tableBem('selection-icon');
const BEM_CLASS_TABLE__SELECTION_INPUT_TOOLTIP = tableBem('selection-input-tooltip');
const BEM_CLASS_TABLE__SORT = tableBem('sort');
const BEM_CLASS_TABLE__SORT_BUTTON = tableBem('sort-button');
const BEM_CLASS_TABLE__SORT_ORDER = tableBem('sort-order');
const BEM_CLASS_TABLE__TABLE = tableBem('table');
const BEM_CLASS_TABLE__CAPTION = `${tableBem('focus-element')} ${tableBem('caption')}`;

type TableStatelessFCProps = FunctionalComponentProps<TableStatelessApi>;

/**
 * Everything the render helpers derive once per render and share: the column model, the sticky
 * offsets and the selection state.
 */
type RenderContext = TableStatelessFCProps & {
	fixedOffsets: number[];
	maxCols: number;
	primaryHeaders: PrimaryHeaders;
	selectionModel: SelectionModel;
	translateNoEntries: string;
};

const getFixedSideOf = (context: RenderContext, index: number | undefined): FixedSide | undefined =>
	getFixedSide(context.fixedCols, context.stickyColsDisabled, context.maxCols, index);

const getOffsets = (context: RenderContext, fixed: FixedSide | undefined, index: number | undefined) => ({
	left: fixed === 'left' ? getOffsetString(context.fixedOffsets, index, true, context.selection !== false) : undefined,
	right: fixed === 'right' ? getOffsetString(context.fixedOffsets, index, false, context.selection !== false) : undefined,
});

/**
 * Rows keep their identity across renders through a key derived from the row object, so a
 * re-sorted table moves its rows instead of rewriting their cells.
 */
const getRowKey = (context: RenderContext, row: TableDataRow, rowIndex: number): string =>
	(context.primaryHeaders.horizontal && row[0]?.data ? context.rowKeys.get(row[0].data) : undefined) ?? String(rowIndex);

/**
 * The selection cell of a body row: a checkbox for multiple selection, a radio for single
 * selection.
 */
const renderSelectionCell = (context: RenderContext, row: TableDataRow, rowIndex: number): JSX.Element => {
	const { handleSelectionChange, selection, selectionModel } = context;
	if (!selection) return '';
	const firstCellData = row[0]?.data;

	if (!firstCellData) return '';
	const keyProperty = firstCellData[selectionModel.keyPropertyName] as string | number;
	const isMultiple = selection.multiple || selection.multiple === undefined;

	const keyPropertyString = String(keyProperty);
	const selected = selectionModel.selectedKeysSet.has(keyPropertyString);
	const disabled = selectionModel.disabledKeys.has(keyPropertyString);

	const label = selection.label(firstCellData);
	const props = {
		name: 'selection',
		checked: selected,
		disabled,
		id: String(keyProperty),
		['aria-label']: label,
	};
	return (
		<td key={`tbody-${rowIndex}-selection`} class={tableBem('cell', { selection: true })}>
			<div class={tableBem('selection', { checked: selected })}>
				{isMultiple ? (
					<label class={tableBem('selection-label', { disabled })}>
						<IconFC class={BEM_CLASS_TABLE__SELECTION_ICON} icons={`kolicon ${selected ? 'kolicon-check' : ''}`} label="" />
						<input
							class={tableBem('selection-input', { checkbox: true })}
							{...props}
							type="checkbox"
							onInput={(event: Event) => {
								const updatedSelectedKeys = !selected
									? [...selectionModel.selectedKeys, keyProperty]
									: selectionModel.selectedKeys.filter((key) => String(key) !== keyPropertyString);
								handleSelectionChange(event, updatedSelectedKeys);
							}}
						/>
					</label>
				) : (
					<label class={tableBem('selection-label')}>
						<input
							class={tableBem('selection-input', { radio: true })}
							{...props}
							type="radio"
							onInput={(event: Event) => {
								handleSelectionChange(event, [keyProperty]);
							}}
						/>
					</label>
				)}
				<div class={BEM_CLASS_TABLE__SELECTION_INPUT_TOOLTIP}>
					<TooltipFC label={label} badgeText="" id={`${keyProperty}-label`} refFloating={() => {}} />
				</div>
			</div>
		</td>
	);
};

/**
 * The header cell of the selection column. With multiple selection it holds a checkbox that
 * selects or deselects all selectable rows, indeterminate while only some are selected.
 */
const renderHeadingSelectionCell = (context: RenderContext): JSX.Element => {
	const { data, handleSelectionChange, selection, selectionModel } = context;

	if (!selection) {
		return <td class={tableBem('cell', { header: true })} key={`thead-0`}></td>;
	}

	if (selection.multiple === false) {
		return (
			<th scope="col" key={`thead-0-selection`} class={tableBem('cell', { header: true, selection: true })}>
				<span class="visually-hidden">{translate('kol-table-selection')}</span>
			</th>
		);
	}

	const selectedKeyLength = selectionModel.selectedKeys.filter((key) => !selectionModel.disabledKeys.has(String(key))).length;
	const dataLength = getSelectableRows(data, selectionModel).length;
	const isChecked = selectedKeyLength === dataLength;
	const indeterminate = selectedKeyLength !== 0 && !isChecked;
	let label: string;
	if (selectedKeyLength === 0) {
		label = translate('kol-table-selection-all');
	} else if (isChecked && !indeterminate) {
		label = translate('kol-table-selection-none');
	} else {
		label = translate('kol-table-selection-indeterminate');
	}
	return (
		<th scope="col" key={`thead-0-selection`} class={tableBem('cell', { header: true, selection: true })}>
			<span class="visually-hidden">{translate('kol-table-selection')}</span>
			<div class={tableBem('selection', { checked: isChecked, indeterminate })}>
				<label class={tableBem('selection-label')}>
					<IconFC class={BEM_CLASS_TABLE__SELECTION_ICON} icons={`kolicon ${indeterminate ? 'kolicon-minus' : isChecked ? 'kolicon-check' : ''}`} label="" />
					<input
						class={tableBem('selection-input', { checkbox: true })}
						name="selection"
						checked={isChecked && !indeterminate}
						indeterminate={indeterminate}
						aria-label={label}
						type="checkbox"
						onInput={(event: Event) => {
							handleSelectionChange(event, getSelectAllSelection(data, selectionModel, !isChecked));
						}}
					/>
				</label>
				<div class={BEM_CLASS_TABLE__SELECTION_INPUT_TOOLTIP}>
					<TooltipFC label={label} badgeText="" refFloating={() => {}} />
				</div>
			</div>
		</th>
	);
};

/**
 * The blank cell above the vertical header columns when the table has headers in both
 * directions. Its width is the sum of the first cell of each vertical header column, so the
 * column widths hold with `table-layout: fixed`.
 */
const renderHeaderTdCell = ({ headers }: RenderContext): JSX.Element => {
	const { horizontal, vertical } = headers;

	if (horizontal.length === 0 || vertical.length === 0) {
		return <Fragment></Fragment>;
	}

	const totalWidth = vertical.reduce((sum, column) => sum + (column?.[0]?.width ?? 0), 0);

	return <td aria-hidden="true" colSpan={vertical.length} rowSpan={horizontal.length} style={totalWidth > 0 ? { width: `${totalWidth}px` } : undefined}></td>;
};

const getSortAriaDescription = (order?: number): string => {
	const translateSort = translate('kol-sort');
	if (typeof order === 'number' && order > 0) {
		return `${translateSort} – ${translate('kol-table-sort-order').replace('{{order}}', `${order}`)}`;
	}
	return translateSort;
};

/**
 * A header cell (`<th>`). A cell with a `sortDirection` renders a sort button, and with a
 * `sortOrder` also the position of its column in a multi-column sort.
 */
const renderHeadingCell = (context: RenderContext, cell: KoliBriTableHeaderCell, rowIndex: number, colIndex: number, isVertical: boolean): JSX.Element => {
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
	const width = cell.width !== undefined ? `${cell.width}px` : undefined;
	const fixed = getFixedSideOf(context, colIndex);
	const { left, right } = getOffsets(context, fixed, colIndex);
	const textAlign = cell.textAlign;
	const sortDirection = canSort ? cell.sortDirection : undefined;

	return (
		<th
			key={`${rowIndex}-${colIndex}-${cell.label}`}
			class={tableBem('cell', {
				[ariaSort]: true,
				'align-center': textAlign === 'center',
				'align-justify': textAlign === 'justify',
				'align-left': textAlign === 'left',
				'align-right': textAlign === 'right',
				header: true,
				'sticky-left': fixed === 'left',
				'sticky-right': fixed === 'right',
			})}
			scope={scope}
			colSpan={cell.colSpan}
			rowSpan={cell.rowSpan}
			style={{ width, left, right }}
			aria-sort={ariaSort}
			data-sort={sortDirection ? `sort-${sortDirection}` : undefined}
		>
			{sortDirection ? (
				<span class={BEM_CLASS_TABLE__SORT}>
					<KolButtonWcTag
						class={BEM_CLASS_TABLE__SORT_BUTTON}
						_icons={{ right: sortButtonIcon }}
						_label={cell.label}
						_ariaDescription={getSortAriaDescription(sortOrder)}
						_on={{
							onClick: (event: MouseEvent) => {
								context.handleSort(event, {
									key: cell.key as string,
									currentSortDirection: sortDirection,
								});
							},
						}}
					></KolButtonWcTag>
					{sortOrder && (
						<span aria-hidden="true" class={BEM_CLASS_TABLE__SORT_ORDER}>
							{sortOrder}
						</span>
					)}
				</span>
			) : (
				cell.label
			)}
		</th>
	);
};

/**
 * The actions of an action column: buttons and links built by the column's `actions` factory from
 * the row data.
 */
const renderActionItems = (actionColumn: ActionColumnHeaderCell, rowData: KoliBriTableDataType, key: string): JSX.Element => (
	<div class={BEM_CLASS_TABLE__CELL_ACTIONS}>
		{actionColumn.actions(rowData).map((action, actionIndex) => {
			if (action.type === 'button') {
				return <KolButtonWcTag key={`action-${key}-${actionIndex}`} {...action} _variant={action._variant} />;
			} else if (action.type === 'link') {
				return <KolLinkWcTag key={`action-${key}-${actionIndex}`} {...action} />;
			}
			return null;
		})}
	</div>
);

/**
 * The states of a state column: the badges the row data lists under the column's key.
 */
const renderStateItems = (stateColumn: StateColumnHeaderCell, rowData: KoliBriTableDataType, key: string): JSX.Element => {
	const colKey = stateColumn.key;
	if (!colKey) {
		return '';
	}

	const states = rowData[colKey] as StateColumnPropType[];
	if (!states) {
		return '';
	}

	return (
		<div class={BEM_CLASS_TABLE__CELL_STATES}>
			{states.map((state, stateIndex) => {
				if (state.type === 'badge') {
					return <KolBadgeTag key={`state-${key}-${stateIndex}`} {...state} />;
				}
				return null;
			})}
		</div>
	);
};

/**
 * A body or footer cell: a vertical header cell (`<th>`) or a data cell (`<td>`). A data cell
 * renders an action column's actions, a state column's badges, its label — or nothing, when a
 * custom `render` function fills it after rendering.
 */
const renderTableCell = (context: RenderContext, cell: TableDataCell, rowIndex: number, colIndex: number, isVertical: boolean): JSX.Element => {
	if ((cell as KoliBriTableHeaderCell).visible === false) {
		return '';
	}

	let key = `${rowIndex}-${colIndex}-${cell.label}`;
	if (cell.data) {
		const dataKey = context.rowKeys.get(cell.data);
		key = dataKey ? `${dataKey}-${context.primaryHeaders.horizontal ? colIndex : rowIndex}` : key;
	}

	if ((cell as KoliBriTableHeaderCellWithLogic).headerCell) {
		return renderHeadingCell(context, cell, rowIndex, colIndex, isVertical);
	}

	const isNoEntriesHintCell = typeof cell.render !== 'function' && cell.label === context.translateNoEntries;
	const actionColumn = getColumnHeaderForType(context.headers, context.primaryHeaders, colIndex, 'action') as ActionColumnHeaderCell | undefined;
	const isActionColumn = Boolean(actionColumn && cell.data);
	const stateColumn = getColumnHeaderForType(context.headers, context.primaryHeaders, colIndex, 'state') as StateColumnHeaderCell | undefined;
	const isStateColumn = Boolean(stateColumn && cell.data);
	const fixed = getFixedSideOf(context, colIndex);
	const { left, right } = getOffsets(context, fixed, cell.colIndex);
	const hasCustomRender = typeof cell.render === 'function';
	const textAlign = cell.textAlign;

	return (
		<td
			// settingsChangedCounter gives every cell a new key after a settings change, so it is rerendered
			key={`cell-${key}-${context.settingsChangedCounter}`}
			class={tableBem('cell', {
				actions: isActionColumn,
				'align-center': textAlign === 'center',
				'align-justify': textAlign === 'justify',
				'align-left': textAlign === 'left',
				'align-right': textAlign === 'right',
				body: true,
				states: isStateColumn,
				'sticky-left': fixed === 'left',
				'sticky-right': fixed === 'right',
			})}
			aria-atomic={isNoEntriesHintCell ? 'false' : undefined}
			aria-live={isNoEntriesHintCell ? 'polite' : undefined}
			aria-relevant={isNoEntriesHintCell ? 'text' : undefined}
			colSpan={cell.colSpan}
			rowSpan={cell.rowSpan}
			style={{ textAlign, left, right }}
			ref={hasCustomRender ? (element) => context.handleRenderCell(cell as KoliBriTableCell & { render: KoliBriTableRender }, element) : undefined}
		>
			{isActionColumn && actionColumn && cell.data
				? renderActionItems(actionColumn, cell.data, key)
				: isStateColumn && stateColumn && cell.data
					? renderStateItems(stateColumn, cell.data, key)
					: !hasCustomRender
						? cell.label
						: ''}
		</td>
	);
};

const renderTableRow = (context: RenderContext, row: TableDataRow, rowIndex: number, isVertical: boolean, isFooter: boolean = false): JSX.Element => (
	<tr class={tableBem('row', { body: !isFooter, footer: isFooter })} key={`row-${getRowKey(context, row, rowIndex)}`}>
		{renderSelectionCell(context, row, rowIndex)}
		{row.map((cell, colIndex) => renderTableCell(context, cell, rowIndex, colIndex, isVertical))}
	</tr>
);

/** The visual separator row below the header and above the footer, spanning all columns. */
const renderSpacer = (context: RenderContext, variant: 'foot' | 'head', cellDefs: KoliBriTableHeaderCell[][] | KoliBriTableCell[][]): JSX.Element => {
	const colspan = context.headers.vertical.length + getVisibleColSpan(cellDefs?.[0]) + (context.selection ? 1 : 0);

	return (
		<tr aria-hidden="true" class={tableBem('spacer', { [variant]: true })}>
			<td class={tableBem('spacer-line', { [variant]: true })} colSpan={colspan}></td>
		</tr>
	);
};

const renderFoot = (context: RenderContext): JSX.Element | null => {
	const { dataFoot, headers, primaryHeaders, translateNoEntries } = context;
	if (dataFoot.length === 0) {
		return null;
	}

	const rows = createDataField({ data: dataFoot, dataFoot, headers, isFoot: true, noEntriesLabel: translateNoEntries, primaryHeaders });
	const maxCols = getNumberOfCols(headers.horizontal, dataFoot);
	const footContext: RenderContext = {
		...context,
		fixedOffsets: getFixedOffsets(primaryHeaders.cells, maxCols, context.fixedCols, context.stickyColsDisabled),
		maxCols,
	};
	return (
		<tfoot class={BEM_CLASS_TABLE__FOOTER}>
			{[renderSpacer(context, 'foot', rows), rows.map((row, rowIndex) => renderTableRow(footContext, row, rowIndex, true, true))]}
		</tfoot>
	);
};

/**
 * Stateless renderer of the table: the optional settings menu, the scroll container and the
 * table with caption, header, body (with loading indicator) and footer.
 *
 * The web component owns everything with a lifecycle — the scroll-container measurement, the row
 * keys and the event handling; this renderer only derives the column model from its props.
 */
export const TableStatelessFC: FC<TableStatelessFCProps> = (props) => {
	const {
		data,
		dataFoot,
		externalLabelElements,
		fixedCols,
		hasScrollbar,
		hasSettingsMenu,
		headers,
		label,
		loading,
		refScrollContainer,
		refTable,
		selection,
		stickyColsDisabled,
		variant,
	} = props;

	const translateNoEntries = translate('kol-no-entries');
	const primaryHeaders = getPrimaryHeaders(headers);
	const maxCols = getNumberOfCols(headers.horizontal, data);
	const context: RenderContext = {
		...props,
		fixedOffsets: getFixedOffsets(primaryHeaders.cells, maxCols, fixedCols, stickyColsDisabled),
		maxCols,
		primaryHeaders,
		selectionModel: createSelectionModel(selection),
		translateNoEntries,
	};
	const dataField = createDataField({ data, dataFoot, headers, isFoot: false, noEntriesLabel: translateNoEntries, primaryHeaders });
	const showInternalCaption = externalLabelElements.length === 0;

	return (
		<BemRootNodeFC block="kol-table" class={classNameFromVariant(variant, 'table')}>
			{hasSettingsMenu && <KolTableSettingsWcTag _horizontalHeaderCells={headers.horizontal} />}

			{/* Firefox automatically makes the scroll container focusable when it has a scrollbar. We implement a similar behavior cross-browser by allowing the
			 * caption to receive focus. Hence, the container opts out with `tabindex="-1"` to avoid two focusable elements.
			 * When an external label is active the caption is not rendered — the scroll container becomes the keyboard stop instead.
			 */}
			<div ref={refScrollContainer} class={BEM_CLASS_TABLE__SCROLL_CONTAINER} tabindex={hasScrollbar ? (showInternalCaption ? '-1' : '0') : undefined}>
				<table
					ref={refTable}
					aria-labelledby={showInternalCaption ? 'caption' : undefined}
					class={BEM_CLASS_TABLE__TABLE}
					style={{ minWidth: getTableMinWidth(headers) }}
				>
					{/* eslint-disable jsx-a11y/no-noninteractive-tabindex -- caption tabIndex enables keyboard access to scrollable overflow */}
					{showInternalCaption && (
						<caption class={BEM_CLASS_TABLE__CAPTION} id="caption" tabindex={hasScrollbar ? '0' : undefined}>
							{label}
						</caption>
					)}
					{/* eslint-enable jsx-a11y/no-noninteractive-tabindex */}

					<thead class={BEM_CLASS_TABLE__HEAD}>
						{[
							headers.horizontal.map((cols, rowIndex) => (
								<tr class={BEM_CLASS_TABLE__HEAD_ROW} key={`thead-${rowIndex}`}>
									{selection && renderHeadingSelectionCell(context)}
									{rowIndex === 0 && renderHeaderTdCell(context)}
									{Array.isArray(cols) && cols.map((cell, colIndex) => renderHeadingCell(context, cell, rowIndex, colIndex, false))}
								</tr>
							)),
							renderSpacer(context, 'head', headers.horizontal),
						]}
					</thead>
					<tbody class={BEM_CLASS_TABLE__BODY}>
						<div class={tableBem('loader', { shown: loading })}>
							<SpinFC
								label={(loading ? translate('kol-table-data-loading') : translate('kol-table-data-loaded')).replace('{{caption}}', label)}
								show={loading}
								variant="cycle"
							/>
						</div>
						{dataField.map((row, rowIndex) => renderTableRow(context, row, rowIndex, true))}
					</tbody>
					{renderFoot(context)}
				</table>
			</div>
		</BemRootNodeFC>
	);
};
