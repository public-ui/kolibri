import type { JSX } from '@stencil/core';
import { Component, h, Prop, State, Watch } from '@stencil/core';

import type {
	KoliBriTableHeaders,
	LabelPropType,
	Stringified,
	TableDataFootPropType,
	TableDataPropType,
	TableStatelessAPI,
	TableStatelessStates,
} from '@public-ui/schema';
import { validateLabel, validateTableData, validateTableDataFoot, watchString } from '@public-ui/schema';

@Component({
	tag: 'kol-table-stateless-wc',
	shadow: false,
})
export class KolTableStateless implements TableStatelessAPI {
	@State() public state: TableStatelessStates = {
		_data: [],
		_label: '',
		_headers: {
			horizontal: [],
			vertical: [],
		},
	};

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
	@Prop() public _headers!: Stringified<KoliBriTableHeaders>;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: string;

	/**
	 * Defines the table min-width.
	 */
	@Prop() public _minWidth?: string;

	@Watch('_data')
	public validateData(value?: TableDataPropType) {
		validateTableData(this, value);
	}

	@Watch('_dataFoot')
	public validateDataFoot(value?: TableDataFootPropType) {
		validateTableDataFoot(this, value);
	}

	@Watch('_headers')
	public validateHeaders() {}

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		validateLabel(this, value, {
			required: true,
		});
	}

	@Watch('_minWidth')
	public validateMinWidth(value?: string): void {
		watchString(this, '_minWidth', value, {
			defaultValue: undefined,
		});
	}

	public componentWillLoad(): void {
		this.validateData(this._data);
		this.validateDataFoot(this._dataFoot);
		// this.validateHeaders(this._headers);
		this.validateLabel(this._label);
		this.validateMinWidth(this._minWidth);
	}

	public render(): JSX.Element {
		return <div class="kol-table-stateless">here</div>;
	}
}
