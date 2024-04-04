import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop } from '@stencil/core';

import { KolTableStatelessWcTag } from '../../core/component-names';
import type { TableDataFootPropType, TableDataPropType, TableHeaderCellsPropType, TableStatelessProps } from '@public-ui/schema';

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
	 * Defines the table min-width.
	 */
	@Prop() public _minWidth?: string;

	public render(): JSX.Element {
		return (
			<Host class="kol-table-stateless">
				<KolTableStatelessWcTag
					_data={this._data}
					_dataFoot={this._dataFoot}
					_headerCells={this._headerCells}
					_label={this._label}
					_minWidth={this._minWidth}
				/>
			</Host>
		);
	}
}
