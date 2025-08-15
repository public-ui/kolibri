import type { JSX } from '@stencil/core';
import { Component, Element, h, Prop, Watch } from '@stencil/core';
import { KolTableStatelessWcTag } from '../../core/component-names';
import {
	type TableCallbacksPropType,
	type TableDataFootPropType,
	type TableDataPropType,
	type TableHeaderCellsPropType,
	type TableSelectionPropType,
	type TableStatelessProps,
} from '../../schema';
import type { MinWidthPropType } from '../../schema/props/min-width';
import type { TableSettingsPropType } from '../../schema/props/table-settings';
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
	 */
	@Prop() public ariaLabelledby?: string;

	@Watch('ariaLabelledBy')
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

	/**
	 * Defines the table settings including column visibility, order and width.
	 */
	@Prop() public _tableSettings?: TableSettingsPropType;

	public componentWillLoad(): void {
		this.internals = attachInternalsWithAria(this.host, this.ariaLabelledby);
	}

	public render(): JSX.Element {
		const showCaption = this.internals?.ariaLabelledByElements?.length;
		return (
			<KolTableStatelessWcTag
				_ariaLabelledBy={showCaption ? this.ariaLabelledby : undefined}
				_data={this._data}
				_dataFoot={this._dataFoot}
				_headerCells={this._headerCells}
				_label={this._label}
				_minWidth={this._minWidth}
				_on={this._on}
				_selection={this._selection}
				_tableSettings={this._tableSettings}
			/>
		);
	}
}
