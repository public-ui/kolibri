import type { JSX } from '@stencil/core';
import { Component, h, Prop } from '@stencil/core';
import { KolTableStatelessWcTag } from '../../core/component-names';
import type {
	TableCallbacksPropType,
	TableDataFootPropType,
	TableDataPropType,
	TableHeaderCellsPropType,
	TableSelectionPropType,
	TableStatelessProps,
} from '../../schema';
import type { MinWidthPropType } from '../../schema/props/min-width';

@Component({
	tag: 'kol-table-stateless',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolTableStateless implements TableStatelessProps {
	/**
	 * Defines the primary table data.
	 */
	@Prop() public _data!: TableDataPropType;

	/**
	 * Defines the data for the table footer.
	 */
	@Prop() public _dataFoot?: TableDataFootPropType;

	/**
	 * Defines the horizontal and vertical table headers.
	 */
	@Prop() public _headerCells!: TableHeaderCellsPropType;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: string;

	/**
	 * Defines the table min-width (CSS width values).
	 */
	@Prop() public _minWidth!: MinWidthPropType;

	/**
	 * Defines the callback functions for table events.
	 */
	@Prop() public _on?: TableCallbacksPropType;

	/**
	 * Defines how rows can be selected and the current selection.
	 */
	@Prop() public _selection?: TableSelectionPropType;

	public render(): JSX.Element {
		return (
			<KolTableStatelessWcTag
				_data={this._data}
				_dataFoot={this._dataFoot}
				_headerCells={this._headerCells}
				_label={this._label}
				_minWidth={this._minWidth}
				_on={this._on}
				_selection={this._selection}
			/>
		);
	}
}
