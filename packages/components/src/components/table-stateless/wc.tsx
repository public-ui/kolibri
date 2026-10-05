import type { JSX } from '@stencil/core';
import { Component, Element, Listen, Prop, State, Watch } from '@stencil/core';

import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { TableStatelessApi } from '../../internal/functional-components/table-stateless/api';
import type {
	FixedColsPropType,
	HasSettingsMenuPropType,
	KoliBriTableDataType,
	KoliBriTableHeaderCell,
	TableCallbacksPropType,
	TableDataFootPropType,
	TableDataPropType,
	TableHeaderCellsPropType,
	TableSelectionPropType,
	VariantClassNamePropType,
} from '../../schema';
import { BaseTableStatelessWebComponent } from './base';

/**
 * Transitional `kol-table-stateless-wc` — a `shadow:false` element that renders `TableStatelessFC`
 * into the light DOM.
 *
 * `kol-table-stateful` renders it inside its own shadow DOM and styles the table classes from its
 * stylesheet, which a shadow root would hide. Once that consumer renders `TableStatelessFC`
 * directly, this element can be deleted.
 *
 * @internal
 */
@Component({
	tag: 'kol-table-stateless-wc',
	shadow: false,
})
export class KolTableStatelessWc extends BaseTableStatelessWebComponent implements WebComponentInterface<TableStatelessApi> {
	@Element() protected readonly host?: HTMLKolTableStatelessWcElement;

	// --- Lifecycle ---

	public componentWillLoad(): void {
		this.initTableRenderProps();

		this.watchData(this._data);
		this.watchDataFoot(this._dataFoot);
		this.watchFixedCols(this._fixedCols);
		this.watchHasSettingsMenu(this._hasSettingsMenu);
		this.watchHeaders(this._headers);
		this.watchLabel(this._label);
		this.watchLoading(this._loading);
		this.watchOn(this._on);
		this.watchSelection(this._selection);
		this.watchVariant(this._variant);
	}

	public componentDidLoad(): void {
		this.observeScrollContainer();
	}

	public componentDidRender(): void {
		this.updateScrollbarState();
	}

	public disconnectedCallback(): void {
		this.teardownTable();
	}

	// --- Listeners ---

	@Listen('changeheadercells')
	public onChangeHeaderCells(event: CustomEvent<KoliBriTableHeaderCell[][]>): void {
		this.applyChangedHeaderCells(event);
	}

	@Listen('keydown')
	public onKeydown(event: KeyboardEvent): void {
		this.moveCheckboxFocus(event);
	}

	// --- Render ---

	public render(): JSX.Element {
		return this.renderTableStatelessFC();
	}

	// --- @State ---

	@State() public hasScrollbar: boolean = false;

	@State() public rowKeys: Map<KoliBriTableDataType, string> = new Map();

	@State() public settingsChangedCounter: number = 0;

	@State() public stickyColsDisabled: boolean = false;

	// --- Props + Watchers ---

	/**
	 * External label elements forwarded by the embedding component, which resolves them in its own
	 * tree scope.
	 */
	@Prop() public externalLabelElements: HTMLElement[] = [];
	@Watch('externalLabelElements')
	public watchExternalLabelElements(value?: HTMLElement[]): void {
		this.syncTableLabel(value);
	}

	/**
	 * Defines the primary table data.
	 */
	@Prop() public _data!: TableDataPropType;
	@Watch('_data')
	public watchData(value?: TableDataPropType): void {
		this.applyData(value);
	}

	/**
	 * Defines the data for the table footer.
	 */
	@Prop() public _dataFoot?: TableDataFootPropType;
	@Watch('_dataFoot')
	public watchDataFoot(value?: TableDataFootPropType): void {
		this.applyDataFoot(value);
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
	@Prop() public _headers?: TableHeaderCellsPropType;
	@Watch('_headers')
	public watchHeaders(value?: TableHeaderCellsPropType): void {
		this.applyHeaders(value);
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: string;
	@Watch('_label')
	public watchLabel(value?: string): void {
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
	 * Defines the callback functions for table events.
	 */
	@Prop() public _on?: TableCallbacksPropType;
	@Watch('_on')
	public watchOn(value?: TableCallbacksPropType): void {
		this.applyOn(value);
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
	 * Defines which variant should be used for presentation.
	 * @internal
	 */
	@Prop() public _variant?: VariantClassNamePropType;
	@Watch('_variant')
	public watchVariant(value?: VariantClassNamePropType): void {
		this.applyVariant(value);
	}

	/**
	 * Enables the settings menu if true (default: false).
	 */
	@Prop() public _hasSettingsMenu?: HasSettingsMenuPropType;
	@Watch('_hasSettingsMenu')
	public watchHasSettingsMenu(value?: HasSettingsMenuPropType): void {
		this.applyHasSettingsMenu(value);
	}
}
