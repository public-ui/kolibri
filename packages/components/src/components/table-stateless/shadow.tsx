import type { JSX } from '@stencil/core';
import { Component, Element, h, Prop, State, Watch } from '@stencil/core';
import { KolTableStatelessWcTag } from '../../core/component-names';
import type {
	FixedColsPropType,
	HasSettingsMenuPropType,
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

@Component({
	tag: 'kol-table-stateless',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolTableStateless implements TableStatelessProps {
	@Element() private readonly host?: HTMLKolTableStatelessElement;

	private internals?: HostInternals;

	private externalLabelRetryTimeout?: ReturnType<typeof setTimeout>;

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
		this.syncExternalLabel(value, true);
	}

	private syncExternalLabel(value?: AriaLabelledbyPropType, retry = false): void {
		if (this.externalLabelRetryTimeout) {
			clearTimeout(this.externalLabelRetryTimeout);
			this.externalLabelRetryTimeout = undefined;
		}

		this.resolvedElements = validateAriaLabelledby(this, this.host, this.internals, value);

		if (retry && value && !this.resolvedElements.length) {
			this.externalLabelRetryTimeout = setTimeout(() => {
				this.externalLabelRetryTimeout = undefined;
				this.resolvedElements = validateAriaLabelledby(this, this.host, this.internals, this._ariaLabelledby);
			}, 50);
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
	 * Enables the settings menu if true (default: false).
	 */
	@Prop() public _hasSettingsMenu?: HasSettingsMenuPropType;

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop() public _variant?: VariantClassNamePropType;

	public componentWillLoad(): void {
		this.internals = attachInternals(this.host);
		// Early resolution: if the external element is already in the DOM (common when the
		// label element is rendered before this component), the first render already uses
		// externalLabelElements so the AT sees the correct name from the start.
		this.syncExternalLabel(this._ariaLabelledby);
	}

	public componentDidLoad(): void {
		// Retry with a timeout for cases where the external element was not yet in the DOM
		// during componentWillLoad (e.g. label rendered after the table).
		if (!this.resolvedElements.length) {
			this.validateAriaLabelledby(this._ariaLabelledby);
		}
	}

	public disconnectedCallback(): void {
		if (this.externalLabelRetryTimeout) {
			clearTimeout(this.externalLabelRetryTimeout);
			this.externalLabelRetryTimeout = undefined;
		}
	}

	public render(): JSX.Element {
		return (
			<KolTableStatelessWcTag
				externalLabelElements={this.resolvedElements}
				_data={this._data}
				_dataFoot={this._dataFoot}
				_fixedCols={this._fixedCols}
				_headerCells={this._headerCells}
				_label={this._label}
				_on={this._on}
				_selection={this._selection}
				_hasSettingsMenu={this._hasSettingsMenu}
				_variant={this._variant}
			/>
		);
	}
}
