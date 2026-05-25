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
	 * Defines an external element ID used as the table caption.
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

	public componentWillLoad(): void {
		// Attach internals first; label resolution happens after connect.
		this.internals = attachInternals(this.host);
	}

	public componentDidLoad(): void {
		this.validateAriaLabelledby(this._ariaLabelledby);
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
			/>
		);
	}
}
