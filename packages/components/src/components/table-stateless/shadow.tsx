import type { JSX } from '@stencil/core';
import { Component, Element, h, Prop, Watch } from '@stencil/core';
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
import { attachInternalsWithAria, handleAriaLabelledBy, type HostInternals } from '../../utils/aria-labelledby';

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

	/**
	 * Allows labeling the table by referencing elements outside via `aria-labelledby`.
	 *
	 * ⚠️ LIMITATION: Due to Shadow DOM encapsulation, aria-labelledby references to elements
	 * outside the shadow boundary may not be resolved by assistive technologies. For reliable
	 * table labeling, use the `_label` prop instead. This property is kept for future compatibility
	 * when cross-root ARIA references are standardized.
	 */
	@Prop() public _ariaLabelledby?: string;

	@Watch('_ariaLabelledby')
	protected handleAriaLabelledBy(value?: string): void {
		handleAriaLabelledBy(this.host, this.internals, value);
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
		this.internals = attachInternalsWithAria(this.host, this._ariaLabelledby);
	}

	public render(): JSX.Element {
		const hasExternalCaption = this.internals?.ariaLabelledByElements?.length;
		return (
			<KolTableStatelessWcTag
				ariaLabelledby={hasExternalCaption ? this._ariaLabelledby : undefined}
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
