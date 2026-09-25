import type { JSX } from '@stencil/core';
import { h } from '@stencil/core';

import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { TableStatelessApi } from '../../internal/functional-components/table-stateless/api';
import { tableStatelessPropsConfig } from '../../internal/functional-components/table-stateless/api';
import { TableStatelessFC } from '../../internal/functional-components/table-stateless/component';
import { getNumberOfCols, getPrimaryHeaders } from '../../internal/functional-components/table-stateless/table-model';
import {
	fixedColsProp,
	hasSettingsMenuProp,
	labelWithExpertSlotProp,
	tableCallbacksProp,
	tableDataFootProp,
	tableDataProp,
	tableHeadersProp,
	tableLoadingProp,
	tableSelectionProp,
	variantProp,
} from '../../internal/props';
import type { TableHeaders } from '../../internal/props/table-headers';
import type {
	FixedColsPropType,
	HasSettingsMenuPropType,
	KoliBriTableCell,
	KoliBriTableDataType,
	KoliBriTableHeaderCell,
	SelectionChangeEventPayload,
	SortEventPayload,
	TableCallbacksPropType,
	TableDataFootPropType,
	TableDataPropType,
	TableHeaderCellsPropType,
	TableSelectionPropType,
	VariantClassNamePropType,
} from '../../schema';
import { Log } from '../../schema';
import { Callback } from '../../schema/enums';
import { nonce } from '../../utils/dev.utils';
import { dispatchDomEvent, KolEvent } from '../../utils/events';

const RESIZE_DEBOUNCE_DELAY = 150;

/**
 * Header cells shown in the settings menu are visible and hidable unless they say otherwise.
 */
const withHeaderCellSettings = (headers: TableHeaders): TableHeaders => {
	if (headers.horizontal.length === 0) {
		return headers;
	}
	return {
		...headers,
		horizontal: headers.horizontal.map((row) =>
			row.map((header) => ({
				...header,
				visible: typeof header.visible === 'boolean' ? header.visible : true,
				hidable: typeof header.hidable === 'boolean' ? header.hidable : true,
			})),
		),
	};
};

/** Keeps the key of every row that is still present and assigns a new one to each new row. */
const createRowKeys = (rows: KoliBriTableDataType[], previous: Map<KoliBriTableDataType, string>): Map<KoliBriTableDataType, string> =>
	new Map(rows.map((row) => [row, previous.get(row) ?? nonce()]));

/**
 * Orchestrator shared by `kol-table-stateless` and the transitional `kol-table-stateless-wc`. Both
 * render the same `TableStatelessFC`; the concrete element only declares the Stencil members and
 * delegates from its watchers, listeners and lifecycle hooks.
 *
 * Besides the render props it owns what has a lifecycle: the scroll container's measurements
 * (scrollbar, sticky columns), the row keys, the deferred custom cell rendering and the events.
 */
export abstract class BaseTableStatelessWebComponent extends BaseWebComponent<TableStatelessApi> {
	protected abstract readonly host?: HTMLElement;

	private scrollContainerElement?: HTMLDivElement;
	private tableElement?: HTMLTableElement;
	private resizeObserver?: ResizeObserver;
	private resizeDebounceTimeout?: ReturnType<typeof setTimeout>;
	private readonly cellRenderTimeouts = new Map<HTMLElement, ReturnType<typeof setTimeout>>();

	// --- Lifecycle ---

	protected initTableRenderProps(): void {
		this.initRenderProps(tableStatelessPropsConfig);
	}

	protected observeScrollContainer(): void {
		if (this.scrollContainerElement && ResizeObserver) {
			this.resizeObserver = new ResizeObserver(this.handleResize);
			this.resizeObserver.observe(this.scrollContainerElement);
		}
		this.updateStickyColsDisabled();
	}

	protected teardownTable(): void {
		this.resizeObserver?.disconnect();
		clearTimeout(this.resizeDebounceTimeout);
	}

	// --- Prop application ---

	protected applyData(value?: TableDataPropType): void {
		tableDataProp.apply(value, (rows) => {
			this.setRenderProp('data', rows);
			this.setState('rowKeys', createRowKeys(rows, this.getState('rowKeys')));
		});
	}

