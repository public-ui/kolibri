import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Listen, Prop, State, Watch } from '@stencil/core';

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
	TableStatelessProps,
	VariantClassNamePropType,
} from '../../schema';
import { validateAriaLabelledby, type AriaLabelledbyPropType } from '../../schema/props/aria-labelledby';
import { attachInternals, type HostInternals } from '../../utils/aria-labelledby';
import { BaseTableStatelessWebComponent } from './base';

@Component({
	tag: 'kol-table-stateless',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolTableStateless extends BaseTableStatelessWebComponent implements TableStatelessProps, WebComponentInterface<TableStatelessApi> {
	@Element() protected readonly host?: HTMLKolTableStatelessElement;

	private internals?: HostInternals;

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

		this.internals = attachInternals(this.host);
		// Early resolution: if the external element is already in the DOM (common when the
		// label element is rendered before this component), the first render already uses
		// it, so the AT sees the correct name from the start.
		this.resolveExternalLabel(this._ariaLabelledby);
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
	}

	private resolveExternalLabel(value?: AriaLabelledbyPropType): void {
		this.externalLabelElements = validateAriaLabelledby(this, this.host, this.internals, value);
		this.syncTableLabel(this.externalLabelElements);
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
		return <Host>{this.renderTableStatelessFC()}</Host>;
	}

	// --- @State ---

	@State() public externalLabelElements: HTMLElement[] = [];

	@State() public hasScrollbar: boolean = false;

	@State() public rowKeys: Map<KoliBriTableDataType, string> = new Map();

	@State() public settingsChangedCounter: number = 0;

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
		this.applyHeaders(value ? value : this._headerCells);
	}

	/**
	 * @deprecated Will be removed in the future. Use _headers instead.
	 * Defines the horizontal and vertical table headers.
	 */
	@Prop() public _headerCells?: TableHeaderCellsPropType;
	@Watch('_headerCells')
	public watchHeaderCells(value?: TableHeaderCellsPropType): void {
		this.applyHeaders(this._headers ? this._headers : value);
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
}
