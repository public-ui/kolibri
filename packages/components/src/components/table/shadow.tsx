import type { KoliBriTableDataType, KoliBriTableHeaders, KoliBriTablePaginationProps, PaginationPositionPropType, Stringified, TableProps } from '../../schema';
import type { JSX } from '@stencil/core';
import { h } from '@stencil/core';
import { Component, Prop } from '@stencil/core';
import { KolTableStatefulTag } from '../../core/component-names';

/**
 * @deprecated Use KolTableStateful instead.
 */
@Component({
	tag: 'kol-table',
	shadow: true,
})
export class KolTable implements TableProps {
	/**
	 * Defines whether to allow multi sort.
	 */
	@Prop() public _allowMultiSort?: boolean;

	/**
	 * Defines the primary table data.
	 */
	@Prop() public _data!: Stringified<KoliBriTableDataType[]>;

	/**
	 * Defines the data for the table footer.
	 */
	@Prop() public _dataFoot?: Stringified<KoliBriTableDataType[]>;

	/**
	 * Defines the horizontal and vertical table headers.
	 */
	@Prop() public _headers!: Stringified<KoliBriTableHeaders>;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: string;

	/**
	 * Defines the table min-width.
	 */
	@Prop() public _minWidth?: string;

	/**
	 * Defines whether to show the data distributed over multiple pages.
	 */
	@Prop() public _pagination?: boolean | Stringified<KoliBriTablePaginationProps>;
	/**
	 * Controls the position of the pagination.
	 */
	@Prop() public _paginationPosition?: PaginationPositionPropType = 'bottom';

	public render(): JSX.Element {
		return (
			<KolTableStatefulTag
				_allowMultiSort={this._allowMultiSort}
				_data={this._data}
				_dataFoot={this._dataFoot}
				_headers={this._headers}
				_label={this._label}
				_minWidth={this._minWidth}
				_pagination={this._pagination}
				_paginationPosition={this._paginationPosition}
			/>
		);
	}
}