	protected applyDataFoot(value?: TableDataFootPropType): void {
		tableDataFootProp.apply(value, (v) => this.setRenderProp('dataFoot', v));
	}

	protected applyFixedCols(value?: FixedColsPropType): void {
		fixedColsProp.apply(value, (v) => this.setRenderProp('fixedCols', v));
		this.updateStickyColsDisabled();
	}

	protected applyHasSettingsMenu(value?: HasSettingsMenuPropType): void {
		hasSettingsMenuProp.apply(value, (v) => this.setRenderProp('hasSettingsMenu', v));
	}

	protected applyHeaders(value?: TableHeaderCellsPropType): void {
		tableHeadersProp.apply(value, (headers) => this.setRenderProp('headers', withHeaderCellSettings(headers)));
	}

	protected applyLabel(value?: string): void {
		labelWithExpertSlotProp.apply(value, (v) => this.setRenderProp('label', v));
	}

	protected applyLoading(value?: boolean): void {
		tableLoadingProp.apply(value, (v) => this.setRenderProp('loading', v));
	}

	protected applyOn(value?: TableCallbacksPropType): void {
		tableCallbacksProp.apply(value, (v) => this.setRenderProp('on', v));
	}

	protected applySelection(value?: TableSelectionPropType): void {
		tableSelectionProp.apply(value, (v) => this.setRenderProp('selection', v));
		this.updateStickyColsDisabled();
	}

	protected applyVariant(value?: VariantClassNamePropType): void {
		variantProp.apply(value, (v) => this.setRenderProp('variant', v));
	}

	/**
	 * Labels the `<table>` by elements outside the shadow root. Plain `aria-labelledby` IDREFs cannot
	 * cross that boundary; element references can.
	 */
	protected syncTableLabel(elements?: HTMLElement[]): void {
		if (!this.tableElement) return;
		if ('ariaLabelledByElements' in this.tableElement) {
			if (elements?.length) {
				this.tableElement.ariaLabelledByElements = elements;
			}
			Log.debug([this.tableElement, !!elements?.length, elements, this.tableElement.ariaLabelledByElements]);
		}
	}

	// --- Listeners ---

	/** Arrow up/down cycles the focus through the selection checkboxes in document order. */
	protected moveCheckboxFocus(event: KeyboardEvent): void {
		if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') {
			return;
		}
		const checkboxes = Array.from(this.scrollContainerElement?.querySelectorAll<HTMLInputElement>('.kol-table__selection-input--checkbox') ?? []);
		const focusedElement = this.scrollContainerElement?.querySelector(':focus') as HTMLInputElement;
		let index = checkboxes.indexOf(focusedElement);

		if (index > -1) {
			event.preventDefault();
			const offset = event.key === 'ArrowDown' ? 1 : checkboxes.length - 1;
			index = (index + offset) % checkboxes.length;
			checkboxes[index].focus();
		}
	}

	protected applyChangedHeaderCells(event: CustomEvent<KoliBriTableHeaderCell[][]>): void {
		const updatedHeaders = { ...this.getRenderProp('headers'), horizontal: event.detail };
		this.setRenderProp('headers', updatedHeaders);
		this.setState('settingsChangedCounter', this.getState('settingsChangedCounter') + 1);

		const onChangeHeaderCells = this.getRenderProp('on')[Callback.onChangeHeaderCells];
		if (typeof onChangeHeaderCells === 'function') {
			onChangeHeaderCells(event, updatedHeaders);
		}
	}

	// --- Measurements ---

	protected updateScrollbarState(): void {
		if (this.scrollContainerElement) {
			this.setState('hasScrollbar', this.scrollContainerElement.scrollWidth > this.scrollContainerElement.clientWidth);
		}
	}

	private readonly handleResize = (): void => {
		this.updateScrollbarState();
		clearTimeout(this.resizeDebounceTimeout);
		this.resizeDebounceTimeout = setTimeout(() => {
			this.updateStickyColsDisabled();
		}, RESIZE_DEBOUNCE_DELAY);
	};

	/**
	 * Declared widths of the fixed columns plus the measured width of the selection column, which
	 * is always sticky and sized by CSS.
	 */
	private calculateFixedColsWidth(): number {
		const [fixedLeft, fixedRight] = this.getRenderProp('fixedCols');
		const headers = this.getRenderProp('headers');
		const primaryCells = getPrimaryHeaders(headers).cells;
		const maxCols = getNumberOfCols(headers.horizontal, this.getRenderProp('data'));
		let totalWidth = 0;

		for (let i = 0; i < fixedLeft && i < primaryCells.length; i++) {
			totalWidth += primaryCells[i]?.width ?? 0;
		}
		for (let i = maxCols - fixedRight; i < maxCols && i < primaryCells.length; i++) {
			totalWidth += primaryCells[i]?.width ?? 0;
		}

		if (this.getRenderProp('selection')) {
			const selectionCell = this.scrollContainerElement?.querySelector<HTMLElement>('.kol-table__cell--selection');
			totalWidth += selectionCell?.offsetWidth ?? 0;
		}

		return totalWidth;
	}

	/** Fixed columns that would fill the whole container render unfixed, so the rest stays reachable. */
	private updateStickyColsDisabled(): void {
		if (!this.scrollContainerElement) {
			this.setState('stickyColsDisabled', false);
			return;
		}
		const fixedColsWidth = this.calculateFixedColsWidth();
		this.setState('stickyColsDisabled', fixedColsWidth > 0 && fixedColsWidth >= this.scrollContainerElement.clientWidth);
	}

	// --- Callbacks ---

	private readonly handleSelectionChange = (event: Event, payload: SelectionChangeEventPayload): void => {
		const onSelectionChange = this.getRenderProp('on')[Callback.onSelectionChange];
		if (typeof onSelectionChange === 'function') {
			onSelectionChange(event, payload);
		}
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.selectionChange, payload);
		}
	};

	private readonly handleSort = (event: MouseEvent, payload: SortEventPayload): void => {
		const onSort = this.getRenderProp('on')[Callback.onSort];
		if (typeof onSort === 'function' && payload.key) {
			onSort(event, payload);
		}
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.sort, payload);
		}
	};

	/**
	 * Runs a cell's custom `render` function once the cell is in the DOM. Deferred and debounced per
	 * cell, so repeated renders of the table call it only once.
	 */
	private readonly handleRenderCell = (cell: KoliBriTableCell, element?: HTMLElement): void => {
		if (!element) {
			return;
		}
		clearTimeout(this.cellRenderTimeouts.get(element));
		this.cellRenderTimeouts.set(
			element,
			setTimeout(() => {
				if (typeof cell.render === 'function') {
					const renderContent = cell.render(element, cell, cell.data, this.getRenderProp('data'));
					if (typeof renderContent === 'string') {
						element.textContent = renderContent;
					}
				}
			}),
		);
	};

	// --- Refs ---

	private readonly refScrollContainer = (element?: HTMLDivElement): void => {
		this.scrollContainerElement = element;
	};

	private readonly refTable = (element?: HTMLTableElement): void => {
		this.tableElement = element;
		this.syncTableLabel(this.getState('externalLabelElements'));
	};

	// --- Render ---

	protected renderTableStatelessFC(): JSX.Element {
		return (
			<TableStatelessFC
				data={this.getRenderProp('data')}
				dataFoot={this.getRenderProp('dataFoot')}
				externalLabelElements={this.getState('externalLabelElements')}
				fixedCols={this.getRenderProp('fixedCols')}
				handleRenderCell={this.handleRenderCell}
				handleSelectionChange={this.handleSelectionChange}
				handleSort={this.handleSort}
				hasScrollbar={this.getState('hasScrollbar')}
				hasSettingsMenu={this.getRenderProp('hasSettingsMenu')}
				headers={this.getRenderProp('headers')}
				label={this.getRenderProp('label')}
				loading={this.getRenderProp('loading')}
				on={this.getRenderProp('on')}
				refScrollContainer={this.refScrollContainer}
				refTable={this.refTable}
				rowKeys={this.getState('rowKeys')}
				selection={this.getRenderProp('selection')}
				settingsChangedCounter={this.getState('settingsChangedCounter')}
				stickyColsDisabled={this.getState('stickyColsDisabled')}
				variant={this.getRenderProp('variant')}
			/>
		);
	}
}
